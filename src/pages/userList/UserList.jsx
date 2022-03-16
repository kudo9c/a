import React, { useEffect, useState } from 'react'
import "./userList.css"
import { DataGrid } from "@material-ui/data-grid";
import {  DeleteOutlined } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import {Link } from 'react-router-dom';
import Topbar from '../../compunents/topbar/Topbar';
import Sidebar from '../../compunents/sidebar/Sidebar';
import { userRequest } from '../../requestMethod'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/apiCalls';

export default function UserList() {
    const dispatch = useDispatch()
    useEffect(() => {
        getUsers(dispatch)
    },[dispatch])
    const users = useSelector(state=>state.user.userList)
    const handleDelete = (id) => {
        deleteUser(id,dispatch)
    }
    const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'Người dùng', width: 200, renderCell: (params) => {
        return (
            <div className='userListUser'>
                <img className='userListImg' src={params.row.img || "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"} alt=''/>
                {params.row.username}
            </div>
        )
    } },
    { field: 'email', headerName: 'Email', width: 200 },
    {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params)=>{
            return (
                <>
                    <Link to={"/users/"+params.row._id}>
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutlined className="userListDelete" onClick={() => handleDelete(params.row._id)}/>
                </>
                
            )
        }
    }
    ];
    return (
        <div className="wrapper">
            <Topbar/>
            <div className="container">
                <Sidebar/>
                <div className='userList'>
                    <Link to="/newUser">
                        <button className="userAddBtn2">Tạo mới</button>
                    </Link>
                        
                    <DataGrid
                        rows={users}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={10}
                        getRowId={(row) => row._id}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                    {/* <Routes>
                        <Route path=":id" element={<User/>} />
                    </Routes> */}
                </div>
            </div>
        </div>
    )
}
