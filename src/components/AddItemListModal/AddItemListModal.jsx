import React, { useState } from 'react'
import './AddItemListModal.css'

const AddItemListModal = props => {
    const {
        show,
        onClose
    } = props

    const [showPriorityOptions, setShowPriorityOptions] = useState(false)
    const [listItemName, setListItemName] = useState("")

    const handleClickPriorityOption = priority => {
        console.log(priority)
    }

    const handleClose = () => {
        setShowPriorityOptions(false)
        onClose()
    }

    const handleOnchangeListItemName = e => {
        setListItemName(e.target.value)
    }

    return (
        <>
            {show &&
             <div className="backdrop" onClick={handleClose}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <span>Tambah List Item</span>
                        <span className='exit' onClick={handleClose}></span>
                    </div>

                    <div className="modal-body">
                        <label htmlFor="list-item-name">NAMA LIST ITEM</label>
                        <input type="text" id="list-item-name" placeholder='Tambahkan nama list item' onChange={handleOnchangeListItemName}/>
                        
                        <label>PRIORITY</label>
                        <div className="priority-container">
                            <div className={showPriorityOptions ? 'priority priority-open' : 'priority'} onClick={() => setShowPriorityOptions(prev => !prev)}>
                                {showPriorityOptions
                                    ? <><span>Pilih priority</span><span className='chevron-up'></span></>
                                    : <><span>Priority</span><span className='chevron-down'></span></>}
                            </div>

                            {showPriorityOptions &&
                            <div className="priority-options" >
                                <div className="priority-option" onClick={() => handleClickPriorityOption('very-high')}><span className='priority-indicator red'></span>Very High</div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('high')}><span className='priority-indicator orange'></span>High</div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('medium')}><span className='priority-indicator green'></span>Medium</div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('low')}><span className='priority-indicator blue'></span>Low</div>
                                <div className="priority-option" onClick={() => handleClickPriorityOption('very-low')}><span className='priority-indicator purple'></span>Very Low</div>
                            </div>}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className='save' disabled={(listItemName === "") ? true : false}>Simpan</button>
                    </div>
                </div>
             </div>
            }
        </>
    )
}

export default AddItemListModal