import { useLocation } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import notFoundCover from '../../assets/noImage.svg';
import './results.css';

export function Results(){
  const { state } = useLocation();

  return(
    !state ?
    <p>Try another page!</p>
    :
    <div className='results-container'>
        {(state.results).map((item, index) => 
            <Figure className='figure-results' key={index} onClick={() => console.log('Ok!')}>
                <Figure.Image
                    alt={item?.original_title}
                    width={320}
                    src={item.backdrop_path ? `https://image.tmdb.org/t/p/w780/${item.backdrop_path}` : notFoundCover}
                    className="contentList"
                />
            </Figure>
            )
        }
      </div>
  )
}