import { DataGrid } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'
import "./report.css"
import { productamountRows } from '../../dummyData'
import Topbar from '../../compunents/topbar/Topbar'
import Sidebar from '../../compunents/sidebar/Sidebar'
import { userRequest } from '../../requestMethod'
import { getIncome } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

export const Report = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getIncome(dispatch)
    },[dispatch])
    const income = useSelector(state => state.order.income)
    const columnLeft = [
        { field: '_id', headerName: 'Tháng', width: 150 },
        { field: 'total', headerName: 'Doanh thu', width: 150 },
    ]
    const columnRight = [
        { field: 'product', headerName: 'Sản phẩm', width: 250 , renderCell: (params) => {
            return (
                <div className='reportListItem'>
                    <img className='reportListImg' src={params.row.img} alt=''/>
                    {params.row.title}
                </div>
            )
        }},
        { field: 'amount', headerName: 'Số lượng', width: 200},
    ]
    return (
        <div className="wrapper">
            <Topbar/>
            <div className="container">
                <Sidebar/>
                <div className='report'>
                    <div className="reportLeft">
                        <span className="">Thống kê doanh thu</span>
                        <DataGrid
                            rows={income}
                            columns={columnLeft}
                            style={{marginTop: 10}}
                            getRowId={(row) => row._id}
                            pageSize={12}
                            rowsPerPageOptions={[12]}
                            checkboxSelection
                        />
                    </div>
                    <div className="reportRight">
                    <span className="">Sản phẩm bán chạy</span>
                    <DataGrid
                            rows={productamountRows}
                            columns={columnRight}
                            style={{marginTop: 10}}
                            getRowId={(row) => row.title}
                            pageSize={12}
                            rowsPerPageOptions={[12]}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
