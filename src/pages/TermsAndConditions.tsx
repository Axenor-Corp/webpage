import PageHeader from '../components/ui/PageHeader';
import { useLanguage } from '../hooks/useLanguage';

export default function TermsAndConditions() {
  return useLanguage() === 'en' ? <TermsAndConditionsEn /> : <TermsAndConditionsEs />;
}

function TermsAndConditionsEs() {
  return (
    <div>
      <PageHeader title="Términos y Condiciones Generales de Uso" />

      <section className="relative bg-white pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm text-carbon-soft/50">Fecha de vigencia: 25 de Junio de 2026</p>

          <div className="mt-10 space-y-12 text-carbon-soft/80">
            <div>
              <p className="leading-relaxed font-medium">
                Al instalar, descargar, acceder o utilizar cualquier plataforma móvil, aplicación web, sistema de Inteligencia Artificial (IA) o servicio proporcionado por <strong>Axenor Corporations S.A.S.</strong> ("Axenor", "Nosotros", el "Servicio"), usted (el "Cliente" o "Usuario") acepta estar sujeto de forma vinculante a estos Términos y Condiciones. Este acuerdo es de naturaleza corporativa y comercial, dado que nuestros sistemas están diseñados preferentemente para el entorno B2B (empresas, pymes y negocios). Si no está de acuerdo con estos términos, debe abstenerse inmediatamente de utilizar nuestros Servicios.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">1. Descripción del Servicio y Arquitectura</h2>
              <p className="leading-relaxed">
                Axenor ofrece un portafolio de software, herramientas operacionales y modelos de Inteligencia Artificial. La arquitectura de nuestros Servicios opera mediante una sincronización híbrida: la información es procesada localmente en su dispositivo, pero también se almacena, procesa y sincroniza con bases de datos en la nube (como Supabase) y servidores de nuestra propiedad alojados físicamente en la ciudad de Bogotá D.C., Colombia.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">2. Propiedad Intelectual</h2>
              <ul className="list-disc pl-5 space-y-4">
                <li><strong>Titularidad de Axenor:</strong> Axenor Corporations S.A.S. conserva exclusivamente la totalidad de los derechos, títulos e intereses, incluyendo código fuente, arquitecturas de software, interfaces, marcas registradas y algoritmos de IA de desarrollo local.</li>
                <li><strong>Inputs del Cliente y Licencia:</strong> Usted retiene la propiedad de los datos y documentos que ingresa en la plataforma. No obstante, al utilizar el Servicio, usted otorga a Axenor una licencia global, no exclusiva y libre de regalías para procesar dichos datos a fin de mantener la operatividad del software, realizar sincronizaciones y entrenar nuestros algoritmos de Inteligencia Artificial, salvo que ejerza activamente su derecho de exclusión (Opt-Out) a través de nuestros canales oficiales.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">3. Uso de Inteligencia Artificial (Local y de Terceros)</h2>
              <p className="leading-relaxed mb-4">
                Nuestros Servicios implementan capacidades de Inteligencia Artificial impulsadas por modelos propietarios locales e integraciones con proveedores de infraestructura externa de primera línea, específicamente <strong>Amazon Web Services (AWS) y OpenAI</strong>. Asimismo, la plataforma puede interactuar con la IA nativa del sistema operativo de su dispositivo.
              </p>
              <ul className="list-disc pl-5 space-y-4">
                <li><strong>Resultados Probabilísticos:</strong> Los modelos de IA generan outputs basados en probabilidades estadísticas. Axenor no garantiza la precisión, exactitud, imparcialidad o idoneidad legal de las respuestas, recomendaciones o textos generados por la IA.</li>
                <li><strong>Verificación Humana Obligatoria:</strong> El Usuario reconoce y acepta que es enteramente responsable de validar y verificar de manera independiente cualquier decisión comercial, operativa o legal tomada con base en los resultados proporcionados por los Servicios de IA de Axenor.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">4. Renuncia de Garantías y Limitación de Responsabilidad</h2>
              <p className="leading-relaxed mb-4">
                <strong>Disponibilidad "As Is":</strong> El software y los Servicios se proporcionan en estado "TAL CUAL" y "SEGÚN DISPONIBILIDAD". Axenor repudia explícitamente cualquier garantía implícita de comerciabilidad o idoneidad para un propósito particular. No garantizamos que los Servicios estarán libres de interrupciones, errores, latencias o fallos de sincronización con la nube.
              </p>
              <p className="leading-relaxed">
                <strong>Daños Indirectos:</strong> En ningún caso Axenor Corporations S.A.S., sus directores, empleados o proveedores serán legalmente responsables por daños indirectos, incidentales, lucro cesante, pérdida de datos o interrupciones del negocio derivados del uso o la incapacidad de uso de las aplicaciones.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">5. Cuentas y Restricciones de Uso</h2>
              <p className="leading-relaxed mb-4">
                Para utilizar el Servicio, usted debe ser mayor de 18 años y poseer la capacidad legal plena para celebrar contratos vinculantes. Queda terminantemente prohibido:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Realizar ingeniería inversa, descompilación o escaneo profundo de la arquitectura de la red o los modelos de IA de Axenor.</li>
                <li>Utilizar la plataforma para distribuir código malicioso, llevar a cabo actividades ilícitas o violar derechos de terceros.</li>
                <li>Utilizar <em>web scrapers</em> o extracción automatizada masiva sin la debida autorización por escrito.</li>
              </ul>
              <p className="leading-relaxed">
                Nos reservamos el derecho unilateral de suspender, terminar o bloquear de manera inmediata cualquier cuenta que infrinja estas disposiciones, sin necesidad de notificación previa.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">6. Ley Aplicable y Jurisdicción</h2>
              <p className="leading-relaxed">
                La validez, interpretación y ejecución de este contrato se regirán bajo las leyes de la <strong>República de Colombia</strong>. Toda controversia, disputa o reclamación que surja en relación con estos Términos, el uso del software o la privacidad de los datos, y que no pueda resolverse de mutuo acuerdo, será sometida a la jurisdicción exclusiva de los <strong>Jueces de la República de Colombia en la ciudad de Bogotá D.C.</strong>. Usted renuncia irrevocablemente a presentar cualquier objeción en relación con la competencia de dichos tribunales.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">7. Disposiciones Finales</h2>
              <ul className="list-disc pl-5 space-y-4">
                <li><strong>Contacto Legal:</strong> Para notificaciones legales y comerciales relacionadas con el presente contrato, dirija sus comunicaciones a <strong>contact@axenorcorporations.com</strong>.</li>
                <li><strong>Modificaciones:</strong> Axenor se reserva el derecho de modificar estos Términos en cualquier momento para adaptarse a nuevas regulaciones o cambios en el portafolio de productos. Se considerará que usted ha aceptado tácitamente las modificaciones si continúa utilizando la plataforma tras su publicación en el sitio web de la empresa: https://axenorcorporations.com.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TermsAndConditionsEn() {
  return (
    <div>
      <PageHeader title="General Terms and Conditions of Use" />

      <section className="relative bg-white pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm text-carbon-soft/50">Effective date: June 25, 2026</p>
          <p className="mt-2 text-sm text-carbon-soft/50">
            This English version is provided for convenience. In the event of any discrepancy, the Spanish version shall prevail.
          </p>

          <div className="mt-10 space-y-12 text-carbon-soft/80">
            <div>
              <p className="leading-relaxed font-medium">
                By installing, downloading, accessing or using any mobile platform, web application, Artificial Intelligence (AI) system or service provided by <strong>Axenor Corporations S.A.S.</strong> ("Axenor", "We", the "Service"), you (the "Client" or "User") agree to be legally bound by these Terms and Conditions. This agreement is corporate and commercial in nature, since our systems are designed primarily for the B2B environment (companies, SMEs and businesses). If you do not agree with these terms, you must immediately refrain from using our Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">1. Service Description and Architecture</h2>
              <p className="leading-relaxed">
                Axenor offers a portfolio of software, operational tools and Artificial Intelligence models. Our Services operate through hybrid synchronization: information is processed locally on your device, but it is also stored, processed and synchronized with cloud databases (such as Supabase) and with servers owned by us and physically hosted in Bogotá D.C., Colombia.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">2. Intellectual Property</h2>
              <ul className="list-disc pl-5 space-y-4">
                <li><strong>Axenor Ownership:</strong> Axenor Corporations S.A.S. exclusively retains all rights, title and interest, including source code, software architectures, interfaces, trademarks and locally developed AI algorithms.</li>
                <li><strong>Client Inputs and License:</strong> You retain ownership of the data and documents you enter into the platform. However, by using the Service, you grant Axenor a worldwide, non-exclusive, royalty-free license to process such data in order to keep the software operational, perform synchronizations and train our Artificial Intelligence algorithms, unless you actively exercise your right to opt out through our official channels.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">3. Use of Artificial Intelligence (Local and Third-Party)</h2>
              <p className="leading-relaxed mb-4">
                Our Services implement Artificial Intelligence capabilities powered by local proprietary models and integrations with leading external infrastructure providers, specifically <strong>Amazon Web Services (AWS) and OpenAI</strong>. The platform may also interact with the native AI of your device's operating system.
              </p>
              <ul className="list-disc pl-5 space-y-4">
                <li><strong>Probabilistic Results:</strong> AI models generate outputs based on statistical probabilities. Axenor does not guarantee the precision, accuracy, impartiality or legal suitability of the answers, recommendations or texts generated by the AI.</li>
                <li><strong>Mandatory Human Verification:</strong> The User acknowledges and agrees that they are solely responsible for independently validating and verifying any business, operational or legal decision made on the basis of the results provided by Axenor's AI Services.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">4. Disclaimer of Warranties and Limitation of Liability</h2>
              <p className="leading-relaxed mb-4">
                <strong>"As Is" Availability:</strong> The software and the Services are provided "AS IS" and "AS AVAILABLE". Axenor expressly disclaims any implied warranty of merchantability or fitness for a particular purpose. We do not guarantee that the Services will be free from interruptions, errors, latency or cloud synchronization failures.
              </p>
              <p className="leading-relaxed">
                <strong>Indirect Damages:</strong> In no event shall Axenor Corporations S.A.S., its directors, employees or suppliers be legally liable for indirect or incidental damages, lost profits, loss of data or business interruption arising from the use of, or the inability to use, the applications.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">5. Accounts and Usage Restrictions</h2>
              <p className="leading-relaxed mb-4">
                To use the Service, you must be over 18 years of age and have full legal capacity to enter into binding contracts. The following is strictly prohibited:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Reverse engineering, decompiling or deep scanning Axenor's network architecture or AI models.</li>
                <li>Using the platform to distribute malicious code, carry out unlawful activities or infringe the rights of third parties.</li>
                <li>Using <em>web scrapers</em> or massive automated extraction without proper written authorization.</li>
              </ul>
              <p className="leading-relaxed">
                We reserve the unilateral right to immediately suspend, terminate or block any account that violates these provisions, without prior notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">6. Governing Law and Jurisdiction</h2>
              <p className="leading-relaxed">
                The validity, interpretation and enforcement of this agreement shall be governed by the laws of the <strong>Republic of Colombia</strong>. Any controversy, dispute or claim arising in connection with these Terms, the use of the software or data privacy that cannot be resolved by mutual agreement shall be submitted to the exclusive jurisdiction of the <strong>Courts of the Republic of Colombia in the city of Bogotá D.C.</strong> You irrevocably waive any objection regarding the jurisdiction of such courts.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">7. Final Provisions</h2>
              <ul className="list-disc pl-5 space-y-4">
                <li><strong>Legal Contact:</strong> For legal and commercial notices related to this agreement, address your communications to <strong>contact@axenorcorporations.com</strong>.</li>
                <li><strong>Amendments:</strong> Axenor reserves the right to amend these Terms at any time to adapt to new regulations or changes in the product portfolio. You will be deemed to have tacitly accepted the amendments if you continue to use the platform after they are published on the company website: https://axenorcorporations.com.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
