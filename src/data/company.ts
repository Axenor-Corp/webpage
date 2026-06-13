/**
 * Datos canónicos de Axenor Corporation S.A.S.
 * Única fuente de verdad para información de contacto, equipo y navegación.
 */

/** Rutas del menú principal; la clave referencia common:nav.* */
export const NAV_ROUTES = [
  { path: '/', key: 'inicio' },
  { path: '/servicios', key: 'servicios' },
  { path: '/como-trabajamos', key: 'comoTrabajamos' },
  { path: '/nosotros', key: 'nosotros' },
  { path: '/contacto', key: 'contacto' },
] as const;

export const APPLY_ROUTE = { path: '/aplicar', key: 'aplicar' } as const;

export const CONTACT = {
  email: 'contact@axenorcorporations.com',
  phoneDisplay: '+57 321 874 6238',
  phoneHref: 'tel:+573218746238',
  whatsappHref: 'https://wa.me/573218746238',
} as const;

export const COMPANY_LINKEDIN =
  'https://www.linkedin.com/company/axenorcorporations/';

export interface TeamMember {
  name: string;
  initials: string;
  /** clave de rol en los recursos de i18n (about:team.roles.*) */
  roleKey: 'ceo' | 'cto' | 'legal';
  linkedin: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Nicolas Ardila Barrera',
    initials: 'NA',
    roleKey: 'ceo',
    linkedin: 'https://www.linkedin.com/in/nicolas-ardila-barrera-a79624330/',
  },
  {
    name: 'Tomas Alberto Rodriguez Peña',
    initials: 'TR',
    roleKey: 'cto',
    linkedin: 'https://www.linkedin.com/in/tomasalbertorodriguez/',
  },
  {
    name: 'Martin Gonzales',
    initials: 'MG',
    roleKey: 'legal',
    linkedin:
      'https://www.linkedin.com/in/martin-esteban-gonzalez-nu%C3%B1ez-09a912263/',
  },
];
