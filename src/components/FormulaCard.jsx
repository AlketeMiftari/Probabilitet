import { Sigma } from 'lucide-react'
import { motion } from 'framer-motion'

const formulas = [
  {
    title: 'Vlera e pritur',
    expression: 'E(X) = Σ xᵢ · pᵢ',
    detail:
      'Vlera e pritur tregon qendrën e shpërndarjes. Ajo na tregon rreth cilës vlerë të dhënat priren të balancohen.',
  },
  {
    title: 'Varianca',
    expression: 'Var(X) = Σ (xᵢ − μ)² · pᵢ',
    detail:
      'Varianca mat përhapjen rreth qendrës. Ngritja në katror e largësisë bën që devijimet e mëdha të dallohen menjëherë.',
  },
]

export default function FormulaCard() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {formulas.map((formula, index) => (
        <motion.div
          key={formula.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="glass-panel rounded-[28px] border border-slate-200 p-6 shadow-glow"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3 text-sky-600">
              <Sigma size={22} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-700">{formula.title}</p>
              <h3 className="text-xl font-semibold text-slate-950">{formula.expression}</h3>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-700">{formula.detail}</p>
        </motion.div>
      ))}
    </div>
  )
}
