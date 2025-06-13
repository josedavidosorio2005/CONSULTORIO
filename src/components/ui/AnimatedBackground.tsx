'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Stat {
  id: number;
  label: string;
  value: string;
  trend: 'up' | 'down';
}

const initialStats: Stat[] = [
  { id: 1, label: 'Pacientes Atendidos', value: '2,845', trend: 'up' },
  { id: 2, label: 'Satisfacción', value: '98%', trend: 'up' },
  { id: 3, label: 'Tiempo de Espera', value: '5 min', trend: 'down' },
  { id: 4, label: 'Recuperaciones Exitosas', value: '94%', trend: 'up' },
];

export default function AnimatedBackground() {
  const [stats, setStats] = useState(initialStats);

  // Actualizar estadísticas cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(currentStats =>
        currentStats.map(stat => ({
          ...stat,
          value: stat.label === 'Tiempo de Espera'
            ? `${Math.floor(Math.random() * 10 + 2)} min`
            : stat.label === 'Satisfacción'
              ? `${Math.floor(Math.random() * 3 + 96)}%`
              : stat.label === 'Pacientes Atendidos'
                ? `${Math.floor(Math.random() * 1000 + 2000)}`
                : `${Math.floor(Math.random() * 5 + 92)}%`
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300" />
      
      {/* Patrones de fondo */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#b3e0ff,transparent)]" />
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Estadísticas flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              y: [0, -20, 0],
              x: Math.sin(index * Math.PI/2) * 20
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              delay: index * 2,
              ease: "easeInOut"
            }}
            className="absolute text-sm font-medium text-gray-600 dark:text-gray-400 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
            style={{
              left: `${15 + (index * 25)}%`,
              top: `${20 + (index * 15)}%`
            }}
          >
            <div className="flex items-center gap-2">
              <span>{stat.label}</span>
              <span className={`font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.value}
              </span>
              {stat.trend === 'up' ? (
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
