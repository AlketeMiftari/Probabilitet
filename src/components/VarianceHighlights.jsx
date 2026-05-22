import { Activity, Radar, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const points = [
  {
    icon: Activity,
    title: 'Mesatare e ngjashme, sjellje ndryshe',
    text: 'Dy pacientë mund të kenë BPM mesatar pothuajse të njëjtë, por njëri të jetë i qetë ndërsa tjetri luhatet fort.',
  },
  {
    icon: ShieldCheck,
    title: 'Variancë e ulët = stabilitet',
    text: 'Kur matjet qëndrojnë afër mesatares, të dhënat duken më të qëndrueshme, më të kontrolluara dhe më të parashikueshme.',
  },
  {
    icon: Radar,
    title: 'Variancë e lartë = përhapje',
    text: 'Kur devijimet janë të mëdha, varianca e bën të dukshme paqëndrueshmërinë që mesatarja e vetme nuk e tregon.',
  },
]

export default function VarianceHighlights() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {points.map((point, index) => {
        const Icon = point.icon

        return (
          <motion.article
            key={point.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="glass-panel rounded-[28px] border border-slate-200 p-6 shadow-glow"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
              <Icon size={24} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-950">{point.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{point.text}</p>
          </motion.article>
        )
      })}
    </div>
  )
}
