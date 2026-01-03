import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import type { SanityFlag } from './sanity-check';

const connectionString = process.env.POSTGRES_URL;
export const db = connectionString ? drizzle(neon(connectionString)) : null;

export function getDb() {
  if (!connectionString) {
    throw new Error('POSTGRES_URL is not set');
  }
  return drizzle(neon(connectionString));
}

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export const sanityChecks = pgTable('sanity_checks', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  format: text('format').notNull(),
  stage: text('stage').notNull(),
  role: text('role').notNull(),
  country: text('country').notNull(),
  province: text('province').notNull(),
  screamingBaby: text('screaming_baby').notNull(),
  cogs: numeric('cogs', { precision: 6, scale: 2 }),
  staff: numeric('staff', { precision: 6, scale: 2 }),
  occupancy: numeric('occupancy', { precision: 6, scale: 2 }),
  otherOpex: numeric('other_opex', { precision: 6, scale: 2 }),
  wastage: numeric('wastage', { precision: 6, scale: 2 }),
  ebitda: numeric('ebitda', { precision: 6, scale: 2 }),
  gp: numeric('gp', { precision: 6, scale: 2 }),
  unknownCogs: boolean('unknown_cogs').default(false).notNull(),
  unknownStaff: boolean('unknown_staff').default(false).notNull(),
  unknownOccupancy: boolean('unknown_occupancy').default(false).notNull(),
  unknownOtherOpex: boolean('unknown_other_opex').default(false).notNull(),
  unknownWastage: boolean('unknown_wastage').default(false).notNull(),
  unknownEbitda: boolean('unknown_ebitda').default(false).notNull(),
  score: integer('score'),
  primaryIssue: text('primary_issue'),
  secondaryIssue: text('secondary_issue'),
  flags: jsonb('flags').$type<SanityFlag[]>(),
  checkNext: jsonb('check_next').$type<string[]>()
});

export type InsertSanityCheck = typeof sanityChecks.$inferInsert;

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  const client = db ?? getDb();

  // Always search the full table, not per page
  if (search) {
    return {
      products: await client
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await client.select({ count: count() }).from(products);
  let moreProducts = await client.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  const client = db ?? getDb();
  await client.delete(products).where(eq(products.id, id));
}
