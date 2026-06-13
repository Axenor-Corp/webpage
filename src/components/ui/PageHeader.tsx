interface PageHeaderProps {
  title: string;
  subtitle?: string;
  intro?: string;
}

/**
 * Cabecera de subpágina: fondo transparente para que la red de nodos 3D
 * sea visible detrás, igual que en el Hero de la página principal.
 */
export default function PageHeader({ title, subtitle, intro }: PageHeaderProps) {
  return (
    <div className="relative px-6 pb-20 pt-40 text-center">
      <div className="mx-auto max-w-3xl">
        <span className="mx-auto mb-5 block h-1 w-12 bg-accent" aria-hidden="true" />
        <h1 className="text-balance text-4xl font-bold tracking-tight text-carbon md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-xl font-medium text-accent md:text-2xl">{subtitle}</p>
        )}
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-carbon-soft/75">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
