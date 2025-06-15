export default function SobreNosotrosPage() {
  return (
    <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Sobre FisioSalut</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            En FisioSalut, nos dedicamos a proporcionar atención de fisioterapia de la más alta calidad, combinando técnicas tradicionales probadas con los últimos avances en rehabilitación física.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
          <div className="relative lg:order-last lg:col-span-5">
            <figure className="border-l border-blue-600 pl-8">              <blockquote className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                <p>
                  &ldquo;Nuestro compromiso es mejorar la calidad de vida de nuestros pacientes a través de tratamientos personalizados y atención integral.&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-8 flex gap-x-4">
                <div className="text-sm leading-6">
                  <div className="font-semibold text-gray-900">Dr. María García</div>
                  <div className="text-gray-600">Directora de FisioSalut</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
            <p>
              Fundada en 2010, FisioSalut ha sido un referente en la comunidad por nuestra dedicación a la excelencia en el cuidado del paciente. Nuestro equipo está formado por profesionales altamente cualificados y comprometidos con la mejora continua.
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <svg className="mt-1 h-5 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong className="font-semibold text-gray-900">Instalaciones modernas.</strong> Contamos con equipamiento de última generación y espacios diseñados para tu comodidad y recuperación óptima.
                </span>
              </li>
              <li className="flex gap-x-3">
                <svg className="mt-1 h-5 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong className="font-semibold text-gray-900">Atención personalizada.</strong> Cada paciente es único, por eso desarrollamos planes de tratamiento adaptados a tus necesidades específicas.
                </span>
              </li>
              <li className="flex gap-x-3">
                <svg className="mt-1 h-5 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                  <path fillRule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong className="font-semibold text-gray-900">Formación continua.</strong> Nuestro equipo se mantiene actualizado con las últimas técnicas y avances en fisioterapia.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Nuestra misión es ayudarte a recuperar tu movilidad y bienestar, permitiéndote volver a realizar tus actividades diarias sin dolor y con confianza.
            </p>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Nuestros Valores</h2>
            <p className="mt-6">
              - Compromiso con la excelencia<br />
              - Atención centrada en el paciente<br />
              - Profesionalidad y ética<br />
              - Innovación y mejora continua<br />
              - Trabajo en equipo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
