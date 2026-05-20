export interface Commune {
  name: string;
  slug: string;
  postalCode: string;
  population?: number;
  distanceFromColomiers: number;
  responseTime: string;
}

export const communes: Commune[] = [
  { name: 'Colomiers', slug: 'colomiers', postalCode: '31770', population: 40000, distanceFromColomiers: 0, responseTime: '20 minutes' },
  { name: 'Tournefeuille', slug: 'tournefeuille', postalCode: '31170', population: 27000, distanceFromColomiers: 5, responseTime: '25 minutes' },
  { name: 'Plaisance-du-Touch', slug: 'plaisance-du-touch', postalCode: '31830', population: 19000, distanceFromColomiers: 7, responseTime: '25 minutes' },
  { name: 'Pibrac', slug: 'pibrac', postalCode: '31820', population: 8500, distanceFromColomiers: 6, responseTime: '25 minutes' },
  { name: 'Cornebarrieu', slug: 'cornebarrieu', postalCode: '31700', population: 6700, distanceFromColomiers: 4, responseTime: '20 minutes' },
  { name: 'Léguevin', slug: 'leguevin', postalCode: '31490', population: 9000, distanceFromColomiers: 10, responseTime: '30 minutes' },
  { name: 'Blagnac', slug: 'blagnac', postalCode: '31700', population: 25000, distanceFromColomiers: 5, responseTime: '20 minutes' },
  { name: 'Cugnaux', slug: 'cugnaux', postalCode: '31270', population: 18000, distanceFromColomiers: 10, responseTime: '30 minutes' },
  { name: 'Toulouse', slug: 'toulouse', postalCode: '31000', population: 500000, distanceFromColomiers: 12, responseTime: '35 minutes' },
  { name: 'La Salvetat-Saint-Gilles', slug: 'la-salvetat-saint-gilles', postalCode: '31880', population: 4000, distanceFromColomiers: 8, responseTime: '25 minutes' },
];
