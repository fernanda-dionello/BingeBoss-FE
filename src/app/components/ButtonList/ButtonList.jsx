import "./ButtonList.css";
import Button from 'react-bootstrap/Button';

export function ButtonList(props){
  return(
    <div className='button-list'>
      {
        props.list.map(item => 
          <Button className='button-item' variant="link" size="sm">
            <img className='button-icon' src={item.image} alt={item.name} />
            {item.name}
          </Button>
        )
      }
    </div>
  )
}