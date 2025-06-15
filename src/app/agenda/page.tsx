'use client';

import Calendar from '@/components/ui/Calendar';
import { motion } from 'framer-motion';

export default function AgendaPage() {
  return (
    <div className="min-h-screen py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-12">Agenda de Citas</h1>
        <Calendar />
      </motion.div>
    </div>
  );
}
