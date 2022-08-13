import React from 'react'
import ActivityEmptyStateSvg from '../../assets/img/activity-empty-state.svg'
import './Dashboard.css'

const Dashboard = () => {
    return (
        <main>
            <div className='activity'>
                <span>Activity</span>
                <button><span className='plus'></span> Tambah</button>
            </div>

            <div className='activity-empty-state'>
                <img src={ActivityEmptyStateSvg} alt="Activity Empty" />
            </div>
        </main>
    )
}

export default Dashboard