import React from 'react';
import Carousel from "react-multi-carousel";
import Figure from 'react-bootstrap/Figure';
import { useNavigate } from 'react-router-dom'
import notFoundCover from '../../assets/noImage.svg';
import './ContentSlider.css'
import "react-multi-carousel/lib/styles.css";
import { responsive } from '../../utils/responsive';

export function ContentSlider(props){
    const navigate = useNavigate();

    const decision = (type) => {
        if(type === 'Watching'){
            return 'watching'
        } else if (type === ' My List') {
            return 'myList'
        } else if (type === 'Watched') {
            return 'watched' 
        } else if(type === 'Recommended for you') {
            return 'recommended'
        } else {
            return 'abandoned'
        }
    }

    const openDetails = (item) => {
        navigate('/details', {state: item})
    }

    return(
        <>
            <h2 className='type-title'>{props.type}</h2>
            {props.content.length > 0 ? 
                <Carousel responsive={responsive} className={decision(props.type)}>
                    {props.content.map((item, index) => 
                        <Figure className="content-slider-image" key={index} onClick={() => openDetails(item)}>
                            <Figure.Image
                                alt={item?.original_title}
                                src={`https://image.tmdb.org/t/p/w780/${item.backdrop_path}` || notFoundCover}
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