import { createServer } from 'http'
import axios from 'axios'
import { load } from 'cheerio'

const url = 'https://www.gov.br/pt-br/noticias'

export async function getData(execution = 1, skipAmmount = 0) {
  try {
    const response = await axios.get(`${url}?b_start:int=${skipAmmount}`)
    const html = response.data;
    const $ = load(html);
    const news = [];

    const newsResponse = $('div#wrapper')
      .find('#main')
      .find('#main-content')
      .find('div')
      .find('#content')
      .find('#content-core')
      .find('article.tileItem')

    if(newsResponse.length > 0) {
      newsResponse
      .each((index, element) => {
        const subtitle = $(element).find('div.tileContent').find('span.subtitle').text()
        const title = $(element).find('div.tileContent').find('h2.tileHeadline a').text()
        const link = $(element).find('div.tileContent').find('h2.tileHeadline a').attr('href')

        news.push({
          subtitle,
          title,
          link
        })
      })

      const nextSkipAmmount = newsResponse.length * execution

      return {
        news: news,
        nextSkipAmmount: nextSkipAmmount,
        continue: true
      }
    }

    return {
      news: news,
      continue: false
    }
  } catch(err) {
    console.log(err)
    return {
      news: [],
      continue: false
    }
  }
}

export async function processAsyncData(getData) {
  try {  
    let continueExecution = true
    let skipAmmount = 0
    let news = []
  
    for(let execution = 1; continueExecution; execution++) {  
      const response = await getData(execution, skipAmmount)
      
      continueExecution = response.continue
      skipAmmount = response.nextSkipAmmount
      news = news.concat(response.news)
    }
  
    return news
  } catch(error) {
    return []
  }
}

createServer(async (req, res) => {
  const result = await processAsyncData(getData)

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(result))
  res.end()
})
.listen(3000, () => console.log('Server is running on http://localhost:3000'))
