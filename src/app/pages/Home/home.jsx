import { ContentSlider } from "../../components/ContentSlider/ContentSlider";
import './home.css';
import Api from "../../services/Api";
import { useEffect, useState } from "react";
import { BigSlider } from '../../components/BigSlider/BigSlider';

export function Home(){

    const [top10Contents, setTop10Contents] = useState([]);
    const [recommendedContents, setRecommendedContents] = useState([]);
    const [watchingContents, setWatchingContents] = useState([]);
    const [watchedContents, setWatchedContents] = useState([]);
    const [myList, setMyList] = useState([]);
    const [abandonedContents, setAbandonedContents] = useState([]);

    useEffect(() => {
        getTop10()
        getUserRecommendedContent()
        getListByStatus('watching')
        getListByStatus('myList')
        getListByStatus('watched')
        getListByStatus('abandoned')
    }, [])

    async function getTop10(){        
        await Api.get('/trending?type=all&language=pt-BR',
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }
        })
        .then(res => setTop10Contents(res.data))
        .catch(err => console.log(err));
    }

    async function getUserRecommendedContent(){        
      await Api.get('/userContent/recommendation',
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then(res => setRecommendedContents(res.data))
      .catch(err => console.log(err));
    }

    async function getListByStatus(contentStatus){        
      await Api.get(`/userContent/status/${contentStatus}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then(res => {
        switch (contentStatus) {
          case 'myList':
            setMyList(res.data)
            break;
          case 'watched':
            setWatchedContents(res.data)
            break;
          case 'watching':
            setWatchingContents(res.data)
            break;
          case 'abandoned':
            setAbandonedContents(res.data)
            break;
          default:
            break;
      }})
      .catch(err => console.log(err));
    }

    return (
        <>
          <BigSlider type='Top 10 most watched' content={top10Contents}/>
          <ContentSlider type='Recommended for you' content={recommendedContents}/>
          <ContentSlider type='Watching' content={watchingContents}/>
          <ContentSlider type='My List' content={myList}/>
          <ContentSlider type='Watched' content={watchedContents}/>
          <ContentSlider type='Abandoned' content={abandonedContents}/>

          
          {/* <ContentSlider type='Lendo' books={readingBooks} onDelete={() => getReadingBooks()}/>
          <ContentSlider type='Quero Ler' books={wantToReadBooks} onDelete={() => getWantsToReadBooks()}/>
          <ContentSlider type='Lidos' books={readBooks} onDelete={() => getReadBooks()}/> */}
          
        </>
    )
}