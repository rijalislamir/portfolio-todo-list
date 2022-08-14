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

    return (
        <>
            {show &&
             <div className="backdrop" onClick={handleClose}>
                <div className="modal item-list-modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <span>Tambah List Item</span>
                        <span className='exit' onClick={handleClose}></span>
                    </div>

                    <div className="modal-body">
                        <label htmlFor="item-list-name">NAMA LIST ITEM</label>
                        <input type="text" id="item-list-name" placeholder='Tambahkan nama list item' onChange={handleOnchangeItemListName} autoComplete='off' />
                        
                        <label>PRIORITY</label>
                        <div className="priority-container">
                            <div className={showPriorityOptions ? 'priority priority-open' : 'priority'} onClick={() => setShowPriorityOptions(prev => !prev)}>
                                {showPriorityOptions
                                    ? <><span>Pilih priority</span><span className='chevron-up'></span></>
                                    : <>
                                        
                                        <span className='selected-priority'><span className={'priority-indicator ' + priorityIndicator}></span><span>{priority}</span></span>
                                        <span className='chevron-down'></span>
                                    </>
                                }
                            </div>

                            {showPriorityOptions &&
                            <div className="priority-options" >
                                <div className="priority-option" onClick={() => handleClickPriorityOption('Very High')}><span className='priority-indicator red'></span>Very High</div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('High')}><span className='priority-indicator orange'></span>High</div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('Medium')}><span className='priority-indicator green'></span>Medium</div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('Low')}><span className='priority-indicator blue'></span>Low</div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('Very Low')}><span className='priority-indicator purple'></span>Very Low</div>
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