export function getDayOfWeek(dateString: Date) {
  const date = new Date(dateString)
  const dayOfWeek = date.getDay()
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  return weekdays[dayOfWeek]
}

export function formatTwoDigitNumber(num: number) {
  return num.toString().padStart(2, '0')
}
