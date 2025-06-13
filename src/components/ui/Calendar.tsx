'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { useToast } from './ToastProvider';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
  availableSlots?: string[];
}

interface CalendarProps {
  onTimeSelect?: (date: Date, time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

export default function Calendar({ onTimeSelect, selectedDate: externalSelectedDate, selectedTime }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(externalSelectedDate || null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);  const { addToast } = useToast();

  // Sincronizar con props externas
  useEffect(() => {
    if (externalSelectedDate) {
      setSelectedDate(externalSelectedDate);
    }
  }, [externalSelectedDate]);
  // Obtener horarios disponibles desde la API
  const fetchAvailableSlots = useCallback(async (date: Date) => {
    setLoading(true);
    try {
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const response = await fetch(`/api/appointments/available?date=${formattedDate}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableSlots(data.availableSlots);
      } else {
        addToast({ 
          type: 'error', 
          title: 'Error al cargar horarios disponibles' 
        });
        // Usar horarios por defecto en caso de error
        setAvailableSlots(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30']);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      addToast({ 
        type: 'error', 
        title: 'Error de conexión al cargar horarios' 
      });
      // Usar horarios por defecto en caso de error
      setAvailableSlots(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30']);
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Generar horarios con disponibilidad real
  const generateTimeSlots = (availableSlotsList: string[]): TimeSlot[] => {
    const allSlots: TimeSlot[] = [];
    
    // Generar todos los slots posibles (9:00 - 20:00, cada 30 minutos)
    for (let hour = 9; hour < 20; hour++) {
      for (const minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        allSlots.push({
          time: timeString,
          available: availableSlotsList.includes(timeString)
        });
      }
    }
    
    return allSlots;
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
          slots: [], // Los slots se cargarán dinámicamente
          availableSlots: []
        });
      }
    }
    
    return calendar;
  };

  const calendar = generateCalendar();  // Cargar horarios cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, fetchAvailableSlots]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onTimeSelect) {
      // Reset time selection when date changes
      onTimeSelect(date, '');
    }
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate && onTimeSelect) {
      onTimeSelect(selectedDate, time);
    } else if (selectedDate) {
      // Fallback behavior for standalone calendar
      addToast({ 
        type: 'success', 
        title: `Cita seleccionada para el ${selectedDate.toLocaleDateString('es-ES')} a las ${time}` 
      });
    }
  };

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
            {calendar.map((day) => (
              <motion.button
                key={day.date.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg ${
                  selectedDate?.toDateString() === day.date.toDateString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                onClick={() => handleDateSelect(day.date)}
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
          
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <LoadingSpinner />
            </div>
          ) : selectedDate && availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {generateTimeSlots(availableSlots).map((slot) => (
                <motion.button
                  key={slot.time}
                  whileHover={{ scale: slot.available ? 1.05 : 1 }}
                  whileTap={{ scale: slot.available ? 0.95 : 1 }}
                  className={`p-3 rounded-lg transition-colors ${
                    selectedTime === slot.time
                      ? 'bg-blue-600 text-white'
                      : slot.available 
                      ? 'bg-green-500/20 hover:bg-green-500/30 cursor-pointer'
                      : 'bg-red-500/20 cursor-not-allowed opacity-50'
                  }`}
                  disabled={!slot.available}
                  onClick={() => {
                    if (slot.available) {
                      handleTimeSelect(slot.time);
                    }
                  }}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No hay horarios disponibles para este día</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Selecciona un día para ver los horarios disponibles</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
