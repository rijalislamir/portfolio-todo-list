import React, { useState } from 'react'
import './ActivityList.css'
import ActivityEmptyStateSvg from '../../assets/img/activity-empty-state.svg'
import DeleteModal from '../DeleteModal/DeleteModal'
import { Link } from 'react-router-dom'

const ActivityList = () => {
    const [activities, setActivities] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [willBeDelete, setWillBeDelete] = useState({})

    const addNewActivity = () => {
        setActivities([{
            name: 'New Activity ' + activities.length,
            date: new Date
        }, ...activities])
    }

    const deleteActivity = (index) => {
        setActivities(activities.filter((_, i) => i !== index))
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const convertDateToString = (date) => {
        const months = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ]

        return `${date.getDate()} ${months[parseInt(date.getMonth())]} ${date.getFullYear()}`
    }

    const openDeleteModal = (e, name, index) => {
        e.preventDefault()
        const item = { name, index }
        setShowDeleteModal(true)
        setWillBeDelete(item)
    }

    return (
        <main>
            <div className='activity-header'>
                <span>Activity</span>
                <button onClick={addNewActivity}><span className='plus'></span> Tambah</button>
            </div>

            <div className='activities-container'>
                {activities.length
                    ? activities.map((item, i) => 
                        <Link to={`/detail/${i}`} key={i}>
                            <div className='activity'>
                                <div className='activity-name'>{item.name}</div>
                                <div className='activity-footer'>
                                    <span className='activity-date'>{convertDateToString(item.date)}</span>
                                    <span className='trash' onClick={e => openDeleteModal(e, item.name, i)}></span>
                                </div>
                            </div>
                        </Link>
                    )
                    : <div className='activity-empty-state'>
                        <img src={ActivityEmptyStateSvg} onClick={addNewActivity} alt="Activity Empty" />
                    </div>
                }

                <DeleteModal
                    show={showDeleteModal}
                    closeDeleteModal={closeDeleteModal}
                    type={"activity"}
                    activity={willBeDelete}
                    deleteActivity={deleteActivity}
                    />
            </div>
        </main>
    )
}

export default ActivityList