import PageHeader from '../components/ui/PageHeader';

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader title="Política de Privacidad Internacional" />

      <section className="relative bg-white pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm text-carbon-soft/50">Fecha de entrada en vigor: 25 de Junio de 2026 | Última actualización: 25 de Junio de 2026</p>

          <div className="mt-10 space-y-12 text-carbon-soft/80">
            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">1. Introducción y Responsable del Tratamiento</h2>
              <p className="leading-relaxed">
                Esta Política de Privacidad describe cómo recopilamos, utilizamos, procesamos y protegemos su información personal al utilizar nuestra aplicación y servicios (el "Servicio"). El responsable del tratamiento de sus datos es [Nombre de la Empresa], constituida bajo las leyes de la República de Colombia, con domicilio principal en [Dirección, Ciudad, Colombia] ("Nosotros", "Nuestro").
              </p>
              <p className="mt-4 leading-relaxed">
                Esta política actúa como un marco de cumplimiento global diseñado para satisfacer los estrictos requisitos de la <strong>Ley 1581 de 2012 (Colombia)</strong>, el <strong>Reglamento General de Protección de Datos (GDPR - Europa)</strong> y la <strong>Ley de Privacidad del Consumidor de California (CCPA) modificada por la CPRA</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">2. Información que Recopilamos</h2>
              <p className="leading-relaxed mb-4">Recopilamos información de forma directa e indirecta para proporcionar y optimizar nuestro Servicio:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Datos de Cuenta e Identidad:</strong> Nombre, correo electrónico, credenciales de acceso.</li>
                <li><strong>Datos de Uso y Analítica de Tracking:</strong> Dirección IP, tipo de dispositivo, sistema operativo, interacciones dentro de la app (clics, tiempo de uso, flujos de navegación), y rastreo de ubicación precisa (con consentimiento expreso).</li>
                <li><strong>Datos para Entrenamiento de IA y ADMT:</strong> Recopilamos inputs textuales, de voz o visuales que usted proporciona explícitamente para interactuar con nuestras funciones de Inteligencia Artificial. Esto incluye datos utilizados para tecnología de toma de decisiones automatizadas (ADMT).</li>
                <li><strong>Datos Procesados Localmente:</strong> Parte de la información es procesada localmente en su dispositivo mediante integraciones nativas del sistema operativo (ej. Apple Intelligence o equivalentes en Android). No tenemos acceso directo a estos datos procesados de forma estrictamente local, a menos que sean sincronizados con la nube bajo su consentimiento.</li>
                <li><strong>Cookies y Tecnologías Similares:</strong> Utilizamos cookies propias y de terceros, balizas web y SDKs para segmentación de publicidad dirigida (Ads) y análisis de rendimiento.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">3. Fines del Tratamiento y Bases Legales (GDPR)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 p-3 font-semibold text-carbon">Finalidad del Tratamiento</th>
                      <th className="border border-gray-200 p-3 font-semibold text-carbon">Base Legal (GDPR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Provisión del Servicio:</strong> Operación de la app, autenticación, almacenamiento en la nube vía túneles seguros (ej. Supabase, Cloudflare).</td>
                      <td className="border border-gray-200 p-3">Ejecución de un Contrato</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Analítica y Tracking:</strong> Mejora de la experiencia de usuario y monitoreo de estabilidad.</td>
                      <td className="border border-gray-200 p-3">Interés Legítimo / Consentimiento</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Publicidad Dirigida (Ads):</strong> Segmentación y entrega de anuncios personalizados.</td>
                      <td className="border border-gray-200 p-3">Consentimiento</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Entrenamiento de Modelos de IA:</strong> Uso de sus datos anonimizados para mejorar nuestros algoritmos de IA propietarios.</td>
                      <td className="border border-gray-200 p-3">Consentimiento Explícito</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Tecnología de Toma de Decisiones Automatizadas (ADMT):</strong> Para perfilar o automatizar flujos dentro de la plataforma.</td>
                      <td className="border border-gray-200 p-3">Consentimiento Explícito</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Cumplimiento Legal:</strong> Respuesta a requerimientos de autoridades competentes.</td>
                      <td className="border border-gray-200 p-3">Obligación Legal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">4. Compartir Información y Transferencias Internacionales</h2>
              <p className="leading-relaxed mb-4">Utilizamos infraestructura moderna para garantizar la seguridad. Sus datos se transfieren y almacenan utilizando:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Servicios en la Nube (BaaS):</strong> Como Supabase, para el almacenamiento seguro de bases de datos.</li>
                <li><strong>Túneles y Redes de Distribución:</strong> Como Cloudflare, para protección y enrutamiento.</li>
              </ul>
              <p className="leading-relaxed">
                <strong>Transferencias Internacionales:</strong> Al estar basados en Colombia y utilizar infraestructura en EE. UU. y la UE, realizamos transferencias transfronterizas. Para los usuarios en el EEE, nos amparamos en las <strong>Cláusulas Contractuales Tipo (SCCs)</strong> y salvaguardas técnicas adicionales exigidas por el GDPR.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">5. Derechos de los Usuarios por Jurisdicción</h2>
              
              <h3 className="text-xl font-semibold text-carbon mt-6 mb-3">A. Usuarios en Colombia (Ley 1581 de 2012)</h3>
              <p className="leading-relaxed mb-2">Como titular de la información, tiene derecho a:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Conocer, actualizar y rectificar sus datos personales.</li>
                <li>Solicitar prueba de la autorización otorgada.</li>
                <li>Ser informado sobre el uso de sus datos.</li>
                <li>Revocar la autorización y/o solicitar la supresión del dato.</li>
              </ul>

              <h3 className="text-xl font-semibold text-carbon mt-6 mb-3">B. Usuarios en Europa (GDPR)</h3>
              <p className="leading-relaxed mb-2">Los residentes del Espacio Económico Europeo tienen derecho a:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Acceso, Rectificación, y Borrado (Derecho al olvido).</li>
                <li>Restricción y Oposición al procesamiento (incluido el profiling).</li>
                <li>Portabilidad de los datos en formato estructurado.</li>
                <li>Retirar el consentimiento en cualquier momento.</li>
                <li>Presentar una queja ante una autoridad de control local.</li>
              </ul>

              <h3 className="text-xl font-semibold text-carbon mt-6 mb-3">C. Usuarios en California (CCPA / CPRA)</h3>
              <p className="leading-relaxed mb-2">En los últimos 12 meses, hemos recopilado las categorías de información detalladas en la Sección 2.</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>"Do Not Sell or Share My Personal Information":</strong> Utilizamos datos para publicidad conductual (sharing). Usted tiene derecho a excluirse (opt-out) en cualquier momento.</li>
                <li><strong>Tecnología de Toma de Decisiones Automatizadas (ADMT):</strong> Derecho de conocer la lógica subyacente y a solicitar exclusión.</li>
                <li><strong>Delete Request and Opt-Out Platform (DROP):</strong> Cumplimos y respondemos a las señales universales de exclusión (Global Privacy Control).</li>
                <li><strong>Evaluaciones de Riesgo (Risk Assessments):</strong> Realizamos auditorías de riesgo obligatorias regulares sobre el uso de nuestra IA.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">6. Retención de Datos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 p-3 font-semibold text-carbon">Tipo de Dato</th>
                      <th className="border border-gray-200 p-3 font-semibold text-carbon">Periodo de Retención</th>
                      <th className="border border-gray-200 p-3 font-semibold text-carbon">Acción Post-Retención</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Datos de Cuenta y Perfil</strong></td>
                      <td className="border border-gray-200 p-3">Hasta que el usuario elimine su cuenta + 30 días.</td>
                      <td className="border border-gray-200 p-3">Borrado permanente o anonimización total.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Datos de Tracking y Analítica</strong></td>
                      <td className="border border-gray-200 p-3">14 meses (estándar de la industria).</td>
                      <td className="border border-gray-200 p-3">Borrado permanente.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Cookies y Datos Publicitarios</strong></td>
                      <td className="border border-gray-200 p-3">6 a 12 meses desde el último consentimiento.</td>
                      <td className="border border-gray-200 p-3">Expiración automática.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Datos Ingeridos por IA (Propios)</strong></td>
                      <td className="border border-gray-200 p-3">Hasta que el usuario revoque el consentimiento para entrenamiento.</td>
                      <td className="border border-gray-200 p-3">Desvinculación inmediata y depuración.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 p-3"><strong>Logs de Seguridad (Cloudflare/Servidor)</strong></td>
                      <td className="border border-gray-200 p-3">90 días.</td>
                      <td className="border border-gray-200 p-3">Borrado automático y sobrescritura.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">7. Seguridad de los Datos y Procesamiento Local</h2>
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas, incluyendo cifrado en tránsito (TLS/SSL) y en reposo. Para funcionalidades que utilizan IA nativa del sistema operativo (Apple Intelligence, etc.), el procesamiento se realiza localmente ("On-Device"), minimizando la exposición de datos a la nube.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-carbon mb-4">8. Cambios y Contacto</h2>
              <p className="leading-relaxed">
                Podemos actualizar esta política. Le notificaremos sobre cambios significativos a través de la app. Para ejercer sus derechos, póngase en contacto con nuestro Oficial de Protección de Datos (DPO) en:
              </p>
              <ul className="mt-2 space-y-1">
                <li><strong>Email:</strong> privacy@[dominio].com</li>
                <li><strong>Portal de Privacidad (Opt-Out / DROP):</strong> Accesible desde el enlace "Do Not Sell or Share My Personal Information" en el pie de página.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
