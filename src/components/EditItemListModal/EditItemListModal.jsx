import React, { useState, useEffect } from 'react'
import './EditItemListModal.css'
import { useDispatch } from 'react-redux/es/exports'
import { updateItemList } from '../../features/itemList/itemListSlice'

const EditItemListModal = props => {
    const {
        show,
        onClose,
        itemListId,
        prevName,
        prevPriority,
        prevPriorityIndicator
    } = props

    const dispatch = useDispatch()

    const [showPriorityOptions, setShowPriorityOptions] = useState(false)
    const [editItemListName, setEditItemListName] = useState("")
    const [priority, setPriority] = useState("Very High")
    const [priorityIndicator, setPriorityIndicator] = useState("red")

    useEffect(() => { setEditItemListName(prevName) }, [prevName])
    useEffect(() => { setPriority(prevPriority) }, [prevPriority])
    useEffect(() => { setPriorityIndicator(prevPriorityIndicator) }, [prevPriorityIndicator])

    const handleClose = () => {
        setEditItemListName(prevName)
        setPriority(prevPriority)
        setPriorityIndicator(prevPriorityIndicator)
        setShowPriorityOptions(false)
        onClose()
    }

    const handleOnchange = e => {
        setEditItemListName(e.target.value)
    }

    const handleClickPriorityOption = option => {
        if (option === "Very High") setPriorityIndicator("red")
        else if (option === "High") setPriorityIndicator("orange")
        else if (option === "Medium") setPriorityIndicator("green")
        else if (option === "Low") setPriorityIndicator("blue")
        else if (option === "Very Low") setPriorityIndicator("purple")
        setPriority(option)
        setShowPriorityOptions(false)
    }

    const handleClickSaveButton = () => {
        dispatch(updateItemList({ id: itemListId, name: editItemListName, priority, priorityIndicator }))
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
            <div className='backdrop' onClick={handleClose}>
                <div className="modal edit-item-list-modal" onClick={handleClickModal}>
                    <div className="modal-header">
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
                        <button className='save' disabled={(editItemListName === "") ? true : false} onClick={handleClickSaveButton}>Simpan</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default EditItemListModal