import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner/Banner';
import "./details.css";
import { useLocation } from 'react-router-dom';
import Api from "../../services/Api";
import { ContentBasicInfo } from '../../components/ContentBasicInfo/ContentBasicInfo';

export function Details(){
  const { state } = useLocation();
  const [contentDetails, setContentDetails] = useState({});
  const { name, backdrop_path, title, id, media_type, contentName, contentId, contentType } = state;

  useEffect(() => {
    const getContentDetails = async () => {
      await Api.get(`/content/${id || contentId}`,
        {
          params: {
            type: media_type || contentType
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

  useEffect(() => {
    console.log(contentDetails);
  }, [contentDetails])

  return (
    <>
      <Banner 
        title={name || title || contentName}
        image={backdrop_path ? `https://image.tmdb.org/t/p/original/${backdrop_path}` : "../../assets/noImage.svg"}/>
      <ContentBasicInfo 
        channels={contentDetails?.networks}
        first_air_date={contentDetails?.first_air_date}
        last_air_date={contentDetails?.last_air_date}
        release_date={contentDetails?.release_date}
        media_type={media_type}
        contentType={contentType}
        genres={contentDetails?.genres}
        vote_average={contentDetails?.vote_average}
        overview={contentDetails?.overview}
      />
    </>
  );
}