export type BusinessFormat =
  | 'QSR'
  | 'CAFE_COFFEE'
  | 'RESTAURANT'
  | 'LIQUOR_RETAIL'
  | 'GROCERY_CONVENIENCE'
  | 'OTHER_RETAIL';

export type Stage = 'LT_12M' | 'Y1_3' | 'Y3_PLUS';

export type Role = 'Owner' | 'Operator' | 'Investor' | 'Manager';

export type Metric = 'gp' | 'staff' | 'occupancy' | 'otherOpex' | 'wastage' | 'ebitda';

export type Flag = 'green' | 'amber' | 'red' | 'unknown';
