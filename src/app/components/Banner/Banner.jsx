import "./Banner.css";

export function Banner({image, title}) {  
  return(
    <div className="banner-container">
      <img className="background-image" src={image} alt='content background figure'
      >
      </img>
      <div className='banner-title'>
        {title}
      </div>
    </div>
  )
}