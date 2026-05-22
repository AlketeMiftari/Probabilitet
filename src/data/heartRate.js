export const basePatients = [
  {
    id: 'patient-a',
    name: 'Pacienti A',
    label: 'Rrahje të Qëndrueshme të Zemrës',
    tone: 'calm',
    color: '#0F766E',
    accent: '#0B5CAD',
    values: [79, 80, 81, 80, 80, 79, 81, 80],
    interpretation:
      'Matjet qëndrojnë shumë afër mesatares, prandaj vlera e pritur dhe modeli real përputhen: ky pacient duket i qetë dhe i qëndrueshëm.',
  },
  {
    id: 'patient-b',
    name: 'Pacienti B',
    label: 'Rrahje të Paqëndrueshme / nën Stres',
    tone: 'volatile',
    color: '#B4234D',
    accent: '#8E1F43',
    values: [55, 105, 70, 100, 60, 110, 75, 95],
    interpretation:
      'Vetëm mesatarja i fsheh luhatjet dramatike. Varianca e zbulon paqëndrueshmërinë duke matur sa larg shpërndahen rrahjet nga qendra.',
  },
]

export function computeAverage(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function computeVariance(values) {
  const mean = computeAverage(values)
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length
}

export function buildSeries(values) {
  const average = computeAverage(values)
  return values.map((value, index) => ({
    beat: `Rrahja ${index + 1}`,
    value,
    average,
  }))
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function randomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

export function simulateHeartbeats(tone) {
  if (tone === 'calm') {
    let current = randomInt(78, 82)
    return Array.from({ length: 8 }, () => {
      current = clamp(current + randomInt(-2, 2), 76, 84)
      return current
    })
  }

  let current = randomInt(72, 92)
  return Array.from({ length: 8 }, (_, index) => {
    const dramaticShift = index % 2 === 0 ? randomInt(-30, -10) : randomInt(18, 35)
    current = clamp(current + dramaticShift + randomInt(-8, 8), 52, 118)
    return current
  })
}
