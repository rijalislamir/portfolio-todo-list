import React, { useState } from 'react'
import './DeleteModal.css'
import CautionIcon from '/src/assets/img/caution.svg'

const DeleteModal = props => {
    const {
        show,
        closeDeleteModal,
        type,
        activity,
        deleteActivity
    } = props

    const [isDelete, setIsDelete] = useState(false)

    const onDelete = index => {
        deleteActivity(index)
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
                        ? <div className='modal' onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <img src={CautionIcon} alt="" />
                            </div>
                            <div className="modal-body">
                                Apakah anda yakin menghapus {type} <br/><b>"{activity.name}"?</b>
                            </div>
                            <div className="modal-footer">
                                <button className='cancel' onClick={onClose}>Batal</button>
                                <button className='delete' onClick={() => onDelete(activity.index)}>Hapus</button>
                            </div>
                        </div>
                        : <div className='snackbar'>
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