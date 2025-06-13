export default function ServiciosPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestros Servicios</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Ofrecemos una amplia gama de servicios de fisioterapia y rehabilitación
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {[
            {
              title: 'Fisioterapia Deportiva',
              description: 'Recuperación y prevención de lesiones deportivas. Mejora tu rendimiento y previene lesiones futuras.',
              included: [
                'Evaluación biomecánica',
                'Tratamiento de lesiones',
                'Programas de prevención',
                'Vendaje funcional',
              ],
            },
            {
              title: 'Rehabilitación Física',
              description: 'Programas personalizados para recuperación post-lesión o post-operatoria.',
              included: [
                'Evaluación inicial',
                'Plan personalizado',
                'Ejercicios terapéuticos',
                'Seguimiento continuo',
              ],
            },
            {
              title: 'Terapia Manual',
              description: 'Técnicas especializadas para el tratamiento del dolor y disfunciones musculoesqueléticas.',
              included: [
                'Masaje terapéutico',
                'Movilización articular',
                'Liberación miofascial',
                'Punción seca',
              ],
            },
          ].map((service) => (
            <div key={service.title} className="flex flex-col">
              <div className="rounded-2xl border border-gray-200 p-8">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">{service.description}</p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {service.included.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
