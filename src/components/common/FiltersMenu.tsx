import { motion } from 'framer-motion'
import { ChangeEvent, FC, useEffect, useRef } from 'react'
import { useDateContext } from '../../contexts/date.context'
import { IWordpressOutputTask } from '../../types/db.types'
import { arrayOfFilters } from '../../constants/filters.data'

interface IProps {
  handleMenuClosed: () => void
}

export const FiltersMenu: FC<IProps> = ({ handleMenuClosed }) => {
  const { filters, handleFilters: handleFiltersContext, tasksForDay, handleFilteredTasks } = useDateContext()
  const btnRef = useRef<HTMLButtonElement>(null)

  console.log(filters, 'FILTERS')

  useEffect(() => {
    if (btnRef.current) {
      if (!filters.length) {
        btnRef.current.disabled = true
      } else {
        btnRef.current.disabled = false
      }
    }
  }, [filters])

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const filterName = e.target.name

    if (filters.includes(filterName)) {
      const newFilters = filters.filter(f => f !== filterName)
      handleFiltersContext(newFilters)
    } else {
      handleFiltersContext([...filters, filterName])
    }
  }

  const setFilters = () => {
    let filtered: IWordpressOutputTask[] = []
    if (filters.length >= 2) {
      filters.forEach(fil => {
        console.log(fil)
        const temp = tasksForDay.filter(t => t.acf.cryptocurrency === fil)
        filtered = [...filtered, ...temp]
        console.log(filtered)
      })
    } else {
      console.log(filters.length)
      filtered = tasksForDay.filter(t => t.acf.cryptocurrency === filters[0])
    }

    
    handleFilteredTasks(filtered)
    handleMenuClosed()
  }


  return (
    <motion.div
      className='filters'
      transition={{ duration: .3 }}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 0 }}
      variants={{
        hidden: { opacity: 0, y: 0 },
        visible: {
          opacity: 1,
          y: 10
        },
      }}
    >
      <div className="filters-header">Filters</div>
      <div className="filters-inner">
        <div className="filters-list">
          {arrayOfFilters.map((fil, i) => (
            <label key={i} className="filters-list__item">
              <p>{fil}</p>
              <input type="checkbox" checked={filters.includes(fil)} onChange={handleFilter} name={fil} />
            </label>
          ))}
        </div>
        <div className='filters-selected'>
          <div>Selected filters: {filters.length}/20</div>
          <div
          style={{cursor: 'pointer'}}
           onClick={() => {
            handleFilteredTasks(tasksForDay)
            handleMenuClosed()
          }}>Reset</div>
        </div>
        <button onClick={setFilters} ref={btnRef} className='filters-button'>Apply</button>
      </div>
    </motion.div>
  )
}
