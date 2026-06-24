// Format helpers used across the app.

export function formatUZS(value) {
  if (typeof value !== 'number' || isNaN(value)) return '0'
  return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + " so'm"
}

export function classNames(...args) {
  return args.filter(Boolean).join(' ')
}