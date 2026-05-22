export default function MetricPill({ label, value, accent }) {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm"
      style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1px ${accent}12` }}
    >
      <p className="text-xs uppercase tracking-[0.22em] text-slate-700">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  )
}
