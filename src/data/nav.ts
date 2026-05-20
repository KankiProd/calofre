export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Plomberie',
    href: '/plomberie/',
    children: [
      { label: 'Dépannage urgence', href: '/plomberie/depannage-urgence/' },
      { label: 'Rénovation salle de bain', href: '/plomberie/renovation-salle-de-bain/' },
      { label: 'Fuite d\'eau', href: '/plomberie/fuite-eau/' },
      { label: 'Débouchage canalisation', href: '/plomberie/debouchage-canalisation/' },
      { label: 'Ballon d\'eau chaude', href: '/plomberie/ballon-eau-chaude/' },
    ],
  },
  {
    label: 'Chauffage',
    href: '/chauffage/',
    children: [
      { label: 'Installation chaudière', href: '/chauffage/installation-chaudiere/' },
      { label: 'Entretien chaudière', href: '/chauffage/entretien-chaudiere/' },
      { label: 'Pompe à chaleur', href: '/chauffage/pompe-a-chaleur/' },
      { label: 'Dépannage chauffage', href: '/chauffage/depannage-chauffage/' },
    ],
  },
  {
    label: 'Climatisation',
    href: '/climatisation/',
    children: [
      { label: 'Climatisation réversible', href: '/climatisation/climatisation-reversible/' },
      { label: 'Monosplit', href: '/climatisation/clim-monosplit/' },
      { label: 'Multisplit', href: '/climatisation/clim-multisplit/' },
      { label: 'Gainable', href: '/climatisation/clim-gainable/' },
      { label: 'Entretien & dépannage', href: '/climatisation/entretien-depannage-clim/' },
      { label: 'Professionnels', href: '/climatisation/professionnels/' },
      { label: 'Marques', href: '/climatisation/marques/' },
      { label: 'Aides financières', href: '/climatisation/aides-financieres/' },
    ],
  },
  { label: 'Zones', href: '/zones-intervention/' },
  { label: 'Contact', href: '/contact/' },
];
