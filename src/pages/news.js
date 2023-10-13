import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import NewsElement from './components/NewsElement'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import styles from './../styles/news.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function News() {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "/api/news";
    const getNews = async () => {
      const response = await axios.get(url);
      const data = response.data;
      console.log(response.data);
      setNews(data);
      setLoading(false);
    };
    getNews()
  }, [])


  return (
    <div className={styles.container}>
      <Navbar />

      <h1 className='text-white text-4xl text-center my-12'> NEWS </h1>
      <div className='flex align-middle justify-center'>
        {loading ? <h1 className='text-6xl text-white'>Loading...</h1> :

          <div className="grid grid-cols-1 mt-30 gap-4">
            {news.map((news) => (
              <NewsElement text={news.title} coin={news.coin} url={news.url} time={news.time} />
            ))}
          </div>
        }
      </div>
    </div>

  )
}
