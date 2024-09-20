export interface IWordpressOutputTask {
  id: number
  title: {
    rendered: string
  },
  author: number
  acf: {
    "date": string
    "cryptocurrency": string
    "link_to_twitter": string
    "link_to_telegram": string
    "link_to_website": string
    "text_content": string
  }
}