import React from 'react';
import Carousel from "react-multi-carousel";
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import { useNavigate } from 'react-router-dom'
import { ModalElement } from "../Modal/ModalElement";
import notFoundCover from '../../assets/noImage.svg';
import './ContentSlider.css'
import "react-multi-carousel/lib/styles.css";
import Api from '../../services/Api';

export function ContentSlider(props){
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedContent, setSelectedContent] = React.useState({});
    const navigate = useNavigate();

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const decision = (type) => {
        if(type === 'Lendo'){
            return 'lendo'
        } else if (type === 'Quero Ler') {
            return 'quero-ler'
        } else {
            return 'lidos'
        }
    }

    const openBookInformation = () => {
        navigate('/book', {state: selectedContent})
    }

    const deleteRead = async () => {
        try {
            await Api.delete(`/readings/${selectedContent.book.id}`, {
                headers: {
                    'x-session-token': JSON.parse(localStorage.getItem('token')),
                }
            });
            setModalShow(false)
            props.onDelete();
        } catch(error) {
            console.error(error);
        }
    }

    const openModalOptions = (book) => {
        setModalShow(true)
        setSelectedContent(book);
    }

    return(
        <>
            <h2>{props.type}</h2>
            <Carousel responsive={responsive} className={decision(props.type)}>
                {props.books.length > 0 && 
                    props.books.map((book, index) => 
                    <Figure key={index} onClick={() => openModalOptions(book)}>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt={book?.book?.imageUrl}
                            src={book?.book?.imageUrl || notFoundCover}
                            className="bookList"
                        />
                        <Figure.Caption>
                            {book?.book?.title || 'Não encontrado'}
                        </Figure.Caption>
                    </Figure>
                )
                }
            </Carousel>
            <ModalElement
                show={modalShow}
                onHide={() => setModalShow(false)}        
            >
                <Button className="info-btn" onClick={() => openBookInformation()}>Ver Informações</Button>
                <Button className="remove-btn" onClick={() => deleteRead()}>Remover</Button>
            </ModalElement>
        </>
    )
}