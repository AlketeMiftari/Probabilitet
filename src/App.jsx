import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, RefreshCcw } from 'lucide-react'
import PatientCard from './components/PatientCard'
import FormulaCard from './components/FormulaCard'
import SectionTitle from './components/SectionTitle'
import VarianceHighlights from './components/VarianceHighlights'
import HeroMonitor from './components/HeroMonitor'
import {
  basePatients,
  buildSeries,
  computeAverage,
  computeVariance,
  simulateHeartbeats,
} from './data/heartRate'

function enrichPatient(patient) {
  const average = computeAverage(patient.values)
  const variance = computeVariance(patient.values)

  return {
    ...patient,
    average,
    variance,
    series: buildSeries(patient.values),
  }
}

export default function App() {
  const [patients, setPatients] = useState(basePatients.map(enrichPatient))

  function handleSimulate() {
    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        enrichPatient({
          ...patient,
          values: simulateHeartbeats(patient.tone),
        }),
      ),
    )
  }

  return (
    <main className="relative overflow-hidden px-5 pb-16 pt-6 text-slate-950 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-visible px-2 py-6 md:px-4 md:py-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-[24px] border border-slate-200 bg-white/90 p-8 shadow-glow md:p-10"
            >
              <div className="inline-flex items-center gap-2 rounded-md border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800">
                <Activity size={16} />
                Variabiliteti i rrahjeve të zemrës në probabilitet
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
                Varianca:
                <span className="block text-sky-800">çfarë nuk mund të na tregojë mesatarja</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Dy pacientë mund të kenë pothuajse të njëjtën rrahje mesatare të zemrës, por të
                tregojnë histori krejtësisht të ndryshme. Kjo demo e bën të dukshme dallimin
                midis qendrës së të dhënave dhe përhapjes së tyre.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleSimulate}
                  className="inline-flex items-center gap-3 rounded-md border border-sky-800 bg-sky-800 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sky-900"
                >
                  <RefreshCcw size={16} />
                  Simulo rrahje të reja
                </button>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-3 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
                >
                  Shiko krahasimin
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>

            <div className="relative lg:-ml-6">
              <HeroMonitor patientA={patients[0]} patientB={patients[1]} />
            </div>
          </div>
        </section>

        <section id="comparison" className="mt-12">
          <SectionTitle
            eyebrow="Paneli i krahasimit"
            title="Dy pacientë me mesatare të ngjashme, por sjellje krejt të ndryshme"
            description="Vëre si vija e ndërprerë e mesatares mbetet e ngjashme, ndërsa grafiku i rrahjeve tregon stabilitet te njëri pacient dhe luhatje të mëdha te tjetri."
          />

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                average={patient.average}
                variance={patient.variance}
                series={patient.series}
              />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionTitle
            eyebrow="Pse ka rëndësi varianca?"
            title="Mesatarja e vetme nuk mjafton"
            description="Nëse shohim vetëm mesataren, të dy pacientët mund të duken të ngjashëm. Varianca zbulon nëse rrahjet qëndrojnë afër qendrës apo shpërndahen në mënyrë të paqëndrueshme."
          />
          <div className="mt-10">
            <VarianceHighlights />
          </div>
        </section>

        <section className="mt-16">
          <SectionTitle
            eyebrow="Formulat"
            title="Matematika pas monitorimit"
            description="Vlera e pritur llogarit qendrën e peshuar. Varianca mat largësinë e vlerave nga ajo qendër."
          />
          <div className="mt-10">
            <FormulaCard />
          </div>
        </section>

        <section className="mt-16">
          <div className="rounded-[20px] border border-slate-200 bg-white p-8 shadow-glow">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Simulim interaktiv</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
                  Gjenero rrahje të reja dhe shiko si ndryshojnë statistikat
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
                  Çdo klikim krijon një model të ri të qëndrueshëm për Pacientin A dhe një model
                  më të paqëndrueshëm për Pacientin B. Kjo e bën menjëherë të dukshme dallimin
                  midis qendrës dhe përhapjes.
                </p>
              </div>
              <div className="flex flex-col gap-4 rounded-[16px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between rounded-[12px] border border-slate-200 bg-white px-4 py-4">
                  <span className="text-slate-700">Mesatarja e Pacientit A</span>
                  <span className="text-lg font-semibold text-teal">{patients[0].average.toFixed(1)} BPM</span>
                </div>
                <div className="flex items-center justify-between rounded-[12px] border border-slate-200 bg-white px-4 py-4">
                  <span className="text-slate-700">Mesatarja e Pacientit B</span>
                  <span className="text-lg font-semibold text-rose">{patients[1].average.toFixed(1)} BPM</span>
                </div>
                <div className="flex items-center justify-between rounded-[12px] border border-slate-200 bg-white px-4 py-4">
                  <span className="text-slate-700">Dallimi i variancës</span>
                  <span className="text-lg font-semibold text-slate-950">
                    {(patients[1].variance - patients[0].variance).toFixed(1)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSimulate}
                  className="mt-2 inline-flex items-center justify-center gap-3 rounded-md bg-sky-800 px-5 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sky-900"
                >
                  <RefreshCcw size={18} />
                  Simulo rrahje të reja
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
