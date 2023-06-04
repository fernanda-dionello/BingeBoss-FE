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

    return (
        <>
          <BigSlider type='Top 10 most watched' content={top10Contents}/>
          <ContentSlider type='Recommended for you' content={top10Contents}/>
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