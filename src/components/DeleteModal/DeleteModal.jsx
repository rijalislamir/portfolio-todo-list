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
                <div className='backdrop' onClick={onClose}>
                    {!isDelete
                        ? <div data-cy='modal-delete' className='modal activity-modal' onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <img src={CautionIcon} alt="" />
                            </div>
                            <div className="modal-body">
                                Apakah anda yakin menghapus {type} <br/><b>"{name}"?</b>
                            </div>
                            <div className="modal-footer">
                                <button data-cy='modal-delete-cancel-button' className='cancel' onClick={onClose}>Batal</button>
                                <button data-cy='modal-delete-confirm-button' className='delete' onClick={() => onDelete(id)}>Hapus</button>
                            </div>
                        </div>
                        : <div className='snackbar'>
                            <span className='alert'></span>
                            <p data-cy='modal-information'>{type[0].toUpperCase() + type.slice(1)} berhasil dihapus</p>
                        </div> 
                    }
                </div>
            }
        </>
    )
}

export default DeleteModal