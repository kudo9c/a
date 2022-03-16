import { DeleteOutlined, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./transList.css"
import { DataGrid } from "@material-ui/data-grid";
import { transRows } from '../../dummyData';
import { userRequest } from '../../requestMethod';
import Topbar from '../../compunents/topbar/Topbar';
import Sidebar from '../../compunents/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getOrders } from '../../redux/apiCalls';

export const TransList = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state=>state.order.orders)
    useEffect(() => {
        getOrders(dispatch)
    },[dispatch])
    const handleDelete = (id) => {
        deleteOrder(id, dispatch)
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'createdAt', headerName: 'Ngày bán', width: 200 },
        { field: 'name', headerName: 'Khách hàng', width: 200 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 160,
            renderCell:(params)=>{
                let color = "black"
                switch(params.row.status) {
                    case "Hoàn thành": 
                        color = "#00acc1"
                        break;
                    case "Đang chuyển":
                        color = "#1b5e20"
                        break;
                    case "Bị hủy": 
                        color = "#d50000"
                        break;
                    case "Chờ xác nhận": 
                        color = "#bf360c"
                        break;
                }
                return (
                    <span style={{color}}>{params.row.status}</span>
                )
            }
        },
        {field: "total", headerName: "Tổng tiền", width: 200},
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params)=>{
                return (
                    <>
                        <Link to={"/transaction/"+params.row._id}>
                            <button className="transListEdit">Edit</button>
                        </Link>
                        <DeleteOutlined className="transListDelete" onClick={() => handleDelete(params.row._id)}/>
                    </>
                    
                )
            }
        }
    ];
    const [data, setData] = useState(transRows)
    return (
        <div className="wrapper">
            <Topbar/>
            <div className="container">
                <Sidebar/>
                <div className='transList'>
                    <SearchOutlined className='searchIcon'/><input placeholder='Tìm kiếm' className='SearchInput'/>
                    <DataGrid
                            rows={orders}
                            columns={columns}
                            getRowId={(row) => row._id}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                    />
                </div>
            </div>
        </div>
    )
}
