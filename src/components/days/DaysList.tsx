import { motion } from 'framer-motion'
import { useDateContext } from '../../contexts/date.context'
import { Day } from './Day'

export const DaysList = () => {
  const { monthsArray } = useDateContext()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.02,
          },
        },
      }}
      className="calendar__bottom-bar">
      {monthsArray.map(week => (
        week.map((day, i) => (
          <Day key={i} day={day} />
        ))
      ))}
    </motion.div>
  )
}