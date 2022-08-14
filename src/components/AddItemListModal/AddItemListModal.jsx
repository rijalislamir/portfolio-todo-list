import React, { useState } from 'react'
import './AddItemListModal.css'
import { addItemList } from '../../features/itemList/itemListSlice'
import { useSelector, useDispatch } from 'react-redux'

const AddItemListModal = props => {
    const {
        show,
        onClose,
        activityId,
    } = props

    const dispatch = useDispatch()

    const [showPriorityOptions, setShowPriorityOptions] = useState(false)
    const [itemListName, setItemListName] = useState("")
    const [priority, setPriority] = useState("Very High")
    const [priorityIndicator, setPriorityIndicator] = useState("red")

    const handleClickPriorityOption = option => {
        if (option === "Very High") setPriorityIndicator("red")
        else if (option === "High") setPriorityIndicator("orange")
        else if (option === "Medium") setPriorityIndicator("green")
        else if (option === "Low") setPriorityIndicator("blue")
        else if (option === "Very Low") setPriorityIndicator("purple")
        setPriority(option)
        setShowPriorityOptions(false)
    }

    const handleClose = () => {
        setShowPriorityOptions(false)
        setPriority("Very High")
        setPriorityIndicator("red")
        onClose()
    }

    const handleOnchangeItemListName = e => {
        setItemListName(e.target.value)
    }

    const handleClickSaveButton = () => {
        dispatch(addItemList({ activityId, name: itemListName, priority, priorityIndicator }))
        setPriority("Very High")
        setPriorityIndicator("red")
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

    return (
        <>
            {show &&
            <div className="backdrop" onClick={handleClose}>
                <div className="modal add-item-list-modal" onClick={handleClickModal}>
                    <div className="modal-header">
                        <span>Tambah List Item</span>
                        <span className='exit' onClick={handleClose}></span>
                    </div>

                    <div className="modal-body">
                        <label htmlFor="add-item-list-name">NAMA LIST ITEM</label>
                        <input type="text" id="add-item-list-name" className="item-list-name" placeholder='Tambahkan nama list item' onChange={handleOnchangeItemListName} autoComplete='off' />
                        
                        <label>PRIORITY</label>
                        <div className="priority-container">
                            <div className={showPriorityOptions ? 'priority priority-open' : 'priority'} onClick={openPriorityOptions}>
                                {showPriorityOptions
                                    ? <><span>Pilih priority</span><span className='chevron-up'></span></>
                                    : <>
                                        <span className='priority-group'><span className={'priority-indicator ' + priorityIndicator}></span><span>{priority}</span></span>
                                        <span className='chevron-down'></span>
                                    </>
                                }
                            </div>

                            {showPriorityOptions &&
                            <div className="priority-options" >
                                <div className="priority-option" onClick={() => handleClickPriorityOption('Very High')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator red'></span>
                                        <span>Very High</span>
                                    </span>
                                    <span className={priority === 'Very High' ? 'check' : ''}></span>
                                </div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('High')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator orange'></span>
                                        <span>High</span>
                                    </span>
                                    <span className={priority === 'High' ? 'check' : ''}></span>
                                </div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('Medium')}>
                                    <span className='priority-group'>    
                                        <span className='priority-indicator green'></span>
                                        <span>Medium</span>
                                    </span>
                                    <span className={priority === 'Medium' ? 'check' : ''}></span>
                                </div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('Low')}>
                                    <span className='priority-group'>    
                                        <span className='priority-indicator blue'></span>
                                        <span>Low</span>
                                    </span>
                                    <span className={priority === 'Low' ? 'check' : ''}></span>
                                </div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('Very Low')}>
                                    <span className='priority-group'>
                                        <span className='priority-indicator purple'></span>
                                        <span>Very Low</span>
                                    </span>
                                    <span className={priority === 'Very Low' ? 'check' : ''}></span>
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className='save' disabled={(itemListName === "") ? true : false} onClick={handleClickSaveButton}>Simpan</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default AddItemListModal