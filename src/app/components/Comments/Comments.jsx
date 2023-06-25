import "./Comments.css";
import Form from 'react-bootstrap/Form';
import send from "../../assets/play-button.svg";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Api from '../../services/Api';

export function Comments(props){

  const [userComments, setUserComments]=useState([]);
  const [comment, setComment] = useState('');
  const params = {
    type: props?.type
  };
  if(props?.season) {params["seasonNumber"]=props?.season};
  if(props?.episode) {params["episodeNumber"]=props?.episode};

  const getComments = async () => {
    await Api.get(`/content/${props?.id}/comments`, {
      params: {...params},
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => setUserComments(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    getComments();
  }, [setUserComments]);

  const handleCommentSubmit = async () => {
    await Api.post(`/content/${props?.id}/comment`, {comment: comment}, {
        params: {...params},
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
        .then((res) => {
          getComments();
          setComment('');
        })
        .catch((err) => console.log(err));
    };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return(
    <div className='comments-wrapper'>
      <div className='input-wrapper'>
        <Form className='form-wrapper'>
          <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control 
              as="textarea"
              rows={3}
              value={comment}
              placeholder='Write your comment here'
              onChange={handleChange}
              />
          </Form.Group>
        </Form>
        <Button variant='link' onClick={(e) => handleCommentSubmit(e)}>
          <img className="send-comment-button" src={send} alt='send'/>
        </Button>
      </div>
      <div className='users-comments-wrapper'>
        <p className='comments-title'>Comments</p>
        {
          userComments.length ? userComments.map(item => 
            <div className="user-comment" key={item._id}>
              <p>{item?.userName} - {item?.updatedAt?.split('T')[0]}</p>
              <p>{item?.comment}</p>
            </div>
          ) :
          <div className="user-comment">
            <p>No comments yet.</p>
          </div>
        }
      </div>
    </div>
  )
}