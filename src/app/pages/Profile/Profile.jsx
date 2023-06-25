import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Context} from '../../context/AuthContext';
import './Profile.css';
import Api from '../../services/Api';
import { DropDownList } from '../../components/DropdownList/DropdownList';
import Figure from 'react-bootstrap/Figure';
import notFoundCover from '../../assets/noImage.svg';

export function Profile(){
  const { firstName } = useContext(Context);
  const [contentConsumption, setContentConsumption] = useState();
  const [contentStatus, setContentStatus] = useState('myList');
  const [contentList, setContentList] = useState([]);

  const navigate = useNavigate();

  async function getUserContentConsumption(){        
    await Api.get('/userContent/consumption',
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      }
    })
    .then(res => setContentConsumption(res.data))
    .catch(err => console.log(err));
  }

  const optionSelected = (item) => {
    setContentStatus(item);
  };

  async function getListByStatus(contentStatus){        
    await Api.get(`/userContent/status/${contentStatus}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      }
    })
    .then(res => setContentList(res.data))
    .catch(err => console.log(err));
  }

  function getTotalOfHours() {
    const arrOfConsumption = [];
    if (contentConsumption?.totalYears) {
      arrOfConsumption.push({
        type: 'Years',
        value: contentConsumption.totalYears
      });
    }
    if (contentConsumption?.totalMonths) {
      arrOfConsumption.push({
        type: 'Months',
        value: contentConsumption.totalMonths
      });
    }
    if (contentConsumption?.totalWeeks) {
      arrOfConsumption.push({
        type: 'Weeks',
        value: contentConsumption.totalWeeks
      });
    }
    if (contentConsumption?.totalDays) {
      arrOfConsumption.push({
        type: 'Days',
        value: contentConsumption.totalDays
      });
    }
    if (contentConsumption?.totalHours) {
      arrOfConsumption.push({
        type: 'Hours',
        value: contentConsumption.totalHours
      });
    }
    if (contentConsumption?.totalMinutes) {
      arrOfConsumption.push({
        type: 'Minutes',
        value: contentConsumption.totalMinutes
      });
    }

    return arrOfConsumption;
  }

  useEffect(() => {
      getUserContentConsumption()
      getListByStatus(contentStatus)
  }, [])

  useEffect(() => {
    getListByStatus(contentStatus)
}, [contentStatus])

  return (
      <div className='profile-container'>
        <h1 className='profile-welcome-text'> Welcome back, <span className="profile-welcome-name">{firstName}</span>! </h1>
        <div className='profile-consumption-container'>
          <div className='total-consumption-box'>
            <span className='total-consumption-box-title'>Total of hours</span>
            <div className='hours-container'>
              {getTotalOfHours().map((item, index) => 
                <div className='hours-item' key={index}>
                  <span className='hours-item-value'>{item.value}</span>
                  <span className='hours-item-type'>{item.type}</span>
                </div>
              )}
            </div>
            
          </div>
          <div className='total-consumption-box'>
            <span className='total-consumption-box-title'>Watched Episodes</span>
            {contentConsumption?.totalEpisodes}
          </div>
          <div className='total-consumption-box'>
            <span className='total-consumption-box-title'>Watched Movies</span>
            {contentConsumption?.totalMovies}
          </div>
        </div>
        <div className='list-container'>
          <div className='list-header'>
            <span className='list-header-title'>My Library</span>
            <div className='list-header-dropdown'>
              <span>{contentList.length} results</span>
              <DropDownList
                optionSelected={optionSelected}
              />
            </div>
          </div>
          <div className='results-list-container'>
          {contentList.map((item, index) => 
            <Figure className='figure-results' key={index} onClick={() => navigate('/details', {state: item})}>
                <Figure.Image
                    alt={item?.original_title}
                    width={320}
                    src={item.backdrop_path ? `https://image.tmdb.org/t/p/w780/${item.backdrop_path}` : notFoundCover}
                    className="contentList"
                />
            </Figure>
          )}
      </div>
        </div>
      </div>
  )
}