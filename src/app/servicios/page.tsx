'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const servicios = [
  {
    title: 'Fisioterapia Deportiva',
    description: 'Recuperación y prevención de lesiones deportivas. Mejora tu rendimiento y previene lesiones futuras.',
    price: 'Desde 45€',
    duration: '60 min',
    included: [
      'Evaluación biomecánica completa',
      'Tratamiento específico de lesiones',
      'Programas de prevención personalizados',
      'Vendaje funcional especializado',
      'Ejercicios de readaptación deportiva',
    ],
    icon: '🏃‍♂️',
  },
  {
    title: 'Rehabilitación Física',
    description: 'Programas personalizados para recuperación post-lesión o post-operatoria.',
    price: 'Desde 40€',
    duration: '50 min',
    included: [
      'Evaluación inicial detallada',
      'Plan de tratamiento personalizado',
      'Ejercicios terapéuticos progresivos',
      'Seguimiento continuo del progreso',
      'Educación postural y preventiva',
    ],
    icon: '🦴',
  },
  {
    title: 'Terapia Manual',
    description: 'Técnicas especializadas para el tratamiento del dolor y disfunciones musculoesqueléticas.',
    price: 'Desde 50€',
    duration: '45 min',
    included: [
      'Masaje terapéutico profundo',
      'Movilización articular específica',
      'Liberación miofascial avanzada',
      'Punción seca para puntos gatillo',
      'Técnicas osteopáticas',
    ],
    icon: '👐',
  },
  {
    title: 'Fisioterapia Neurológica',
    description: 'Tratamiento especializado para condiciones neurológicas y recuperación funcional.',
    price: 'Desde 55€',
    duration: '60 min',
    included: [
      'Evaluación neurológica funcional',
      'Reeducación del movimiento',
      'Ejercicios de equilibrio y coordinación',
      'Estimulación neuromuscular',
      'Entrenamiento de la marcha',
    ],
    icon: '🧠',
  },
  {
    title: 'Fisioterapia Pediátrica',
    description: 'Cuidado especializado para bebés, niños y adolescentes.',
    price: 'Desde 40€',
    duration: '45 min',
    included: [
      'Evaluación del desarrollo motor',
      'Tratamiento de tortícolis congénita',
      'Terapia respiratoria infantil',
      'Ejercicios lúdicos y divertidos',
      'Orientación a los padres',
    ],
    icon: '👶',
  },
  {
    title: 'Fisioterapia Respiratoria',
    description: 'Mejora la función pulmonar y el sistema respiratorio.',
    price: 'Desde 45€',
    duration: '50 min',
    included: [
      'Ejercicios respiratorios específicos',
      'Técnicas de limpieza bronquial',
      'Fortalecimiento de músculos respiratorios',
      'Reeducación diafragmática',
      'Educación en higiene bronquial',
    ],
    icon: '🫁',
  },
];

export default function ServiciosPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nuestros Servicios Profesionales
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Ofrecemos una amplia gama de servicios de fisioterapia especializados, 
            adaptados a tus necesidades específicas con los más altos estándares de calidad.
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3"
        >
          {servicios.map((servicio) => (
            <motion.div
              key={servicio.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{servicio.icon}</div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{servicio.duration}</div>
                    <div className="text-lg font-semibold text-blue-600">{servicio.price}</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold leading-8 text-gray-900 mb-4">
                  {servicio.title}
                </h3>
                <p className="text-sm leading-6 text-gray-600 mb-6">
                  {servicio.description}
                </p>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">Incluye:</h4>
                  <ul className="space-y-2 text-sm leading-6 text-gray-600">
                    {servicio.included.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex gap-x-3">
                        <svg className="h-5 w-5 flex-none text-blue-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/cita'}
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Reservar Cita
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-gray-600 mb-6">
              Ofrecemos consultas personalizadas para casos específicos. 
              Contáctanos para hablar sobre tus necesidades particulares.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contacto'}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Contactar con nuestro equipo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
