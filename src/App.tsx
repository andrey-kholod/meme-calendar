import { Main } from './components/common/Main'
import { Header } from './components/common/Header'
import { useRef, useState } from 'react'
import { Footer } from './components/common/Footer'
import FilterWindow from './components/common/FilterWindow'
import { AnimatePresence } from 'framer-motion'

function App() {
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false)
  const tasksRef = useRef<HTMLUListElement>(null)

  const scrollTop = () => {
    if (tasksRef.current) {
      tasksRef.current.scrollBy({ top: -100, behavior: 'smooth' })
    }
  }

  const scrollBottom = () => {
    if (tasksRef.current) {
      tasksRef.current.scrollBy({ top: 100, behavior: 'smooth' })
    }
  }


  return (
    <>
      <AnimatePresence>
        {isFilterWindowOpen &&
          <FilterWindow setIsFilterWindowOpen={() => setIsFilterWindowOpen(false)} />
        }
      </AnimatePresence>
      <Header scrollTop={scrollTop} scrollBottom={scrollBottom} setIsFilterWindowOpen={() => setIsFilterWindowOpen(true)} />
      <Main ref={tasksRef} />
      <Footer />
    </>
  )
}

export default App
