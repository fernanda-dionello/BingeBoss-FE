import React from 'react';
import Carousel from "react-multi-carousel";
import Figure from 'react-bootstrap/Figure';
import notFoundCover from '../../assets/noImage.svg';
import './CastSlider.css'
import "react-multi-carousel/lib/styles.css";
import { responsiveCast } from '../../utils/responsive';

export function CastSlider(props){
    return(
        <div className='cast-slider-wrapper'>
            <h2 className='cast-title'>Cast</h2>
            {props.content.length > 0 ? 
                <Carousel responsive={responsiveCast} className="cast-carousel">
                    {props.content.map((item, index) => 
                        <>
                          <Figure className="content-slider-cast-image" key={index}>
                              <Figure.Image
                                  alt={item?.name}
                                  src={`https://image.tmdb.org/t/p/w185/${item?.profile_path}` || notFoundCover}
                                  className="cast-image"
                              />
                          </Figure>
                          <p>{item?.name}</p>
                        </>
                        )
                    }
                </Carousel>
                :
                <div key="empty-carousel" className='empty-carousel'/>
            }
        </div>
    )
}