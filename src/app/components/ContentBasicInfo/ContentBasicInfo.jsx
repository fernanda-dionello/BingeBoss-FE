import "./ContentBasicInfo.css";
import star from "../../assets/star.svg";
import mylist from "../../assets/heart.svg";
import watching from "../../assets/vision.svg";
import watched from "../../assets/cashback.svg";
import abandoned from "../../assets/package-box.svg";
import rating from "../../assets/rating.svg";
import { ButtonList } from "../ButtonList/ButtonList";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { ModalElement } from "../Modal/ModalElement";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Api from '../../services/Api';

export function ContentBasicInfo(props) {
  const startedYear = props.first_air_date?.split("-")[0] ?? "";
  const endYear = props.last_air_date?.split("-")[0] ?? "";
  const releaseDate = props.release_date?.split("-")[0] ?? "";
  const [ratingModal, setRatingModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const ratingRange = [];

  const buttonList = [
    { name: "Add to my list", image: mylist, type: "myList" },
    { name: "Add to watching", image: watching, type: "watching" },
    { name: "Watched", image: watched, type: "watched" },
    { name: "Abandoned", image: abandoned, type: "abandoned" },
  ];

  const saveVote = async(grade) => {
    await Api.post(`/userContent/${props.id ?? props.contentId}/rating/${grade}`, {}, {
      params: {
        type:props.media_type ?? props.contentType,
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => getVote())
      .catch((err) => console.log(err));
  }

  const getVote = async() => {
    await Api.get(`/userContent/${props.id ?? props.contentId}/rating`, {
      params: {
        type:props.media_type ?? props.contentType,
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => setSelectedButton(res.data?.rating))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getVote();
  }, [])

  for (let i = 1; i <= 10; i++) {
    ratingRange.push(
      <Button
        key={i}
        size="sm"
        className={
          selectedButton === i
            ? "rating-button-vote-selected"
            : "rating-button-vote"
        }
        onClick={() => {
          setSelectedButton(i);
          saveVote(i);
        }}
      >
        {i}
      </Button>
    );
  }

  return (
    <div className="content-basic-info-wrapper">
      <div className="first-line">
        <div className="content-basic-info-wrapper-left">
          <div className="channel-wrapper">
            {props.channels &&
              props.channels.map((item, index) => (
                <p className="channel-name" key={index}>
                  {item.name}
                </p>
              ))}
          </div>
          <p className="content-date">
            {releaseDate ? releaseDate : `${startedYear}/${endYear}`}
          </p>
          <div className="genres-wrapper">
            {props.genres &&
              props.genres.map((item, index) => (
                <p className="content-genres" key={index}>
                  {item.name}
                </p>
              ))}
          </div>
        </div>
        <div className="content-basic-info-wrapper-right">
          <img className="star-rating" src={star} alt="rating" />
          <p>{props.vote_average ? props.vote_average : "-"}/10</p>
        </div>
      </div>
      <div className="second-line">
        <p>{props.overview === "" ? "No description available." : props.overview}</p>
      </div>
      <div className="third-line">
        <ButtonList
          list={buttonList}
          id={props.id ?? props.contentId}
          type={props.media_type ?? props.contentType}
        />
        <Button
          className="rating-button"
          variant="link"
          size="sm"
          onClick={() => setRatingModal(true)}
        >
          Give your rating
          <img className="rating-button-icon" src={rating} alt="ratting" />
        </Button>
        <ModalElement
          size="sm"
          id="modal"
          show={ratingModal}
          onHide={() => setRatingModal(false)}
        >
          <h3>Rating</h3>
          <ButtonToolbar>
            <ButtonGroup>{ratingRange}</ButtonGroup>
          </ButtonToolbar>
        </ModalElement>
      </div>
    </div>
  );
}
