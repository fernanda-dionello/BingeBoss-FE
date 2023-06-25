import React, { useContext, useEffect, useState } from 'react';
import {Context} from '../../context/AuthContext';
import './Profile.css';
import Api from '../../services/Api';

export function Profile(){
  const { userId, firstName } = useContext(Context);
  const [contentConsumption, setContentConsumption] = useState();

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

  function getTotalOfHours() {
    let strHours = '';
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
  }, [])

  return (
      <div className='profile-container'>
        <h1 className='profile-welcome-text'> Welcome back, <span className="profile-welcome-name">{firstName}</span>! </h1>
        <div className='profile-consumption-container'>
          <div className='total-consumption-box'>
            <span className='total-consumption-box-title'>Total of hours</span>
            <div className='hours-container'>
              {getTotalOfHours().map((item) => 
                <div className='hours-item'>
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
      </div>
  )
}