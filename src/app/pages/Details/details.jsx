import { Banner } from '../../components/Banner/Banner';
import "./details.css";
import { useLocation } from 'react-router-dom';

export function Details(){
  const { state } = useLocation();
  const { name, backdrop_path, title } = state;

  return (
    <Banner 
      title={name || title}
      image={`https://image.tmdb.org/t/p/original/${backdrop_path}`}/>
  );
}