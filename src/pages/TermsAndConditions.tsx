import PageHeader from '../components/ui/PageHeader';

export default function TermsAndConditions() {
  return (
    <>
      <PageHeader title="Términos y Condiciones de Uso" />

      <section className="relative bg-white pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm text-carbon-soft/50">Fecha de vigencia: 25 de Junio de 2026</p>

          <div className="mt-10 space-y-12 text-carbon-soft/80">
            <div>
              <p className="leading-relaxed font-medium">
                Al descargar, acceder o utilizar la plataforma de [Nombre de la Empresa] ("Nosotros", el "Servicio"), usted ("el Usuario") acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo, no debe utilizar el Servicio.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">1. Descripción del Servicio y Arquitectura Técnica</h2>
              <p className="leading-relaxed">
                Nuestro Servicio proporciona soluciones de software que operan a través de una arquitectura híbrida, combinando procesamiento local en el dispositivo, servidores gestionados mediante túneles seguros y bases de datos en la nube (BaaS). El Servicio incluye funcionalidades impulsadas por Inteligencia Artificial (IA), tanto modelos propios alojados en nuestra infraestructura como integraciones con IA nativa de los sistemas operativos de terceros (ej., Apple Intelligence o equivalentes en Android).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">2. Uso Aceptable y Restricciones</h2>
              <p className="leading-relaxed mb-4">Usted se compromete a no:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Descompilar, aplicar ingeniería inversa, o intentar extraer el código fuente, algoritmos o modelos de IA de la plataforma.</li>
                <li>Utilizar el Servicio para generar, procesar o transmitir contenido ilegal, difamatorio, discriminatorio o que infrinja la propiedad intelectual de terceros.</li>
                <li>Utilizar procesos automatizados (bots, scrapers) para acceder al Servicio sin nuestra autorización expresa.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">3. Propiedad Intelectual y Licencia de Uso</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Propiedad de la Empresa:</strong> Conservamos todos los derechos, títulos e intereses, incluyendo derechos de autor y patentes, sobre el software, la arquitectura de la nube, las interfaces y nuestros modelos de IA propietarios.</li>
                <li><strong>Propiedad del Usuario:</strong> Usted conserva todos los derechos sobre la información, textos, imágenes u otros contenidos que introduzca en la plataforma ("Inputs").</li>
                <li><strong>Licencia para Entrenamiento de IA:</strong> A menos que usted revoque expresamente su consentimiento (Opt-out) en el panel de configuración de privacidad, al usar el Servicio usted nos otorga una licencia global, libre de regalías y no exclusiva para usar, procesar y anonimizar sus "Inputs" con el fin de entrenar, refinar y mejorar nuestros modelos de IA y Tecnologías de Toma de Decisiones Automatizadas (ADMT).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">4. Renuncia y Limitación de Responsabilidad (Especial IA)</h2>
              <p className="leading-relaxed mb-4"><strong>Uso de Inteligencia Artificial:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Naturaleza Probabilística:</strong> El Usuario reconoce que las respuestas y resultados generados por los modelos de IA son de naturaleza probabilística. El Servicio se proporciona "TAL CUAL" (As Is).</li>
                <li><strong>Sin Garantías de Precisión:</strong> No garantizamos la exactitud, fiabilidad, imparcialidad o idoneidad de las respuestas generadas por la IA. El usuario es el único responsable de revisar y verificar de forma independiente cualquier resultado o decisión (incluidas las influenciadas por ADMT) tomada con base en el uso de la plataforma.</li>
                <li><strong>Integraciones de Terceros:</strong> No somos responsables por el rendimiento, fallas de seguridad, violaciones de privacidad o sesgos provenientes de la Inteligencia Artificial nativa de los sistemas operativos (ej. Apple, Google) utilizados de manera local en el dispositivo del usuario.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">5. Disponibilidad del Servicio ("As Available")</h2>
              <p className="leading-relaxed">
                No garantizamos que el Servicio será ininterrumpido, oportuno, seguro o libre de errores. La conexión depende de la infraestructura del usuario y de terceros (proveedores cloud, Cloudflare, ISPs). Nos reservamos el derecho de suspender, modificar o discontinuar el Servicio por mantenimiento o actualizaciones sin previo aviso.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">6. Suspensión y Terminación de la Cuenta</h2>
              <p className="leading-relaxed">
                Nos reservamos el derecho de suspender o terminar el acceso al Servicio en cualquier momento, con o sin causa, de manera inmediata, especialmente frente al incumplimiento de la cláusula de "Uso Aceptable".
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">7. Ley Aplicable y Jurisdicción</h2>
              <p className="leading-relaxed">
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de la <strong>República de Colombia</strong>, sin dar efecto a sus principios de conflictos de leyes. Cualquier disputa, controversia o reclamo que surja en relación con estos Términos será sometida a la jurisdicción exclusiva de los tribunales competentes en [Ciudad], Colombia. No obstante, esto no impedirá a los consumidores internacionales ejercer los derechos inderogables previstos en la legislación de su país de residencia.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">8. Modificaciones</h2>
              <p className="leading-relaxed">
                Podemos modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor en el momento de su publicación. El uso continuado del Servicio constituye su aceptación de los nuevos Términos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
