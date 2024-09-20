import { motion } from 'framer-motion'
import CrossSvg from '../../assets/svgs/cross.svg'
import { ChangeEvent, FC, useEffect, useRef } from 'react'
import { useDateContext } from '../../contexts/date.context'
import { IWordpressOutputTask } from '../../types/db.types'
import { arrayOfFilters } from '../../constants/filters.data'

interface IProps {
  setIsFilterWindowOpen: () => void
}


const FilterWindow: FC<IProps> = ({ setIsFilterWindowOpen }) => {
  const { filters, handleFilters: handleFiltersContext,  tasksForDay, handleFilteredTasks } = useDateContext()
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (btnRef.current) {
      if (!filters.length) {
        btnRef.current.disabled = true
      } else {
        btnRef.current.disabled = false
      }
    }
    console.log(btnRef.current?.disabled)
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
    if (filters.length > 2) {
      filters.forEach(fil => {
        const temp = tasksForDay.filter(t => t.acf.cryptocurrency === fil)
        filtered = [...filtered, ...temp]
      })
    } else {
      filtered = tasksForDay.filter(t => t.acf.cryptocurrency === filters[0])
    }
    
    console.log(filters, 'FILTERS')
    handleFilteredTasks(filtered)
    setIsFilterWindowOpen()
  }

  return (
    <>
      <motion.div
        transition={{ duration: 0.5 }}
        initial={{ bottom: '-100%' }}
        animate={{ bottom: 0 }}
        exit={{ bottom: '-100%' }}
        className='filter-window'
      >
        <div className="filter-header">
          <span> </span>
          <h3>Filters</h3>
          <img
            style={{ cursor: 'pointer' }}
            width="25px"
            height="25px"
            src={CrossSvg}
            alt=""
            onClick={() => setIsFilterWindowOpen()}
          />
        </div>
        <div className="filter-inner">
          <div className="filter-list">
            {arrayOfFilters.map((fil, i) => (
              <label key={i} className="filter-list__item">
                <p>{fil}</p>
                <input type="checkbox" checked={filters.includes(fil)} onChange={handleFilter} name={fil} />
              </label>
            ))}
          </div>
          <div className="filter-submit">
            <div className='filter-selected'>Selected filters: {filters.length}/20</div>
            <button ref={btnRef} onClick={setFilters} className='filter-button'>Apply</button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default FilterWindow
