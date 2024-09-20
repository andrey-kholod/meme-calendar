import { FC } from 'react'

interface IProps {
  iconPath: string
  backgroundColor: string
  title: string
  href: string
}

const ButtonWithIcon: FC<IProps> = ({ iconPath, backgroundColor, title, href }) => {
  return (
    <a href={href}>
      <button className='info-btn' style={{ backgroundColor }}>
        <img src={iconPath} alt="Twitter" />
        <span>{title}</span>
      </button>
    </a>
  )
}
export default ButtonWithIcon