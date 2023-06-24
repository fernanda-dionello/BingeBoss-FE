import React from 'react';
import Carousel from "react-multi-carousel";
import Figure from 'react-bootstrap/Figure';
import { useNavigate } from 'react-router-dom'
import notFoundCover from '../../assets/noImage.svg';
import './BigSlider.css'
import "react-multi-carousel/lib/styles.css";
import { responsive } from '../../utils/responsive'

export function BigSlider(props){
    const navigate = useNavigate();

    const decision = (type) => {
        if(type === 'Top 10 most watched'){
            return 'top10'
        } else {
            return 'No title'
        }
    }

    return(
        <>
            <h2 className='text-big-slider'>{props.type}</h2>
                {props.content.length > 0 ? 
                    <Carousel responsive={responsive} className={decision(props.type)}>
                        {props.content.map((item, index) => 
                            <Figure className="big-slider-image" key={index} onClick={() => navigate('/details', {state: item})}>
                                <Figure.Image
                                    width={171}
                                    height={550}
                                    alt={item?.original_title}
                                    src={`https://image.tmdb.org/t/p/h632/${item.poster_path}` || notFoundCover}
                                    className="contentList"
                                />
                            </Figure>
                            )
                        }
                    </Carousel>
                    :
                    <div className='empty-carousel'/>
                }
        </>
    )
}