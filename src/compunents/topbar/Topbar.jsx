import React from 'react'
import "./topbar.css"
import {useDispatch, useSelector} from "react-redux"
import {logout } from '../../redux/userRedux'
import { Link } from 'react-router-dom'
import { resetProduct } from '../../redux/productRedux'

export default function Topbar() {
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(logout())
        dispatch(resetProduct())
    }
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Fuwa Admin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        Xin chào {user.username},
                        <Link to="/login" className='link'>
                            <span className='logout' onClick={handleClick}>Thoát</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
