import React from 'react'
import './DeleteModal.css'
import CautionIcon from '/src/assets/img/caution.svg'

const DeleteModal = props => {
    const {
        show,
        onClose,
        type,
        activity,
        onDelete
    } = props

    return (
        <>
            {show &&
                <div className='backdrop' onClick={onClose}>
                    <div className='modal'>
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
                </div>
            }
        </>
    )
}

export default DeleteModal