import "./ContentDetails.css";
import Button from "react-bootstrap/esm/Button";
import { DropDown } from "../Dropdown/Dropdown";
import Api from "../../services/Api";
import { useEffect, useState } from "react";
import checkMark from "../../assets/check-mark.svg";
import { Comments } from "../Comments/Comments";

export function ContentDetails(props) {
  const [episodes, setEpisodes] = useState();
  const [season, setSeason] = useState("1");
  const [commentsStates, setCommentsStates] = useState({});
  const [watchedContents, setWatchedContents] = useState([]);

  const getWatchedData = async () => {
    await Api.get(`/userContent/${props.id || props.contentId}/watched/${season}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => setWatchedContents(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getSeasonData = async () => {
      await Api.get(`/content/${props.id || props.contentId}`, {
        params: {
          type: "season",
          seasonNumber: season,
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
        .then((res) => {
          setEpisodes(res.data.episodes);
        })
        .catch((err) => console.log(err));
    };
    getSeasonData();
    getWatchedData();
  }, [season]);

  const optionSelected = (item) => {
    setSeason(item.split(" ")[1]);
  };

  const toggleComments = (episodeId) => {
    setCommentsStates((prevStates) => ({
      ...prevStates,
      [episodeId]: !prevStates[episodeId],
    }));
  };

  const handleEpisodeClick = async (episodeId) => {
    if(watchedContents.includes(episodeId)){
      await Api.delete(`/userContent/${props.id ?? props.contentId}`, {
        params: {
          type:"episode",
          seasonNumber: season,
          episodeNumber: episodeId
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
        .then((res) => getWatchedData())
        .catch((err) => console.log(err));
    } else {
      await Api.post(`/userContent/${props.id ?? props.contentId}`, {}, {
        params: {
          status:"watched",
          type:"episode",
          seasonNumber: season,
          episodeNumber: episodeId
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
        .then((res) => getWatchedData())
        .catch((err) => console.log(err));
    }
  };

  const handleCheckAllSeason = async () => {
    await Api.post(`/userContent/${props.id ?? props.contentId}`, {}, {
      params: {
        status:"watched",
        type:"season",
        seasonNumber: season,
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => getWatchedData())
      .catch((err) => console.log(err));
  }

  const handleWatchedButton = (episode) => {
    if(watchedContents.length === 0){
      return 'checkmark-button'
    }
    if(watchedContents.includes(episode)){
      return 'mark-watched'
    }
    return 'checkmark-button'
  }

  return (
    <div className="content-details-wrapper">
      <div className="content-details-header">
        <p className="episodes">Episodes</p>
        <div className="dropdown-button">
          <Button
            className="mark-season-watched-button"
            variant="link"
            size="sm"
            onClick={() => handleCheckAllSeason()}
          >
            Mark season as watched
          </Button>
          <DropDown
            optionSelected={optionSelected}
            number_of_seasons={props.number_of_seasons}
          />
        </div>
      </div>
      {episodes &&
        episodes.map((item) => (
          <div key={item.episode_number} className="content-episodes-wrapper">
            <div className="content-episodes-details">
              <p className="episode-number">{item.episode_number}</p>
              <img
                className="episode-image"
                src={`https://image.tmdb.org/t/p/w300/${item.still_path}`}
                alt={item.name}
              ></img>
              <div className="episode-info-wrapper">
                <p>{item.name}</p>
                <p>{item.overview}</p>
                <Button
                  className="comment-button"
                  variant="link"
                  size="sm"
                  onClick={() => toggleComments(item.episode_number)}
                >
                  Write or read comments
                </Button>
              </div>
              <Button variant="link" onClick={() => handleEpisodeClick(item.episode_number)}>
                <img
                  className={handleWatchedButton(item.episode_number)}
                  src={checkMark}
                  alt={`checkMark episode ${item.episode_number}`}
                />
              </Button>
            </div>
            {commentsStates[item.episode_number] && (
              <Comments
                season={season}
                episode={item.episode_number}
                id={props.id ?? props.contentId}
                type="episode"
              />
            )}
          </div>
        ))}
    </div>
  );
}
