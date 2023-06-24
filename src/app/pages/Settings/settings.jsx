import { useLocation } from 'react-router-dom';
import './settings.css';

export function Settings(){
    const { state } = useLocation();


    return (
        <>
          <div className="settings-container">
          </div> 
        </>
    )
}