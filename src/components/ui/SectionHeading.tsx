interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** invierte los colores para secciones con fondo oscuro */
  dark?: boolean;
}

export default function SectionHeading({ title, subtitle, dark = false }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <span className="mx-auto mb-4 block h-1 w-12 bg-accent" aria-hidden="true" />
      <h2
        className={`text-3xl font-bold tracking-tight md:text-4xl ${
          dark ? 'text-white' : 'text-carbon'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${dark ? 'text-white/70' : 'text-carbon-soft/70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
