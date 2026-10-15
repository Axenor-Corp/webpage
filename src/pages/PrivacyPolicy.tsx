import PageHeader from '../components/ui/PageHeader';
import { useLanguage } from '../hooks/useLanguage';

export default function PrivacyPolicy() {
  return useLanguage() === 'en' ? <PrivacyPolicyEn /> : <PrivacyPolicyEs />;
}

function PrivacyPolicyEs() {
  return (
    <div>
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
    </div>
  );
}

function PrivacyPolicyEn() {
  return (
    <div>
      <PageHeader title="International Privacy Policy" />

      <section className="relative bg-white pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm text-carbon-soft/50">Effective date: June 25, 2026</p>
          <p className="mt-2 text-sm text-carbon-soft/50">
            This English version is provided for convenience. In the event of any discrepancy, the Spanish version shall prevail.
          </p>

          <div className="mt-10 space-y-12 text-carbon-soft/80">
            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">1. Introduction and Data Controller</h2>
              <p className="leading-relaxed">
                This Privacy Policy describes the legal framework under which <strong>Axenor Corporations S.A.S.</strong> ("Axenor", "We", "Our"), incorporated under the laws of the Republic of Colombia with its principal place of business at CALLE 181 C 13 91, Bogotá D.C., Colombia, collects, processes and protects your personal information. Axenor acts as the data controller for our mobile applications, web platforms and Artificial Intelligence services (hereinafter, the "Service" or the "Services").
              </p>
              <p className="mt-4 leading-relaxed">
                Our Services are aimed primarily at companies, SMEs and businesses (B2B). Accordingly, we do not knowingly collect information from individuals under 18 years of age.
              </p>
              <p className="mt-4 leading-relaxed">
                This policy is designed to comply with <strong>Law 1581 of 2012 (Colombia)</strong>, the <strong>General Data Protection Regulation (GDPR, Europe)</strong> and the <strong>California Consumer Privacy Act (CCPA / CPRA)</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">2. Information We Collect</h2>
              <p className="leading-relaxed mb-4">When you interact with our Services, we collect the following data:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account and Profile Data:</strong> Name, email address, company billing information and credentials.</li>
                <li><strong>Usage and Telemetry Data:</strong> IP addresses, in-app interactions and performance data.</li>
                <li><strong>Local and Hybrid Data:</strong> Some information is processed on your devices and later synchronized with our cloud infrastructure (e.g., Supabase databases) and our physical servers located in Bogotá.</li>
                <li><strong>Artificial Intelligence Data:</strong> We collect the <em>inputs</em>, contexts and commands you provide to our AI models, as well as the metadata generated when you interact with your operating system's native AI.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">3. Use of Information, Sub-processors and Legal Basis</h2>
              <p className="leading-relaxed mb-4">
                We process your information on the basis of the performance of our corporate contract, our legitimate interest and, where applicable, your explicit consent. The purposes include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Platform Operation:</strong> Providing the functionality of our applications.</li>
                <li><strong>Infrastructure and External Processing:</strong> To scale and maintain our applications, we share strictly necessary data with third-party infrastructure and language model sub-processors, specifically <strong>Amazon Web Services (AWS) and OpenAI</strong>.</li>
                <li><strong>Proprietary AI Training:</strong> We use anonymized data to train and improve our own AI models hosted on our local servers in Bogotá.</li>
                <li><strong>Automated Decision-Making Technology (ADMT):</strong> We use ADMT to optimize business workflows and predict platform behavior.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">4. Advertising and "Sale/Sharing" of Data (CCPA)</h2>
              <p className="leading-relaxed mb-4">
                For our marketing efforts, we integrate pixels and tracking technologies, specifically <strong>Google Ads and Meta Pixel</strong>. Under the strict definition of the California Consumer Privacy Act (CCPA), the use of these tools for targeted advertising (<em>behavioral advertising</em>) constitutes "sharing" of information.
              </p>
              <p className="leading-relaxed">
                You have the inalienable right to opt out of this tracking through the preferences center on our official website https://axenorcorporations.com or by enabling the <em>Global Privacy Control</em> (GPC) signal in your browser, which our infrastructure will honor automatically.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">5. Data Retention and Deletion (Soft-Delete)</h2>
              <p className="leading-relaxed mb-4">
                We retain personal information and operating system records for the <strong>maximum period permitted by applicable laws</strong> on the retention of accounting, tax and commercial records (generally 10 years in jurisdictions such as Colombia).
              </p>
              <p className="leading-relaxed mb-4">
                When a user exercises their right to account deletion (Right to Be Forgotten), Axenor carries out a <strong>blocked retention or "Soft-Delete"</strong> procedure. This means that:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Your profile and data disappear from the live environment (frontend), and all processing for marketing or AI training stops.</li>
                <li>The data is encrypted and kept in our database in an inactive, restricted-access state, solely and exclusively to comply with requests from legal authorities, tax audits and the defense of legal claims. Once the mandatory legal retention period ends, the data is permanently purged.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">6. International Data Transfers</h2>
              <p className="leading-relaxed">
                Because we use sub-processors such as AWS and OpenAI, and operate distributed databases through Supabase, your information is processed across borders. For residents of the European Economic Area (EEA), all transfers to Colombia and the United States are protected by the Standard Contractual Clauses (SCCs) approved by the European Commission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">7. Your Legal Rights</h2>
              <p className="leading-relaxed mb-4">
                Regardless of whether you are protected by Law 1581 (Colombia), the GDPR or the CCPA, Axenor guarantees you the following fundamental rights:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Access and Portability:</strong> Request a copy of the information we hold about you.</li>
                <li><strong>Rectification:</strong> Update or correct inaccurate data.</li>
                <li><strong>Erasure:</strong> Request the deletion of your account, subject to the <em>Soft-Delete</em> policy for legal compliance described in Section 5.</li>
                <li><strong>Objection and Restriction:</strong> Object to the processing of your data for direct marketing purposes or for use in ADMT models.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">8. Contact</h2>
              <p className="leading-relaxed">
                To exercise any of your rights, file a complaint about the handling of your data or submit requests through DROP platforms, you must contact our privacy compliance team directly at the official email address: <strong>contact@axenorcorporations.com</strong>. We will respond to your request within the time limits set by the law applicable in your country of residence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
