'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Generar horarios disponibles de ejemplo (esto se conectaría con una base de datos real)
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour < 20; hour++) {
      for (let minute of [0, 30]) {
        // Simular disponibilidad aleatoria
        const available = Math.random() > 0.3;
        slots.push({
          time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          available
        });
      }
    }
    return slots;
  };

  // Generar calendario para el mes actual
  const generateCalendar = (): DaySchedule[] => {
    const today = new Date();
    const calendar: DaySchedule[] = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // No generar horarios para domingos
      if (date.getDay() !== 0) {
        calendar.push({
          date: new Date(date),
          slots: generateTimeSlots(date)
        });
      }
    }
    
    return calendar;
  };

  const calendar = generateCalendar();

  const [selectedSlots, setSelectedSlots] = useState<DaySchedule | null>(null);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Calendario de Citas Disponibles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendario */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl"
        >
          <h3 className="text-xl font-semibold mb-4">Selecciona un Día</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
              <div key={day} className="text-center font-medium p-2">
                {day}
              </div>
            ))}
            {calendar.map((day, index) => (
              <motion.button
                key={day.date.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg ${
                  selectedDate?.toDateString() === day.date.toDateString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                onClick={() => {
                  setSelectedDate(day.date);
                  setSelectedSlots(day);
                }}
              >
                {day.date.getDate()}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Horarios Disponibles */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl"
        >
          <h3 className="text-xl font-semibold mb-4">
            {selectedDate 
              ? `Horarios para el ${selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric',
                  month: 'long' 
                })}` 
              : 'Selecciona un día para ver los horarios disponibles'}
          </h3>
          
          {selectedSlots && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {selectedSlots.slots.map((slot, index) => (
                <motion.button
                  key={slot.time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg ${
                    slot.available 
                      ? 'bg-green-500/20 hover:bg-green-500/30 cursor-pointer'
                      : 'bg-red-500/20 cursor-not-allowed opacity-50'
                  }`}
                  disabled={!slot.available}
                  onClick={() => {
                    if (slot.available) {
                      // Aquí iría la lógica para reservar la cita
                      alert(`Cita seleccionada para el ${selectedDate.toLocaleDateString()} a las ${slot.time}`);
                    }
                  }}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
