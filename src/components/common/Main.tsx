import { TasksList } from '../tasks/TasksList'
import { CalendarSection } from '../calendar/CalendarSection'
import { forwardRef } from 'react'

export const Main = forwardRef<HTMLUListElement>((_, tasksRef) => {
  return (
    <main className="calendar-contain">
      <TasksList ref={tasksRef} />
      <CalendarSection />
    </main>
  )
})


