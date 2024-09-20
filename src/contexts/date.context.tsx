import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { ARRAY_OF_MONTHS, DAYS_OF_WEEK } from '../constants/date.data'
import { IDate, TypeMonths, TypeWeek } from '../types/months.type'
import { formatWeek } from '../utilities/format'
import { findAppropriateTasks, getDaysInMonth } from '../utilities/definitionOfTime'
import { IWordpressOutputTask } from '../types/db.types'
import axios from 'axios'


interface IDateContext {
  currentState: IDate
  setFullCurrentState: (newCurrentState: IDate) => void
  setYear: (year: number) => void
  setDayNumber: (dayNumber: number) => void
  setDayName: (dayName: string) => void
  setMonthIndex: (monthIndex: number) => void
  setMonthName: (monthName: TypeMonths) => void
  monthsArray: TypeWeek[]
  tasksForDay: IWordpressOutputTask[]
  setAppropriateTasksForDay: (currentState: IDate) => void
  setAllTasksForDay: (responseTasks: IWordpressOutputTask[]) => void
  filters: string[]
  handleFilters: (filters: string[]) => void
  filteredTasks: IWordpressOutputTask[]
  handleFilteredTasks: (tasks: IWordpressOutputTask[]) => void
}

const DateContext = createContext<IDateContext>({} as IDateContext)

export const useDateContext = () => {
  return useContext(DateContext)
}

export const DateContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentState, setCurrentState] = useState<IDate>({ dayNumber: new Date().getDate(), dayName: DAYS_OF_WEEK[new Date().getDay()], monthIndex: new Date().getMonth(), monthName: ARRAY_OF_MONTHS[new Date().getMonth()], year: new Date().getFullYear() })
  const [tasksForDay, setTasksForDay] = useState<IWordpressOutputTask[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [filteredTasks, setFilteredTasks] = useState(tasksForDay)

  let today = new Date(currentState.year, currentState.monthIndex, currentState.dayNumber)

  if (today.toString() === 'Invalid Date') {
    setCurrentState({ dayNumber: new Date().getDate(), dayName: DAYS_OF_WEEK[new Date().getDay()], monthIndex: new Date().getMonth(), monthName: ARRAY_OF_MONTHS[new Date().getMonth()], year: new Date().getFullYear() })
  }

  const monthsArray = formatWeek(getDaysInMonth(today))


  const setYear = (year: number) => {
    setCurrentState(prev => ({ ...prev, year }))
  }

  const setDayNumber = (dayNumber: number) => {
    setCurrentState(prev => ({ ...prev, dayNumber }))
  }

  const setDayName = (dayName: string) => {
    setCurrentState(prev => ({ ...prev, dayName }))
  }

  const setMonthIndex = (monthIndex: number) => {
    setCurrentState(prev => ({ ...prev, monthIndex }))
  }

  const setMonthName = (monthName: TypeMonths) => {
    setCurrentState(prev => ({ ...prev, monthName }))
  }

  const setFullCurrentState = (newCurrentState: IDate) => {
    setCurrentState(newCurrentState)
  }

  const setAppropriateTasksForDay = (currentState: IDate) => {
    setTasksForDay(findAppropriateTasks(tasksForDay, currentState))
  }

  const setAllTasksForDay = (responseTasks: IWordpressOutputTask[]) => {
    setTasksForDay(responseTasks)
  }

  const handleFilters = (filters: string[]) => {
    setFilters(filters)
  }



  const fetchTasks = async () => {
    const res = axios.get<IWordpressOutputTask[]>(`${import.meta.env.VITE_WP_API_URL}/tasks?_fields=author,acf,title,id`)
    const data = (await res).data
    setAllTasksForDay(data)
  }

  const handleFilteredTasks = (tasks: IWordpressOutputTask[]) => {
    setFilteredTasks(tasks)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    setFilteredTasks(tasksForDay)
  }, [tasksForDay])

  return (
    <DateContext.Provider value={{ currentState, setYear, setDayNumber, setDayName, setMonthIndex, setMonthName, monthsArray, setFullCurrentState, tasksForDay, setAppropriateTasksForDay, setAllTasksForDay, filters, handleFilters, filteredTasks, handleFilteredTasks }}>
      {children}
    </DateContext.Provider>
  )
}