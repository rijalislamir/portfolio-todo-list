import React, { useState } from 'react'
import './Activities.css'
import ActivityEmptyStateSvg from '../../assets/img/activity-empty-state.svg'
import DeleteModal from '../DeleteModal/DeleteModal'

const Activities = props => {
    const {
        activities,
        addNewActivity,
        deleteActivity
    } = props

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [willBeDelete, setWillBeDelete] = useState({})

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

    const openDeleteModal = (name, index) => {
        const item = { name, index }
        setShowDeleteModal(true)
        setWillBeDelete(item)
    }

    return (
        <div className='activities-container'>
            {activities.length
                ? activities.map((item, i) => 
                    <div className='activity' key={i}>
                        <div className='activity-name'>{item.name}</div>
                        <div className='activity-footer'>
                            <span className='activity-date'>{convertDateToString(item.date)}</span>
                            <span className='trash' onClick={() => openDeleteModal(item.name, i)}></span>
                            {/* <span className='trash' onClick={() => deleteActivity(i)}></span> */}
                        </div>
                    </div>
                )
                : <div className='activity-empty-state'>
                    <img src={ActivityEmptyStateSvg} onClick={addNewActivity} alt="Activity Empty" />
                </div>
            }

            <DeleteModal
                show={showDeleteModal}
                onClose={closeDeleteModal}
                type={"activity"}
                activity={willBeDelete}
                onDelete={deleteActivity}
            />
        </div>
    )
}

export default Activities