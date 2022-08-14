import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ItemListEmptyStateSvg from '../../assets/img/todo-empty-state.svg'
import './ActivityDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { getActivity, updateActivitiy } from '../../features/activity/activitySlice'
import { deleteItemList, updateItemList } from '../../features/itemList/itemListSlice'
import AddItemListModal from '../AddItemListModal/AddItemListModal'
import EditItemListModal from '../EditItemListModal/EditItemListModal'
import DeleteModal from '../DeleteModal/DeleteModal'

const ActivityDetail = () => {
    const isActivityLoading = useSelector(state => state.activity.isLoading)
    const activeActivity = useSelector(state => state.activity.active)
    const itemList = activeActivity !== null ? [...activeActivity.todo_items] : []
    const dispatch = useDispatch()
    const location = useLocation()

    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSortOption, setShowSortOption] = useState(false)
    const [selectedItemList, setSelectedItemList] = useState({})
    const [sortType, setSortType] = useState("latest")
    const [title, setTitle] = useState('')
    const [editTitle, setEditTitle] = useState(false)

    const inputRef = useRef(null)
    const sortButtonRef = useRef(null)
    const sortOptionsRef = useRef(null)

    useEffect(() => {
        if (activeActivity !== null) setTitle(activeActivity.title)
    }, [activeActivity])

    useEffect(() => {
        if (activeActivity === null) dispatch(getActivity({ activityId: location.pathname.split('/').pop() }))
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideInput, true)
        document.addEventListener('click', handleClickOutsideSortButton, true)
        
        return () => {
            document.removeEventListener('click', handleClickOutsideInput, true)
            document.removeEventListener('click', handleClickOutsideSortButton, true)
        }
    }, [])

    const handleClickOutsideInput = e => {
        if (inputRef.current !== null && !inputRef.current.contains(e.target)) {
            toggleEdit()
            dispatch(updateActivitiy({ 
                activityId: location.pathname.split('/').pop(),
                title: inputRef.current.value
            }))
        }
    }

    const handleClickOutsideSortButton = e => {
        if (sortButtonRef.current !== null && !sortButtonRef.current.contains(e.target) && sortOptionsRef.current !== null && !sortOptionsRef.current.contains(e.target)) {
            setShowSortOption(false)
        }
    }

    const toggleEdit = () => {
        setEditTitle(prev => !prev)
    }

    const onChangeTitle = e => {
        setTitle(e.target.value)
    }

    const openDeleteModal = (title, id) => {
        setShowDeleteModal(true)
        setSelectedItemList({ title, id })
    }

    const onDeleteItemList = id => {
        dispatch(deleteItemList({ itemListId: id, activity_group_id: activeActivity.id }))
    }

    const comparator = (a, b) => {
        if (sortType === 'latest') return b.id - a.id
        if (sortType === 'oldest') return a.id - b.id
        if (sortType === 'a-z') {
            if (a.title < b.title) return -1
            if (a.title > b.title) return 1
            return 0
        }
        if (sortType === 'z-a') {
            if (a.title > b.title) return -1
            if (a.title < b.title) return 1
            return 0
        }
        if (sortType === 'not-done') {
            if (a.is_active && !b.is_active) return 1
            if (!a.is_active && b.is_active) return -1
        }
    }

    const openEditModal = (id, title, priority) => {
        setSelectedItemList({ id, title, priority })
        setShowEditModal(true)
    }

    const openSortOptions = e => {
        e.stopPropagation()
        setShowSortOption(prev => !prev)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
        dispatch(getActivity({ activityId: activeActivity.id }))
    }

    return (
        <main>
            {!isActivityLoading && <>
            <div className='activity-detail-header'>
                <div className='activity-title'>
                    <Link to="/"><span className='back'></span></Link>
                    {editTitle
                        ? <>
                            <input type="text" value={title} onChange={onChangeTitle} ref={inputRef} />
                        </>
                        : <>
                            <h1 className='activity-detail-name' onClick={toggleEdit}>{activeActivity.title}</h1>
                            <span className='edit' onClick={toggleEdit}></span>
                        </>
                    }
                </div>

                <div className='item-list-option'>
                    {itemList.length !== 0 && <span ref={sortButtonRef} className='sort' onClick={openSortOptions}></span>}
                    {showSortOption &&
                        <div className='sort-options' ref={sortOptionsRef}>
                            <div className="sort-option" onClick={() => setSortType('latest')}>
                                <div>
                                    <span className="latest"></span>
                                    <span>Terbaru</span>
                                </div>
                                {sortType === 'latest' && <span className='check'></span>}
                            </div>
                            <div className="sort-option" onClick={() => setSortType('oldest')}>
                                <div>
                                    <span className="oldest"></span>
                                    <span>Terlama</span>
                                </div>
                                {sortType === 'oldest' && <span className='check'></span>}
                            </div>
                            <div className="sort-option" onClick={() => setSortType('a-z')}>
                                <div>
                                    <span className="a-z"></span>
                                    <span>A-Z</span>
                                </div>
                                {sortType === 'a-z' && <span className='check'></span>}
                            </div>
                            <div className="sort-option" onClick={() => setSortType('z-a')}>
                                <div>
                                    <span className="z-a"></span>
                                    <span>Z-A</span>
                                </div>
                                {sortType === 'z-a' && <span className='check'></span>}
                            </div>
                            <div className="sort-option" onClick={() => setSortType('not-done')}>
                                <div>
                                    <span className="not-done"></span>
                                    <span>Belum Selesai</span>
                                </div>
                                {sortType === 'not-done' && <span className='check'></span>}
                            </div>
                        </div>
                    }
                    <button onClick={() => setShowAddModal(true)}><span className='plus'></span> Tambah</button>
                </div>
            </div>

            <div className='item-list-container'>
                {itemList.length
                    ? itemList.sort(comparator).map((item, i) => <div key={i} className='item-list'>
                        <div className='item-list-edit'>
                            <input type="checkbox" className='done' checked={item.is_active ? true : false} onChange={() => dispatch(updateItemList({ itemListId: item.id, activityId: item.activity_group_id, is_active: !item.is_active }))}/>
                            <span className={'priority-indicator ' + item.priority}></span>
                            <h1 className={item.is_active ? 'line-through' : ''}>{item.title}</h1>
                            <span className="edit" onClick={() => openEditModal(item.id, item.title, item.priority)}></span>
                        </div>
                        <span className="trash" onClick={() => openDeleteModal(item.title, item.id)}></span>
                    </div>)
                    : <div className='item-list-empty-state'>
                        <img src={ItemListEmptyStateSvg} onClick={() => setShowAddModal(true)} alt="Item List Empty" />
                    </div>
                }
            </div>

            <AddItemListModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                activityId={activeActivity.id}
            />

            <EditItemListModal 
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                itemListId={selectedItemList.id}
                prevTitle={selectedItemList.title}
                prevPriority={selectedItemList.priority}
            />

            <DeleteModal
                show={showDeleteModal}
                closeDeleteModal={handleCloseDeleteModal}
                id={selectedItemList.id}
                type={'list item'}
                name={selectedItemList.title}
                deleteFunction={onDeleteItemList}
            />
            </>}
        </main>
    )
}

export default ActivityDetail