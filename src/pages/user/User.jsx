import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from '../../compunents/sidebar/Sidebar'
import Topbar from '../../compunents/topbar/Topbar'
import "./user.css"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from '../../firebase'
import { updateUser } from '../../redux/apiCalls'

export default function User() {
    const location = useLocation()
    const dispatch = useDispatch()
    const userID = location.pathname.split("/")[2]
    const user = useSelector(state => state.user.userList.find(user => user._id === userID))
    const [inputs, setInputs] = useState(user)
    const [file, setFile] = useState(user.img || null)
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }
    const handleClick = (e) => {
        e.preventDefault()
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);
             // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                    console.log("Upload is paused");
                    break;
                    case "running":
                    console.log("Upload is running");
                    break;
                    default:
                }
            },
            (error) => {
            // Handle unsuccessful uploads
            },
            () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const user = { ...inputs, img: downloadURL};
                updateUser(user._id,user,dispatch)
            });
            }
            );
    }
    console.log(file)
    return (
        <div className="wrapper">
            <Topbar/>
            <div className="container">
                <Sidebar/>
                <div className='user'>
                    <div className="userTitleContainer">
                        <h1 className="userTitle">Chỉnh sửa thông tin người dùng {user.username}</h1>  
                    </div>
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img src={user.img || "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"} alt="" className="userShowImg" />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">{inputs.username}</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Thông tin liên lạc</span>
                                <div className="userShowInfo">
                                    <PhoneAndroid className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{inputs.tel}</span>
                                </div>
                                <div className="userShowInfo">
                                    <MailOutline className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{inputs.email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <LocationSearching className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{inputs.address}</span>
                                </div>
                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Sửa</span>
                            <form action="" className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label >Username</label>
                                        <input type="text" value={inputs.username} disabled className='userUpdateInput'/>
                                    </div>
                                    <div className="userUpdateItem">
                                        <label >Họ tên</label>
                                        <input type="text" value={inputs.fullname} name="fullname" onChange={handleChange} className='userUpdateInput'/>
                                    </div>
                                    <div className="userUpdateItem">
                                        <label >Email</label>
                                        <input type="text" name='email' value={inputs.email} className='userUpdateInput' onChange={handleChange}/>
                                    </div>
                                    <div className="userUpdateItem">
                                        <label >Điện thoại</label>
                                        <input type="text" name='tel' value={inputs.tel} className='userUpdateInput' onChange={handleChange}/>
                                    </div>
                                    <div className="userUpdateItem">
                                        <label >Địa chỉ</label>
                                        <input type="text" value={inputs.address} name="address" className='userUpdateInput' onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img src={user.img || "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"} alt="" className="userUpdateImg" />
                                        <input type="file" name="file" id="file" style={{display:"none"}} onChange={e => setFile(e.target.files[0])}/>
                                        <label for='file'><Publish className='userUpdateIcon'/></label>
                                    </div>
                                    <button className="userUpdateButton" onClick={handleClick}>Cập nhật</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
