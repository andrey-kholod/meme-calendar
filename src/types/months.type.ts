export type TypeMonths = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'

export type TypeHandleYear = (count: number, option: {
  type: "decrement" | "increment" | "ownVersion"
}) => void

export interface IDate {
  dayNumber: number
  dayName: string
  monthIndex: number
  monthName: TypeMonths
  year: number
}

export type TypeWeek = IDate[]

export type TypeWholeMonth = TypeWeek[]
