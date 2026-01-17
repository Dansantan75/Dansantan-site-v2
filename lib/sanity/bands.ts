import { BusinessFormat, Metric } from './types';

export type MetricBand = {
  direction: 'higher' | 'lower';
  green: [number, number];
  amber: [number, number];
  red: { lt?: number; gt?: number };
};

export type FormatBands = Record<Metric, MetricBand>;

export const SANITY_BANDS: Record<BusinessFormat, FormatBands> = {
  QSR: {
    gp: { direction: 'higher', green: [55, 65], amber: [50, 55], red: { lt: 50 } },
    staff: { direction: 'lower', green: [25, 32], amber: [32, 36], red: { gt: 36 } },
    occupancy: { direction: 'lower', green: [7, 12], amber: [12, 15], red: { gt: 15 } },
    otherOpex: { direction: 'lower', green: [14, 20], amber: [20, 24], red: { gt: 24 } },
    wastage: { direction: 'lower', green: [0, 2], amber: [2, 4], red: { gt: 4 } },
    ebitda: { direction: 'higher', green: [8, 15], amber: [5, 8], red: { lt: 5 } }
  },
  CAFE_COFFEE: {
    gp: { direction: 'higher', green: [60, 70], amber: [55, 60], red: { lt: 55 } },
    staff: { direction: 'lower', green: [22, 30], amber: [30, 34], red: { gt: 34 } },
    occupancy: { direction: 'lower', green: [8, 14], amber: [14, 17], red: { gt: 17 } },
    otherOpex: { direction: 'lower', green: [12, 18], amber: [18, 22], red: { gt: 22 } },
    wastage: { direction: 'lower', green: [0, 2], amber: [2, 4], red: { gt: 4 } },
    ebitda: { direction: 'higher', green: [10, 18], amber: [7, 10], red: { lt: 7 } }
  },
  RESTAURANT: {
    gp: { direction: 'higher', green: [55, 65], amber: [50, 55], red: { lt: 50 } },
    staff: { direction: 'lower', green: [25, 35], amber: [35, 40], red: { gt: 40 } },
    occupancy: { direction: 'lower', green: [6, 10], amber: [10, 12], red: { gt: 12 } },
    otherOpex: { direction: 'lower', green: [18, 26], amber: [26, 30], red: { gt: 30 } },
    wastage: { direction: 'lower', green: [0, 3], amber: [3, 5], red: { gt: 5 } },
    ebitda: { direction: 'higher', green: [6, 12], amber: [3, 6], red: { lt: 3 } }
  },
  LIQUOR_RETAIL: {
    gp: { direction: 'higher', green: [18, 28], amber: [15, 18], red: { lt: 15 } },
    staff: { direction: 'lower', green: [6, 12], amber: [12, 15], red: { gt: 15 } },
    occupancy: { direction: 'lower', green: [4, 8], amber: [8, 10], red: { gt: 10 } },
    otherOpex: { direction: 'lower', green: [6, 12], amber: [12, 16], red: { gt: 16 } },
    wastage: { direction: 'lower', green: [0, 0.5], amber: [0.5, 1], red: { gt: 1 } },
    ebitda: { direction: 'higher', green: [6, 12], amber: [3, 6], red: { lt: 3 } }
  },
  GROCERY_CONVENIENCE: {
    gp: { direction: 'higher', green: [18, 24], amber: [15, 18], red: { lt: 15 } },
    staff: { direction: 'lower', green: [6, 10], amber: [10, 12], red: { gt: 12 } },
    occupancy: { direction: 'lower', green: [3, 7], amber: [7, 9], red: { gt: 9 } },
    otherOpex: { direction: 'lower', green: [8, 14], amber: [14, 18], red: { gt: 18 } },
    wastage: { direction: 'lower', green: [0, 1], amber: [1, 2], red: { gt: 2 } },
    ebitda: { direction: 'higher', green: [3, 6], amber: [1, 3], red: { lt: 1 } }
  },
  OTHER_RETAIL: {
    gp: { direction: 'higher', green: [35, 55], amber: [30, 35], red: { lt: 30 } },
    staff: { direction: 'lower', green: [8, 18], amber: [18, 22], red: { gt: 22 } },
    occupancy: { direction: 'lower', green: [6, 12], amber: [12, 15], red: { gt: 15 } },
    otherOpex: { direction: 'lower', green: [8, 16], amber: [16, 22], red: { gt: 22 } },
    wastage: { direction: 'lower', green: [0, 1], amber: [1, 2], red: { gt: 2 } },
    ebitda: { direction: 'higher', green: [8, 18], amber: [5, 8], red: { lt: 5 } }
  }
};
