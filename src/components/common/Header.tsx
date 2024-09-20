import { FC, useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { Calendar } from '../calendar/CalendarMenu'
import { useDateContext } from '../../contexts/date.context'
import { AnimatePresence } from 'framer-motion'
import ArrowUpSvg from '../../assets/svgs/arrow-up.svg'
import ArrowDownSvg from '../../assets/svgs/arrow-down.svg'
import { FiltersMenu } from './FiltersMenu'
import MainLogoPng from '../../assets/main-logo.png'
import ButtonWithIcon from './ButtonWithIcon'
import TwitterSvg from '../../assets/svgs/twitter.svg'
import TelegramSvg from '../../assets/svgs/telegram.svg'
import QuestionSvg from '../../assets/svgs/question.svg'
import SupportSvg from '../../assets/svgs/support.svg'
import { Link } from 'react-router-dom'


interface IProps {
  setIsFilterWindowOpen: () => void
  scrollTop: () => void
  scrollBottom: () => void
}

export const Header: FC<IProps> = ({ setIsFilterWindowOpen, scrollBottom, scrollTop }) => {
  const [isCalendarActive, setIsCalendarActive] = useState(false)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const ref = useRef(null)
  const filtersRef = useRef(null)
  const windowInnerWidth = useRef(window.innerWidth)

  useOnClickOutside(filtersRef, () => setIsDrawerVisible(false))

  const { currentState: { year, monthName } } = useDateContext()

  useOnClickOutside(ref, () => handleCalendarState(false))

  const handleCalendarState = (preferredState?: boolean) => {
    setIsCalendarActive(preferredState ?? !isCalendarActive)
  }
  useEffect(() => {
    const handleResize = () => {
      windowInnerWidth.current = window.innerWidth
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <header className="header-top">
        <div className="header-top__left">
          <img src={MainLogoPng} width={30} height={30} alt="Main logo" />
          <div className="info">
            <ButtonWithIcon backgroundColor='#1d9bf0' title='Twitter' iconPath={TwitterSvg}  href='https://x.com/memecalendarcom'/>
            <ButtonWithIcon backgroundColor='#a7a7af' title='Support' iconPath={SupportSvg} href='https://t.me/meme_calendar_community/3'/>
            <ButtonWithIcon backgroundColor='#24a1de' title='Telegram' iconPath={TelegramSvg} href='https://t.me/meme_calendar_main'/>
            <ButtonWithIcon backgroundColor='#8e8e91' title='How it works' iconPath={QuestionSvg} href='/faq'/>
          </div>
        </div>
        <button className='join-btn'>
          <Link style={{color: '#fff'}} to="https://docs.google.com/forms/d/e/1FAIpQLSfednV_PeTLx1uCYjfPxpZowp9NIXKCXT81Lb2rC8BGu3p_UA/viewform" target='_blank'>Join us</Link>
        </button>
      </header>
      <div className="header" ref={filtersRef}>
        <div className="header-left">
          <span className="header-day">
            {monthName} {year}
          </span>
          <div className='header-controls'>
            <button>
              <span style={{ position: 'relative' }} className="control" onClick={() => windowInnerWidth.current > 1039 ? setIsDrawerVisible(!isDrawerVisible) : setIsFilterWindowOpen()} >Filters
              </span>
            </button>
            <button>
              <img className="icon contol icons8-Up" width="35px" height="35px" onClick={() => scrollTop()} src={ArrowUpSvg} />
            </button>
            <button>
              <img className="icon contol icons8-Down" width="35px" height="35px" onClick={() => scrollBottom()} src={ArrowDownSvg} />
            </button>
            <AnimatePresence>
              {isDrawerVisible && <FiltersMenu handleMenuClosed={() => setIsDrawerVisible(false)}/>}
            </AnimatePresence>
          </div>
        </div>
        <div className="header-right" ref={ref}>
          <span className="header-right__month" onClick={() => handleCalendarState(!isCalendarActive)}>Month</span>
          <AnimatePresence>
            {isCalendarActive && <Calendar />}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
