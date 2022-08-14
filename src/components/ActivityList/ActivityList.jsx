import React, { useState } from 'react'
import './ActivityList.css'
import ActivityEmptyStateSvg from '../../assets/img/activity-empty-state.svg'
import DeleteModal from '../DeleteModal/DeleteModal'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addActivity, deleteActivity, selectActivity } from '../../features/activity/activitySlice'

const ActivityList = () => {
    const activities = useSelector((state) => state.activity.all)
    const dispatch = useDispatch()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [willBeDelete, setWillBeDelete] = useState({})

    const addNewActivity = () => {
        dispatch(addActivity())
    }

    const onDeleteActivity = id => {
        dispatch(deleteActivity({ id }))
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

    const openDeleteModal = (e, name, id) => {
        e.stopPropagation()
        e.preventDefault()
        const item = { name, id }
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
                        <Link to={`/detail/${item.id}`} key={i}>
                            <div className='activity' onClick={() => dispatch(selectActivity({ index: i, id: item.id, name: item.name }))}>
                                <div className='activity-name'>{item.name}</div>
                                <div className='activity-footer'>
                                    <span className='activity-date'>{convertDateToString(item.date)}</span>
                                    <span className='trash' onClick={e => openDeleteModal(e, item.name, item.id)}></span>
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
                    id={willBeDelete.id}
                    type={"activity"}
                    name={willBeDelete.name}
                    deleteFunction={onDeleteActivity}
                    />
            </div>
        </main>
    )
}

export default ActivityList