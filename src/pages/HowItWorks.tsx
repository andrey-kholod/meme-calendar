import { useState } from 'react'
import CirclePlusSvg from '../assets/svgs/circle-plus.svg'

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState(0)

  const articles = [
    { title: 'Heading', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates enim, incidunt sit placeat nesciunt numquam facilis fuga laborum deleniti suscipit est, quod qui laboriosam molestias, voluptas doloremque dolores iusto nulla impedit nihil voluptate repellat modi sunt? Reiciendis repellat assumenda labore perferendis ex? Exercitationem delectus quia commodi? Dolorem unde nisi voluptas?' },
    { title: 'Heading', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates enim, incidunt sit placeat nesciunt numquam facilis fuga laborum deleniti suscipit est, quod qui laboriosam molestias, voluptas doloremque dolores iusto nulla impedit nihil voluptate repellat modi sunt? Reiciendis repellat assumenda labore perferendis ex? Exercitationem delectus quia commodi? Dolorem unde nisi voluptas?' },
    { title: 'Heading', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates enim, incidunt sit placeat nesciunt numquam facilis fuga laborum deleniti suscipit est, quod qui laboriosam molestias, voluptas doloremque dolores iusto nulla impedit nihil voluptate repellat modi sunt? Reiciendis repellat assumenda labore perferendis ex? Exercitationem delectus quia commodi? Dolorem unde nisi voluptas?' }
  ]

  return (
    <div className='faq-wrapper'>
      <div className="faq">
        <h2 className="faq-heading">How it works</h2>
        {articles.map((t, i) => (
          <div onClick={() => setActiveTab(i)} className="faq-block">
            <div className="faq-block__heading">
              <span>{t.title}</span>
              <img src={CirclePlusSvg} alt="Show button" height="25px" width="25px" />
            </div>
            <div style={{ gridTemplateRows: activeTab === i ? '1fr' : '0fr' }} className="faq-block__text">
              <p>{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default HowItWorks