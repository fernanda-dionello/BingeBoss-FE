import { useLocation } from 'react-router-dom';

export function Settings(){
    const { state } = useLocation();


    return (
        <>
          <p>{state?.oi}</p>  
        </>
    )
}