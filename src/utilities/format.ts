import { TypeWholeMonth } from '../types/months.type'

export const formatWeek = (week: TypeWholeMonth) => {
  const returningWeekArray = week.slice()

  returningWeekArray[0] = returningWeekArray[0].slice(1)

  return returningWeekArray
}