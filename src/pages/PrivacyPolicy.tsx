import PageHeader from '../components/ui/PageHeader';

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader title="Política de Privacidad Internacional" />

      <section className="relative bg-white pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm text-carbon-soft/50">Fecha de entrada en vigor: 25 de Junio de 2026</p>

          <div className="mt-10 space-y-12 text-carbon-soft/80">
            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">1. Introducción y Responsable del Tratamiento</h2>
              <p className="leading-relaxed">
                Esta Política de Privacidad describe el marco legal bajo el cual <strong>Axenor Corporations S.A.S.</strong> ("Axenor", "Nosotros", "Nuestro"), constituida bajo las leyes de la República de Colombia con domicilio principal en la CALLE 181 C 13 91, Bogotá D.C., Colombia, recopila, procesa y protege su información personal. Axenor actúa como el responsable del tratamiento de los datos frente a nuestras aplicaciones móviles, plataformas web y servicios de Inteligencia Artificial (en adelante, el "Servicio" o los "Servicios").
              </p>
              <p className="mt-4 leading-relaxed">
                Nuestros Servicios están dirigidos principalmente a empresas, pymes y negocios (B2B). En consecuencia, no recopilamos deliberadamente información de personas menores de 18 años.
              </p>
              <p className="mt-4 leading-relaxed">
                Esta política está diseñada para cumplir con la <strong>Ley 1581 de 2012 (Colombia)</strong>, el <strong>Reglamento General de Protección de Datos (GDPR - Europa)</strong>, y la <strong>Ley de Privacidad del Consumidor de California (CCPA / CPRA)</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">2. Información que Recopilamos</h2>
              <p className="leading-relaxed mb-4">Al interactuar con nuestros Servicios, recopilamos los siguientes datos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Datos de Cuenta y Perfil:</strong> Nombre, correo electrónico, datos de facturación de la empresa y credenciales.</li>
                <li><strong>Datos de Uso y Telemetría:</strong> Direcciones IP, interacciones dentro de las aplicaciones y datos de rendimiento.</li>
                <li><strong>Datos Locales e Híbridos:</strong> Parte de la información es procesada en sus dispositivos y posteriormente sincronizada con nuestra infraestructura en la nube (ej. bases de datos en Supabase) y nuestros servidores físicos ubicados en Bogotá.</li>
                <li><strong>Datos para Inteligencia Artificial:</strong> Recopilamos los <em>inputs</em>, contextos y comandos que usted suministra a nuestros modelos de IA, así como los metadatos generados al interactuar con IAs nativas de su sistema operativo.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">3. Uso de la Información, Sub-procesadores y Base Legal</h2>
              <p className="leading-relaxed mb-4">
                Procesamos su información basándonos en la ejecución de nuestro contrato corporativo, nuestro interés legítimo y, cuando corresponde, su consentimiento explícito. Los fines incluyen:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Operación de la Plataforma:</strong> Proveer la funcionalidad de nuestras aplicaciones.</li>
                <li><strong>Infraestructura y Procesamiento Externo:</strong> Para escalar y mantener nuestras aplicaciones, compartimos datos estrictamente necesarios con sub-procesadores de infraestructura y modelos de lenguaje de terceros, específicamente <strong>Amazon Web Services (AWS) y OpenAI</strong>.</li>
                <li><strong>Entrenamiento de IA Propietaria:</strong> Utilizamos datos anonimizados para entrenar y mejorar modelos de IA propios alojados en nuestros servidores locales en Bogotá.</li>
                <li><strong>Tecnología de Decisiones Automatizadas (ADMT):</strong> Empleamos ADMT para optimizar flujos comerciales y predecir comportamientos de la plataforma.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">4. Publicidad y "Venta/Intercambio" de Datos (CCPA)</h2>
              <p className="leading-relaxed mb-4">
                Para nuestros esfuerzos de comercialización, integramos píxeles y tecnologías de rastreo, específicamente <strong>Google Ads y Meta Pixel</strong>. Bajo la definición estricta de la Ley de Privacidad de California (CCPA), el uso de estas herramientas para publicidad dirigida (<em>behavioral advertising</em>) constituye un "intercambio" (Sharing) de información.
              </p>
              <p className="leading-relaxed">
                Usted tiene el derecho inalienable de excluirse (<em>opt-out</em>) de este rastreo a través del centro de preferencias en nuestro sitio web oficial https://axenorcorporations.com o configurando en su navegador la señal <em>Global Privacy Control</em> (GPC), la cual nuestra infraestructura respetará de manera automática.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">5. Retención y Eliminación de Datos (Soft-Delete)</h2>
              <p className="leading-relaxed mb-4">
                Retenemos la información personal y los registros del sistema operativo por el <strong>tiempo máximo permitido por las leyes aplicables</strong> relativas a la retención de documentación contable, fiscal y comercial (generalmente 10 años en jurisdicciones como Colombia).
              </p>
              <p className="leading-relaxed mb-4">
                Cuando un usuario ejerce su derecho a la eliminación de la cuenta (Derecho al Olvido), Axenor ejecuta un procedimiento de <strong>retención bloqueada o "Soft-Delete"</strong>. Esto significa que:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Su perfil y datos desaparecen del entorno en vivo (frontend) y cesa todo procesamiento para marketing o entrenamiento de IA.</li>
                <li>Los datos son encriptados y conservados en nuestra base de datos en un estado inactivo de acceso restringido, única y exclusivamente para cumplir con requerimientos de autoridades legales, auditorías fiscales y defensa ante reclamaciones judiciales. Finalizado el periodo legal obligatorio de conservación, los datos son purgados permanentemente.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">6. Transferencias Internacionales de Datos</h2>
              <p className="leading-relaxed">
                Dado que utilizamos sub-procesadores como AWS y OpenAI, y operamos bases de datos distribuidas a través de Supabase, su información se procesa de forma transfronteriza. Para residentes del Espacio Económico Europeo (EEE), todas las transferencias hacia Colombia y Estados Unidos están protegidas mediante las Cláusulas Contractuales Tipo (SCCs) aprobadas por la Comisión Europea.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">7. Sus Derechos Legales</h2>
              <p className="leading-relaxed mb-4">
                Independientemente de si usted actúa bajo el amparo de la Ley 1581 (Colombia), el GDPR o la CCPA, Axenor le garantiza los siguientes derechos fundamentales:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Acceso y Portabilidad:</strong> Solicitar una copia de la información que tenemos sobre usted.</li>
                <li><strong>Rectificación:</strong> Actualizar o corregir datos inexactos.</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de su cuenta, sujeta a la política de <em>Soft-Delete</em> por cumplimiento legal detallada en la Sección 5.</li>
                <li><strong>Oposición y Restricción:</strong> Oponerse al procesamiento de datos para fines de marketing directo o uso en modelos de ADMT.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">8. Contacto</h2>
              <p className="leading-relaxed">
                Para ejercer cualquiera de sus derechos, presentar una queja sobre el manejo de sus datos o realizar solicitudes a través de plataformas DROP, debe comunicarse directamente con nuestro equipo de cumplimiento de privacidad mediante el correo electrónico oficial: <strong>contact@axenorcorporations.com</strong>. Atenderemos su solicitud dentro de los plazos estipulados por la ley correspondiente a su país de residencia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
