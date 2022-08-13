import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ItemListEmptyStateSvg from '../../assets/img/todo-empty-state.svg'
import './ActivityDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { addListItem, deleteListItem } from '../../features/listItem/listItemSlice'
import { updateActivity } from '../../features/activity/activitySlice'

const ActivityDetail = () => {
    const listItem = useSelector(state => state.listItem.all)
    const activeActivity = useSelector(state => state.activity.active)
    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const addNewItemList = () => {
        console.log('Adding new item list...')
    }

    const toggleEdit = () => {
        setEdit(prev => !prev)
    }

    const onChangeForm = e => {
        dispatch(updateActivity({ id: activeActivity.id, name: e.target.value }))
    }

    return (
        <main>
            <div className='activity-detail-header'>
                <div className='activity-title'>
                    <Link to="/"><span className='back'></span></Link>
                    {edit
                        ? <input type="text" value={activeActivity.name} onChange={onChangeForm} />
                        : <h1 className='activity-detail-name' onClick={toggleEdit}>{activeActivity.name}</h1>
                    }
                    <span className='edit' onClick={toggleEdit}></span>
                </div>

                <div className='item-list-option'>
                    {listItem.length !== 0 && <span className='sort'></span>}
                    <button onClick={addNewItemList}><span className='plus'></span> Tambah</button>
                </div>
            </div>

            <div className='list-item-container'>
                {listItem.length
                    ? null
                    : <div className='item-list-empty-state'>
                        <img src={ItemListEmptyStateSvg} onClick={addNewItemList} alt="Item List Empty" />
                    </div>
                }
            </div>
        </main>
    )
}

export default ActivityDetail