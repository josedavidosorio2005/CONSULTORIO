'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

export default function Home() {
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
        staggerChildren: 0.3,
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
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="container mx-auto px-4 py-16 sm:py-24"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-center mb-8"
          >
            Bienvenido a FisioSalut
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-center mb-12 max-w-2xl mx-auto"
          >
            Tu centro de fisioterapia de confianza, donde la salud y el bienestar son nuestra prioridad.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl text-center"
            >
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Experiencia</h3>
              <p>Más de 10 años cuidando de tu salud</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl text-center"
            >
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold mb-2">Profesionalidad</h3>
              <p>Equipo altamente cualificado</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl text-center"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Atención Personalizada</h3>
              <p>Tratamientos adaptados a tus necesidades</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-xl max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Nuestro Horario</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-white/20 rounded-lg">
                <p className="font-semibold">Apertura</p>
                <p className="text-2xl">9:00</p>
              </div>
              <div className="p-4 bg-white/20 rounded-lg">
                <p className="font-semibold">Cierre</p>
                <p className="text-2xl">20:00</p>
              </div>
            </div>
            <p className="mt-4 text-center text-sm">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
              onClick={() => window.location.href = '/cita'}
            >
              Reserva tu Cita Ahora
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <WhatsAppFloatingButton phoneNumber="+34600000000" />
    </div>
  );
}