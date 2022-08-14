import React, { useState, useEffect } from 'react'
import './ActivityList.css'
import ActivityEmptyStateSvg from '../../assets/img/activity-empty-state.svg'
import DeleteModal from '../DeleteModal/DeleteModal'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities, getActivity, createActivity, deleteActivity } from '../../features/activity/activitySlice'

const ActivityList = () => {
    const activities = useSelector((state) => state.activity.activities)
    const isActivityLoading = useSelector((state) => state.activity.isLoading)
    const dispatch = useDispatch()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedActivity, setSelectedActivity] = useState({})

    useEffect(() => {
        dispatch(getActivities())
    }, [])
    
    const addNewActivity = () => {
        dispatch(createActivity())
    }
    
    const onDeleteActivity = activityId => {
        dispatch(deleteActivity({ activityId }))
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const convertDateToString = (date) => {
        const newDate = new Date(date)
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

        return `${newDate.getDate()} ${months[parseInt(newDate.getMonth())]} ${newDate.getFullYear()}`
    }

    const openDeleteModal = (e, title, id) => {
        e.stopPropagation()
        e.preventDefault()
        const item = { title, id }
        setShowDeleteModal(true)
        setSelectedActivity(item)
    }

    return (
        <main>
            <div className='activity-header'>
                <span data-cy='activity-title'>Activity</span>
                <button data-cy='activity-add-button' onClick={addNewActivity}><span className='plus'></span> Tambah</button>
            </div>

            <div data-cy='activity-item' className='activities-container'>
                {activities.length
                    ? activities.map((item, i) => 
                        <Link to={`/detail/${item.id}`} key={i}>
                            <div data-cy={`activity-item-${i}`} className='activity' onClick={() => dispatch(getActivity({ activityId: item.id }))}>
                                <div className='activity-name' data-cy='activity-item-title'>{item.title}</div>
                                <div className='activity-footer'>
                                    <span data-cy='activity-item-date' className='activity-date'>{convertDateToString(item.created_at)}</span>
                                    <span data-cy='activity-item-delete-button' className='trash' onClick={e => openDeleteModal(e, item.title, item.id)}></span>
                                </div>
                            </div>
                        </Link>
                    )
                    : <div data-cy='activity-empty-state' className='activity-empty-state'>
                        <img src={ActivityEmptyStateSvg} onClick={addNewActivity} alt="Activity Empty" />
                    </div>
                }

                <DeleteModal
                    show={showDeleteModal}
                    closeDeleteModal={closeDeleteModal}
                    id={selectedActivity.id}
                    type={"activity"}
                    name={selectedActivity.title}
                    deleteFunction={onDeleteActivity}
                    />
            </div>
        </main>
    )
}

export default ActivityList