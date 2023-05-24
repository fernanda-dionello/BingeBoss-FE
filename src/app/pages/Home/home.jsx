import { ContentSlider } from "../../components/ContentSlider/ContentSlider";
import './home.css';
import Api from "../../services/Api";
import { useEffect, useState } from "react";

export function Home(){

    const [readingBooks, setReadingBooks] = useState([]);
    const [wantToReadBooks, setWantToReadBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);

    // useEffect(() => {
    //     getReadingBooks()
    //     getWantsToReadBooks()
    //     getReadBooks()
    // }, [])

    async function getReadingBooks(){        
        await Api.get('/readings/reading',
        {
			headers: {
				'x-session-token': JSON.parse(localStorage.getItem('token')),
			}
		})
            .then(res => setReadingBooks(res.data))
            .catch(err => console.log(err));
    }

    async function getWantsToReadBooks(){        
        await Api.get('/readings/wants-to-read',
        {
            headers: {
                'x-session-token': JSON.parse(localStorage.getItem('token')),
            }
        })
            .then(res => setWantToReadBooks(res.data))
            .catch(err => console.log(err));
    }

    async function getReadBooks(){        
        await Api.get('/readings/read',
        {
            headers: {
                'x-session-token': JSON.parse(localStorage.getItem('token')),
            }
        })
            .then(res => setReadBooks(res.data))
            .catch(err => console.log(err));
    }

    return (
        <>
            {/* <ContentSlider type='Lendo' books={readingBooks} onDelete={() => getReadingBooks()}/>
            <ContentSlider type='Quero Ler' books={wantToReadBooks} onDelete={() => getWantsToReadBooks()}/>
            <ContentSlider type='Lidos' books={readBooks} onDelete={() => getReadBooks()}/> */}
            HOME
        </>
    )
}