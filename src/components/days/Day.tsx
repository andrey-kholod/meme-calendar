import { FC } from 'react'
import { IDate } from '../../types/months.type'
import { motion } from 'framer-motion'
import { useDateContext } from '../../contexts/date.context'
import { findAppropriateTasks } from '../../utilities/definitionOfTime'

interface IProps {
  day: IDate
}

export const Day: FC<IProps> = ({ day }) => {
  const { currentState, setFullCurrentState, tasksForDay } = useDateContext()
  const foundTasks = findAppropriateTasks(tasksForDay, day)
  
  const handleDayClick = () => {
    try {
      setFullCurrentState(day)
    } catch(e) {
      console.error(0)
    }
  }

  return (
    <motion.div
      onClick={() => handleDayClick()}
      variants={{
        hidden: { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: .1 }}
      className={`calendar__day ${currentState.monthName !== day.monthName ? 'inactive' : ''}${currentState.dayNumber === day.dayNumber && currentState.monthName === day.monthName ? 'today' : ''}`}>
      <span className="calendar__date">{day.dayNumber}</span>
      <span className="calendar__task">{foundTasks.length}</span>
    </motion.div>
  )
}
