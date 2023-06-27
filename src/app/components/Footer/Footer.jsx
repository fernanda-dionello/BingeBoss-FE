import './Footer.css';
import tmdb from "../../assets/tmdb.svg";

export function Footer(props){
  return(
    <div className='footer'>
      <p>Credits - This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      <img src={tmdb} alt='tmdb' width={30} />
    </div>
  )
}