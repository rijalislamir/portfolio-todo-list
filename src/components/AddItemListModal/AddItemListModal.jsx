import React, { useState } from 'react'
import './AddItemListModal.css'
// import { addItemList } from '../../features/itemList/itemListSlice'
import { useSelector, useDispatch } from 'react-redux'
import { createItemList } from '../../features/itemList/itemListSlice'

const AddItemListModal = props => {
    const {
        show,
        onClose,
        activityId,
    } = props

    const dispatch = useDispatch()

    const [showPriorityOptions, setShowPriorityOptions] = useState(false)
    const [itemListName, setItemListName] = useState("")
    const [priority, setPriority] = useState("very-high")
    const [priorityIndicator, setPriorityIndicator] = useState("very-high")

    const handleClickPriorityOption = option => {
        setPriorityIndicator(priority)
        setPriority(option)
        setShowPriorityOptions(false)
    }

    const handleClose = () => {
        setShowPriorityOptions(false)
        setPriority("very-high")
        setPriorityIndicator("very-high")
        onClose()
    }

    const handleOnchangeItemListName = e => {
        setItemListName(e.target.value)
    }

    const handleClickSaveButton = () => {
        dispatch(createItemList({ activity_group_id: activityId, title: itemListName, is_active: true, priority: priority === 'medium' ? 'normal' : priority }))
        setPriority("very-high")
        setPriorityIndicator("very-high")
        setItemListName("")
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
            {show &&
            <div className="backdrop" onClick={handleClose}>
                <div data-cy='modal-add' className="modal add-item-list-modal" onClick={handleClickModal}>
                    <div className="modal-header">
                        <span data-cy='modal-add-title'>Tambah List Item</span>
                        <span data-cy='modal-add-close-button' className='exit' onClick={handleClose}></span>
                    </div>

                    <div className="modal-body">
                        <label data-cy='modal-add-name-title' htmlFor="add-item-list-name">NAMA LIST ITEM</label>
                        <input data-cy='modal-add-name-input' type="text" id="add-item-list-name" className="item-list-name" placeholder='Tambahkan nama list item' onChange={handleOnchangeItemListName} autoComplete='off' />
                        
                        <label data-cy='modal-add-priority-title'>PRIORITY</label>
                        <div className="priority-container">
                            <div data-cy='modal-add-priority-dropdown' className={showPriorityOptions ? 'priority priority-open' : 'priority'} onClick={openPriorityOptions}>
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
                                <div data-cy='modal-add-priority-item' className="priority-option" onClick={() => handleClickPriorityOption('very-high')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator very-high'></span>
                                        <span>Very High</span>
                                    </span>
                                    <span className={priority === 'very-high' ? 'check' : ''}></span>
                                </div>
                                <div data-cy='modal-add-priority-item' className="priority-option" onClick={() => handleClickPriorityOption('high')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator high'></span>
                                        <span>High</span>
                                    </span>
                                    <span className={priority === 'high' ? 'check' : ''}></span>
                                </div>
                                <div data-cy='modal-add-priority-item' className="priority-option" onClick={() => handleClickPriorityOption('normal')}>
                                    <span className='priority-group'>    
                                        <span className='priority-indicator normal'></span>
                                        <span>Medium</span>
                                    </span>
                                    <span className={priority === 'normal' ? 'check' : ''}></span>
                                </div>
                                <div data-cy='modal-add-priority-item' className="priority-option" onClick={() => handleClickPriorityOption('low')}>
                                    <span className='priority-group'>    
                                        <span className='priority-indicator low'></span>
                                        <span>Low</span>
                                    </span>
                                    <span className={priority === 'low' ? 'check' : ''}></span>
                                </div>
                                <div data-cy='modal-add-priority-item' className="priority-option" onClick={() => handleClickPriorityOption('very-low')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator very-low'></span>
                                        <span>Very low</span>
                                    </span>
                                    <span className={priority === 'very-low' ? 'check' : ''}></span>
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button data-cy='modal-add-save-button' className='save' disabled={(itemListName === "") ? true : false} onClick={handleClickSaveButton}>Simpan</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default AddItemListModal