import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner/Banner';
import "./details.css";
import { useLocation } from 'react-router-dom';
import Api from "../../services/Api";
import { ContentBasicInfo } from '../../components/ContentBasicInfo/ContentBasicInfo';

export function Details(){
  const { state } = useLocation();
  const [contentDetails, setContentDetails] = useState({});
  const { name, backdrop_path, title, id, media_type } = state;

  useEffect(() => {
    const getContentDetails = async () => {
      await Api.get(`/content/${id}`,
        {
          params: {
            type: media_type
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }
        })
        .then(res => setContentDetails(res.data))
        .catch(err => console.log(err));
    };
    getContentDetails();
  }, [])

  return (
    <>
      <Banner 
        title={name || title}
        image={`https://image.tmdb.org/t/p/original/${backdrop_path}`}/>
      <ContentBasicInfo channels={contentDetails.networks}/>
    </>
  );
}