import { motion } from 'framer-motion'
import { Activity, HeartPulse, Waves } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import MetricPill from './MetricPill'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const point = payload[0].payload
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl">
      <p className="font-semibold text-slate-950">{point.beat}</p>
      <p className="mt-1 text-slate-800">BPM: {point.value}</p>
      <p className="text-slate-700">Mesatarja: {point.average.toFixed(1)}</p>
    </div>
  )
}

export default function PatientCard({ patient, average, variance, series }) {
  const isCalm = patient.tone === 'calm'
  const Icon = isCalm ? Waves : HeartPulse
  const chartDomain = [Math.min(...patient.values) - 10, Math.max(...patient.values) + 10]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="glass-panel rounded-[22px] border border-slate-200 p-6 shadow-glow lg:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="pulse-dot flex h-12 w-12 items-center justify-center rounded-xl border text-slate-950"
              style={{ backgroundColor: `${patient.color}18`, borderColor: `${patient.color}55` }}
            >
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-700">{patient.name}</p>
              <h3 className="text-2xl font-semibold text-slate-950">{patient.label}</h3>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-700">{patient.interpretation}</p>
        </div>

        <div
          className="rounded-md border px-4 py-2 text-sm font-medium"
          style={{
            borderColor: `${patient.accent}35`,
            color: '#244968',
            backgroundColor: `${patient.accent}10`,
          }}
        >
          <span className="inline-flex items-center gap-2">
            <Activity size={16} />
            Profil monitorimi
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <MetricPill
          label="Rrahja mesatare"
          value={`${average.toFixed(1)} BPM`}
          accent={patient.accent}
        />
        <MetricPill label="Varianca" value={variance.toFixed(1)} accent={patient.accent} />
        <MetricPill label="Vlerat BPM" value={patient.values.join(' · ')} accent={patient.accent} />
      </div>

      <div className="mt-6 h-[320px] rounded-[18px] border border-slate-200 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 20, right: 16, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id={`fill-${patient.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={patient.color} stopOpacity={0.22} />
                <stop offset="100%" stopColor={patient.color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(125,148,170,0.2)" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="beat"
              tick={{ fill: '#475569', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={chartDomain}
              tick={{ fill: '#475569', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={54}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={average}
              stroke="#35566f"
              strokeOpacity={0.85}
              strokeDasharray="6 6"
              label={{
                value: `Mes. ${average.toFixed(1)} BPM`,
                fill: '#35566f',
                position: 'insideTopRight',
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="transparent"
              fill={`url(#fill-${patient.id})`}
              animationDuration={1200}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={patient.color}
              strokeWidth={4.5}
              dot={{ r: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: patient.accent }}
              isAnimationActive
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.article>
  )
}
