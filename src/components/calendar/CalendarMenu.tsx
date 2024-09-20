import ArrowLeft from '../../assets/svgs/arrow-left.svg'
import ArrowRight from '../../assets/svgs/arrow-right.svg'
import { ARRAY_OF_MONTHS } from '../../constants/date.data'
import { useDateContext } from '../../contexts/date.context'
import { motion } from 'framer-motion'
import { IDate } from '../../types/months.type'
import { formatWeek } from '../../utilities/format'
import { getDaysInMonth } from '../../utilities/definitionOfTime'

export const Calendar = () => {
  const { currentState: { year, monthName, dayNumber }, setYear, setMonthIndex, setFullCurrentState } = useDateContext()


  const handleClickMonth = (monthIndex: number) => {
    setMonthIndex(monthIndex)

    const monthsArray = formatWeek(getDaysInMonth(new Date(year, monthIndex, dayNumber)))

    let date: IDate = {} as IDate
    monthsArray.forEach(week => week.forEach(d => {
      if (d.year === year && d.monthIndex === monthIndex && d.dayNumber === dayNumber) {
        date = d
      }
    }))
    setFullCurrentState(date)
  }

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 10 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: .3 }}
      className="month-menu">
      <div className="month-menu__header"
      >
        <img src={ArrowLeft} alt="Arrow left" onClick={() => setYear(year - 1)} />
        <div className="month-menu__year">
          <span>{monthName}</span>
          <span>{year}</span>
        </div>
        <img src={ArrowRight} alt="Arrow right" onClick={() => setYear(year + 1)} />
      </div>
      <div className="month-list">
        {
          ARRAY_OF_MONTHS.map((m, i) => (<div key={i} onClick={() => handleClickMonth(i)} className={`month-list__item ${monthName === m && 'active-month'}`}>{ARRAY_OF_MONTHS[i]}</div>))
        }
      </div>
    </motion.div>
  )
}
