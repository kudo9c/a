import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../compunents/sidebar/Sidebar'
import Topbar from '../../compunents/topbar/Topbar'
import "./newuser.css"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase"
import { addUser } from '../../redux/apiCalls'

export default function NewUser() {
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const error = useSelector(state => state.user.error)
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }
    const handleClick = (e) => {
            const user = {...inputs}
            addUser(user,dispatch)
            if(!error) {
                setInputs({})
            }
    }
    return (
        <div className="wrapper">
            <Topbar/>
            <div className="container">
                <Sidebar/>
                <div className='newuser'>
                    <h1 className="newuserTitle">Người dùng mới</h1>
                    <form onSubmit={handleClick} action="" className="newuserForm">
                        <div className="newUserItem">
                            <label >Username</label>
                            <input type="text" name='username' required placeholder='truong' onChange={handleChange}></input>
                        </div>
                        <div className="newUserItem">
                            <label >Họ tên</label>
                            <input type="text" name='fullname' required placeholder='Trường Trần' onChange={handleChange}></input>
                        </div>
                        <div className="newUserItem">
                            <label >Email</label>
                            <input type="text" name="email" required placeholder='kudo9c88@gmail.com' onChange={handleChange}></input>
                        </div>
                        <div className="newUserItem">
                            <label >Password</label>
                            <input type="password" name="password" required placeholder='password' onChange={handleChange}></input>
                        </div>
                        <button type='submit' className="newUserBtn">Tạo</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
