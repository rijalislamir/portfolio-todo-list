import React, { useState } from 'react'
import './DeleteModal.css'
import CautionIcon from '/src/assets/img/caution.svg'
import { useDispatch } from 'react-redux'

const DeleteModal = props => {
    const {
        show,
        closeDeleteModal,
        id,
        type,
        name,
        deleteFunction
    } = props

    const dispatch = useDispatch()

    const [isDelete, setIsDelete] = useState(false)

    const onDelete = id => {
        deleteFunction(id)
        setIsDelete(true)
    }
    
    const onClose = () => {
        setIsDelete(false)
        closeDeleteModal()
    }

    return (
        <>
            {show &&
                <div data-cy='activity-item-delete-button' className='backdrop' onClick={onClose}>
                    {!isDelete
                        ? <div className='modal activity-modal' onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <img src={CautionIcon} alt="" />
                            </div>
                            <div className="modal-body">
                                Apakah anda yakin menghapus {type} <br/><b>"{name}"?</b>
                            </div>
                            <div className="modal-footer">
                                <button data-cy='modal-delete-cancel-button' className='cancel' onClick={onClose}>Batal</button>
                                <button className='delete' onClick={() => onDelete(id)} data-cy='activity-item-delete-button modal-delete-confirm-button'>Hapus</button>
                            </div>
                        </div>
                        : <div className='snackbar' data-cy='modal-information'>
                            <span className='alert'></span>
                            <p>{type[0].toUpperCase() + type.slice(1)} berhasil dihapus</p>
                        </div> 
                    }
                </div>
            }
        </>
    )
}

export default DeleteModal