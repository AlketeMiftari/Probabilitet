import { motion } from 'framer-motion'
import { HeartPulse } from 'lucide-react'

export default function HeroMonitor({ patientA, patientB }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative mx-auto flex min-h-[420px] w-full max-w-[500px] items-center justify-center"
    >
      <div className="absolute inset-x-10 top-16 h-px bg-slate-200/90" />
      <div className="absolute inset-x-14 bottom-20 h-px bg-slate-200/90" />

      <svg
        viewBox="0 0 440 240"
        className="absolute inset-0 z-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 128 H110 L128 128 L146 88 L162 150 L182 60 L200 128 H248 L266 128 L282 108 L300 138 L318 76 L336 128 H420"
          className="ecg-line ecg-line-a"
        />
        <path
          d="M20 164 H90 L110 164 L128 148 L146 178 L168 110 L186 164 H258 L278 164 L296 132 L318 198 L338 92 L356 164 H420"
          className="ecg-line ecg-line-b"
        />
      </svg>

      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full bg-white/75 shadow-glow"
      >
        <div className="absolute inset-0 rounded-full border border-rose/20 pulse-ring" />
        <div className="absolute inset-3 rounded-full border border-sky-200/70" />
        <HeartPulse size={58} className="text-rose" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-2 top-10 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-glow"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Pacienti A</p>
        <p className="mt-1 text-xl font-semibold text-teal">{patientA.average.toFixed(1)} BPM</p>
        <p className="text-sm text-slate-700">variancë e ulët</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute right-2 top-16 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-glow"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Pacienti B</p>
        <p className="mt-1 text-xl font-semibold text-rose">{patientB.average.toFixed(1)} BPM</p>
        <p className="text-sm text-slate-700">variancë e lartë</p>
      </motion.div>

      <motion.div
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-glow"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Mesatarja</p>
        <p className="mt-1 text-lg font-semibold text-slate-950">e ngjashme te të dy</p>
      </motion.div>

      <motion.div
        animate={{ x: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-12 right-10 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-glow"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Dallimi</p>
        <p className="mt-1 text-lg font-semibold text-slate-950">
          {Math.abs(patientB.variance - patientA.variance).toFixed(1)} variancë
        </p>
      </motion.div>
    </motion.div>
  )
}
