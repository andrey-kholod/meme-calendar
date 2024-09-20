import { useDateContext } from '../../contexts/date.context'
import { forwardRef } from 'react'
import { findAppropriateTasks } from '../../utilities/definitionOfTime'
import DoubleCheckMark from '../../assets/svgs/double-checkmark.svg'
import { Link } from 'react-router-dom'
import TwitterSvg from '../../assets/svgs/twitter.svg'
import TelegramSvg from '../../assets/svgs/telegram.svg'
import WebsiteSvg from '../../assets/svgs/website.svg'

export const TasksList = forwardRef<HTMLUListElement>((_, tasksRef) => {
  const { filteredTasks, tasksForDay } = useDateContext()
  const { currentState } = useDateContext()
  const appropriateTasks = findAppropriateTasks(filteredTasks, currentState)

  console.log(filteredTasks, 'tasks-filtered')
  console.log(tasksForDay, 'tasks')


  return (
    <aside className="calendar__sidebar" >
      <li className='sidebar__list-item sidebar__list-first' >
        <span>#</span>
        <span>Name</span>
        <span style={{ justifySelf: 'center' }}>Links</span>
        <span>Checked</span>
        <span style={{ justifySelf: 'center' }}>Detail</span>
      </li>
      <ul ref={tasksRef} className="sidebar__list" style={{ gridTemplateRows: `repeat(${appropriateTasks.length}, 3.3rem)` }}>
        {appropriateTasks.length ? appropriateTasks.map((task, i) =>
          <li key={task.id} className='sidebar__list-item' >
            <span>{i + 1}</span>
            <span>{task.title.rendered}</span>
            <div style={{ justifySelf: 'center' }} className="logos">
              <a href={task.acf.link_to_twitter} style={{backgroundColor: '#1d9bf0'}} className="mini-logo__wrapper">
                <img width="15px" height="15px" className='mini-logo' src={TwitterSvg} alt="Twitter Logo" />
              </a>
              <a href={task.acf.link_to_telegram} style={{backgroundColor: '#24a1de'}} className="mini-logo__wrapper">
                <img className='mini-logo' src={TelegramSvg} alt="Telegram logo" />
              </a>
              <a href={task.acf.link_to_website} style={{backgroundColor: '#21c8ee'}} className="mini-logo__wrapper">
                <img className='mini-logo' src={WebsiteSvg} alt="Website logo" />
              </a>
            </div>
            <img src={DoubleCheckMark} alt="" />
            <Link to={`/tasks/${task.id}`} style={{ color: '#0000a9', cursor: 'pointer', justifySelf: 'center' }}>More</Link>
          </li>) : ''}
      </ul>
    </aside>
  )
})