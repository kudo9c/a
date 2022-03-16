import React,{ useState } from 'react'
import "./productList.css"
import { DataGrid } from "@material-ui/data-grid";
import {  DeleteOutlined } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from 'react';
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import Topbar from '../../compunents/topbar/Topbar';
import Sidebar from '../../compunents/sidebar/Sidebar';

export default function ProductList() {
    const dispatch = useDispatch()
    const products = useSelector(state=>state.product.products)
    useEffect(() => {
        getProducts(dispatch)
    },[dispatch])
    const handleDelete = (id) => {
        deleteProduct(id, dispatch)
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        { field: 'product', headerName: 'Tên', width: 220, renderCell: (params) => {
            return (
                <div className='productListItem'>
                    <img className='productListImg' src={params.row.img} alt=''/>
                    {params.row.title}
                </div>
            )
        } },
        { field: 'inStock', headerName: 'Tình trạng', width: 200,renderCell: (params) => {
            return (
                <div className="productInStock" style={params.row.inStock ? {color:"black"} : {color:"red"}}>{params.row.inStock ? "Còn hàng" : "Hết hàng"}</div>
            )
        } },
        {
            field: 'price',
            headerName: 'Giá',
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="productPrice">{params.row.price}.000Đ</div>
                )
            } 
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params)=>{
                return (
                    <>
                        <Link to={"/products/"+params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlined className="productListDelete" onClick={() => handleDelete(params.row._id)}/>
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
                <div className='productList'>
                    <Link to="/newProduct">
                        <button className="productAddBtn">Tạo mới</button>
                    </Link>
                    <DataGrid className='table'
                        rows={products}
                        disableSelectionOnClick
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
