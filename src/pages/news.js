import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import NewsElement from './components/NewsElement'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import styles from './../styles/news.module.css'
import Chatbot from './components/ChatBot'

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const url = "/api/news";
    const getNews = async () => {
      const response = await axios.get(url);
      const data = response.data;
      console.log(response.data);
      setNews(data);
      setLoading(false);
    };
    getNews();
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <Chatbot />
      

      <div className="flex justify-center items-center">
        <h1 className="text-5xl text-gray-100 font-bold mt-12 mb-4 tracking-wide">News</h1>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-300 text-xl mb-8">The latest news from the crypto world</p>
      </div>

      

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 mt-30 gap-4">
          {news
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((newsItem, index) => (
              <NewsElement
                key={index}
                text={newsItem.title}
                coin={newsItem.coin}
                url={newsItem.url}
                time={newsItem.time}
              />
            ))}
        </div>


      </div>
      {news.length === 0 ? (
        <div>
        </div>)
        :
        <div className="flex justify-center items-center mt-6 pb-20">
          <div className='flex gap-24 justify-center items-center'>
            <button className="text-gray-100 text-[1.3rem] border-gray-300 border-solid border-2 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 transition-all duration-250" onClick={() => handlePageChange(currentPage - 1)}>Previous </button>
            <span className='text-white text-[1.3rem]'> {currentPage} of {totalPages} </span>
            <button className="text-gray-100 text-[1.3rem] border-gray-300 border-solid border-2 px-4 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 transition-all duration-250" onClick={() => handlePageChange(currentPage + 1)}> Next</button>
          </div>
        </div>}


    </div>
  );
}
