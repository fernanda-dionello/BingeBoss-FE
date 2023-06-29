import { ContentSlider } from "../../components/ContentSlider/ContentSlider";
import './home.css';
import Api from "../../services/Api";
import { useEffect, useState, useContext } from "react";
import { BigSlider } from '../../components/BigSlider/BigSlider';
import { Context } from '../../context/AuthContext';

export function Home(){

    const { recommendedContents } = useContext(Context);
    const [top10Contents, setTop10Contents] = useState([]);
    const [watchingContents, setWatchingContents] = useState([]);
    const [watchedContents, setWatchedContents] = useState([]);
    const [myList, setMyList] = useState([]);
    const [abandonedContents, setAbandonedContents] = useState([]);

    useEffect(() => {
        getTop10()
        getListByStatus('watching')
        getListByStatus('myList')
        getListByStatus('watched')
        getListByStatus('abandoned')
    }, [])

    async function getTop10(){        
        await Api.get('/trending?type=all',
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }
        })
        .then(res => setTop10Contents(res.data))
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
        </>
    )
}