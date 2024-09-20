import MainLogoPng from '../assets/main-logo.png'
import TwitterSvg from '../assets/svgs/twitter.svg'
import TelegramSvg from '../assets/svgs/telegram.svg'
import WebsiteSvg from '../assets/svgs/website.svg'
import { useParams } from 'react-router-dom'
import { useDateContext } from '../contexts/date.context'

const ProjectDetails = () => {
  const { id } = useParams()
  const { tasksForDay } = useDateContext()
  const foundTask = tasksForDay.find(t => t.id === Number(id))


  return (
    <div className="wrapper">

      {foundTask ? (
        <>
          <div className="about">
            <img className='about-logo' src={MainLogoPng} alt="" />
            <div className="links">
              <div className="links-block">
                <div className="links-logo twitter">
                  <img className='links-svg' src={TwitterSvg} alt="Twitter logo" />
                </div>
                <a href={foundTask.acf.link_to_twitter} target='_blank' className='links-title'>{foundTask.acf.link_to_twitter}</a>
              </div>
              <div className="links-block">
                <div className="links-logo telegram">
                  <img className='links-svg' src={TelegramSvg} alt="Telegram logo" />
                </div>
                <a href={foundTask.acf.link_to_telegram} target="_blank" className='links-title'>{foundTask.acf.link_to_telegram}</a>
              </div>
              <div className="links-block">
                <div className="links-logo website">
                  <img className='links-svg' src={WebsiteSvg} alt="Website logo" />
                </div>
                <a href={foundTask.acf.link_to_website} target="_blank" className='links-title'>{foundTask.acf.link_to_website}</a>
              </div>
            </div>
          </div>
          <div className="text">{foundTask.acf.text_content}</div></>) : <p>Error 404</p>}
    </div>
  )
}
export default ProjectDetails