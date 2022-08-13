import React, { useState } from 'react'
import './Dashboard.css'

import Activities from '../Activities/Activities'

const Dashboard = () => {
    const [activities, setActivities] = useState([])

    const addNewActivity = () => {
        setActivities([{
            name: 'New Activity ' + activities.length,
            date: new Date
        }, ...activities])
    }

    const deleteActivity = (index) => {
        setActivities(activities.filter((_, i) => i !== index))
    }

    return (
        <main>
            <div className='activity-header'>
                <span>Activity</span>
                <button onClick={addNewActivity}><span className='plus'></span> Tambah</button>
            </div>

            <Activities activities={activities} addNewActivity={addNewActivity} deleteActivity={deleteActivity} />
        </main>
    )
}

export default Dashboard