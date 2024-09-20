import { DaysList } from '../days/DaysList'

export const CalendarSection = () => {
  return (
    <section className="calendar__days">
        <div className="calendar__top-bar">
          <span className="top-bar__days">Mon</span>
          <span className="top-bar__days">Tue</span>
          <span className="top-bar__days">Wed</span>
          <span className="top-bar__days">Thu</span>
          <span className="top-bar__days">Fri</span>
          <span className="top-bar__days">Sat</span>
          <span className="top-bar__days">Sun</span>
        </div>
        <DaysList />
      </section>
  )
}