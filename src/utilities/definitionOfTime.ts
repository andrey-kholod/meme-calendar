import { IWordpressOutputTask } from '../types/db.types'
import { IDate, TypeWholeMonth } from '../types/months.type'

export function getDaysInMonth(date: Date) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const firstWeekday = firstDayOfMonth.getDay()

  const daysInCurrentMonth = lastDayOfMonth.getDate()

  const days = []

  for (let i = firstWeekday - 1; i >= 0; i--) {
    const day = new Date(year, month, -i)
    days.push({
      dayNumber: day.getDate(),
      dayName: day.toLocaleString('en-US', { weekday: 'long' }),
      monthIndex: day.getMonth(),
      monthName: monthNames[day.getMonth()],
      year: day.getFullYear() 
    })
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const day = new Date(year, month, i)
    days.push({
      dayNumber: day.getDate(),
      dayName: day.toLocaleString('en-US', { weekday: 'long' }),
      monthIndex: day.getMonth(),
      monthName: monthNames[day.getMonth()],
      year // Изменения здесь
    })
  }

  let i = 1
  while (days.length < 36) {
    const day = new Date(year, month + 1, i)
    days.push({
      dayNumber: day.getDate(),
      dayName: day.toLocaleString('en-US', { weekday: 'long' }),
      monthIndex: day.getMonth(),
      monthName: monthNames[day.getMonth()],
      year: day.getFullYear() 
    })
    i++
  }
  const weeks = []

  if (firstWeekday === 0) {
    const lastWeekFromPreviousMonth = []
    for (let i = -6; i <= 0; i++) {
      const day = new Date(year, month, i)
      lastWeekFromPreviousMonth.push({
        dayNumber: day.getDate(),
        dayName: day.toLocaleString('en-US', { weekday: 'long' }),
        monthIndex: day.getMonth(),
        monthName: monthNames[day.getMonth()],
        year: day.getFullYear() 
      })
    }
    weeks.push(lastWeekFromPreviousMonth)
  }

  if (firstWeekday === 6 && lastDayOfMonth.getDate() === 31) {
    while (days.length < 43) {
      const day: Date = new Date(year, month + 1, i)
      days.push({
        dayNumber: day.getDate(),
        dayName: day.toLocaleString('en-US', { weekday: 'long' }),
        monthIndex: day.getMonth(),
        monthName: monthNames[day.getMonth()],
        year: day.getFullYear()
      })
      i++
    }
  }

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks as TypeWholeMonth
}


export const findAppropriateTasks = (tasks: IWordpressOutputTask[], currentState: IDate) => {
  const { dayNumber, monthIndex, year } = currentState
  const foundTasks = tasks.filter(t => {
    const formattedDate = `${year}${(monthIndex + 1).toString().padStart(2, '0')}${dayNumber.toString().padStart(2, '0')}`;
    
    if (t.acf.date === formattedDate) {
      return true;
    }
    return false;
  });
  
  return foundTasks;
}
