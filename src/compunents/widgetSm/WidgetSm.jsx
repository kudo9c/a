import { Visibility } from '@material-ui/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { userRequest } from '../../requestMethod'
import "./widgetSm.css"

export default function WidgetSm() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUsers = async () => {
        try {
                const res = await userRequest.get("users/?new=true")
                setUsers(res.data)
        }
        catch (error) {
            console.log(error)
        }}
        getUsers()
    },[])
    return (
        <div className='widgetSm'>
            <span className="widgetSmTitle">Người dùng mới</span>
            <ul className="widgetSmList">
                {users.map((user) => (
                    <li className="widgetSmItem" key={user._id}>
                        <img src={user.img || "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"} alt="" className="widgetSmImg" />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <Link to={"/users/"+user._id} style={{textDecoration: "none",color: "inherit"}}>
                            <button className="widgetSmBtn">
                                <Visibility className="widgetSmIcon"/>
                                Xem
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
