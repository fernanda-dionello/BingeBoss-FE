import { useEffect, useState } from 'react';
import Api from "../../services/Api";
import "./ButtonList.css";
import Button from "react-bootstrap/Button";

export function ButtonList(props) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getStatus = async() => {
      await Api.get(
        `/userContent/${props.id}`,
        {
          params: {
            type: props.type,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      )
        .then((res) => setStatus(res.data?.contentStatus))
        .catch((err) => console.log(err));
    }
    getStatus();
  }, [status])


  const handleClick = async (type) => {
    await Api.post(
      `/userContent/${props.id}`,
      {},
      {
        params: {
          status: type,
          type: props.type,
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
      .then((res) => setStatus(res.data?.contentStatus))
      .catch((err) => console.log(err));
  };

  return (
    <div className="button-list">
      {props.list.map((item) => (
        <Button
          key={item.name}
          className={status?.includes(item.type) ? "button-active" :"button-item"}
          variant="link"
          size="sm"
          onClick={() => handleClick(item.type)}
        >
          <img className="button-icon" src={item.image} alt={item.name} />
          {item.name}
        </Button>
      ))}
    </div>
  );
}
