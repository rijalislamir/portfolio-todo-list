import React, { useState, useEffect } from 'react'
import './EditItemListModal.css'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateItemList } from '../../features/itemList/itemListSlice'

const EditItemListModal = props => {
    const {
        show,
        onClose,
        itemListId,
        prevTitle,
        prevPriority
    } = props

    const dispatch = useDispatch()
    const location = useLocation()

    const [showPriorityOptions, setShowPriorityOptions] = useState(false)
    const [editItemListName, setEditItemListName] = useState("")
    const [priority, setPriority] = useState("very-high")
    
    useEffect(() => { setEditItemListName(prevTitle) }, [prevTitle])
    useEffect(() => { setPriority(prevPriority) }, [prevPriority])

    const handleClose = () => {
        setEditItemListName(prevTitle)
        setPriority(prevPriority)
        setShowPriorityOptions(false)
        onClose()
    }

    const handleOnchange = e => {
        setEditItemListName(e.target.value)
    }

    const handleClickPriorityOption = option => {
        setPriority(option)
        setShowPriorityOptions(false)
    }

    const handleClickSaveButton = () => {
        dispatch(updateItemList({ 
            activityId: location.pathname.split('/').pop(),
            itemListId, 
            title: editItemListName,
            priority
        }))
        onClose()
    }
    
    const handleClickModal = e => {
        e.stopPropagation()
        setShowPriorityOptions(false)
    }

    const openPriorityOptions = e => {
        e.stopPropagation()
        setShowPriorityOptions(prev => !prev)
    }

    const getPriorityString = code => {
        const frags = code.split('-')

        for (let i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
        }

        return frags.join(' ')
    }

    return (
        <>
            {show && priority && 
            <div className='backdrop' data-cy='backdrop' onClick={handleClose}>
                <div className="modal edit-item-list-modal" data-cy='edit-item-list-modal'  onClick={handleClickModal}>
                    <div className="modal-header" data-cy='modal-header'>
                        <span>Edit List Item</span>
                        <span className='exit' onClick={handleClose}></span>
                    </div>

                    <div className="modal-body">
                        <label htmlFor="edit-item-list-name">NAMA LIST ITEM</label>
                        <input type="text" id="edit-item-list-name" className="item-list-name" value={editItemListName || ''} onChange={handleOnchange} placeholder='Tambahkan nama list item' autoComplete='off' />
                        
                        <label htmlFor="">PRIORITY</label>
                        <div className="priority-container">
                            <div className={showPriorityOptions ? 'priority priority-open' : 'priority'} onClick={openPriorityOptions}>
                                {showPriorityOptions
                                    ? <><span>Pilih priority</span><span className='chevron-up'></span></>
                                    : <>
                                        <span className='priority-group'><span className={'priority-indicator ' + priority}></span><span>{getPriorityString(priority)}</span></span>
                                        <span className='chevron-down'></span>
                                    </>
                                }
                            </div>

                            {showPriorityOptions &&
                            <div className="priority-options" >
                                <div className="priority-option" onClick={() => handleClickPriorityOption('very-high')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator red'></span>
                                        <span>Very High</span>
                                    </span>
                                    <span className={priority === 'very-high' ? 'check' : ''}></span>
                                </div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('high')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator orange'></span>
                                        <span>High</span>
                                    </span>
                                    <span className={priority === 'high' ? 'check' : ''}></span>
                                </div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('normal')}>
                                    <span className='priority-group'>    
                                        <span className='priority-indicator green'></span>
                                        <span>Medium</span>
                                    </span>
                                    <span className={priority === 'medium' ? 'check' : ''}></span>
                                </div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('low')}>
                                    <span className='priority-group'>    
                                        <span className='priority-indicator blue'></span>
                                        <span>Low</span>
                                    </span>
                                    <span className={priority === 'low' ? 'check' : ''}></span>
                                </div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('very-low')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator purple'></span>
                                        <span>Very Low</span>
                                    </span>
                                    <span className={priority === 'very-low' ? 'check' : ''}></span>
                                </div>
                            </div>}
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button data-cy='modal-add-save-button' className='save' disabled={(editItemListName === "") ? true : false} onClick={handleClickSaveButton}>Simpan</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default EditItemListModal