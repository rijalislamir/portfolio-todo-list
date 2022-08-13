import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ItemListEmptyStateSvg from '../../assets/img/todo-empty-state.svg'
import './ActivityDetail.css'

const ActivityDetail = () => {
    const [listItem, setListItem] = useState([])

    const addNewItemList = () => {
        console.log('Adding new item list...')
    }

    return (
        <main>
            <div className='activity-detail-header'>
                <div className='activity-title'>
                    <Link to="/"><span className='back'></span></Link>
                    <p className='activity-detail-name'>New Activity</p>
                    <span className='edit'></span>
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