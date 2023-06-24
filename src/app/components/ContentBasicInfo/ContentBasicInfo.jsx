import "./ContentBasicInfo.css";
import star from "../../assets/star.svg";

export function ContentBasicInfo(props) {
  const startedYear = props.first_air_date?.split("-")[0] ?? "";
  const endYear = props.last_air_date?.split("-")[0] ?? "";
  const releaseDate = props.release_date?.split("-")[0] ?? "";

  return (
    <div className='content-basic-info-wrapper'>
      <div className='first-line'>
        <div className='content-basic-info-wrapper-left'>
          <div className='channel-wrapper'>
            {props.channels &&
              props.channels.map((item, index) => (
                <p className="channel-name" key={index}>
                  {item.name}
                </p>
              ))}
          </div>
          <p className='content-date'>
            {releaseDate ? releaseDate : `${startedYear}/${endYear}`}
          </p>
          <div className='genres-wrapper'>
            {props.genres &&
                props.genres.map((item, index) => (
                  <p className="content-genres" key={index}>
                    {item.name}
                  </p>
                ))}
          </div>
        </div>
        <div className='content-basic-info-wrapper-right'>
          <img className="star-rating" src={star} alt='rating'/>
          <p>{props.vote_average ? props.vote_average : "-"}/10</p>
        </div>
      </div>
      <div className='second-line'>
        <p>{props.overview}</p>
      </div>

    </div>
  );
}
