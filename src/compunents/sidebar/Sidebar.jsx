import { AttachMoney, BarChart, LineStyle, PermIdentity, Storefront} from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import "./sidebar.css"

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <ul className="sidebarList">
                        <Link to="/" className='link'>
                            <li className="sidebarItem">
                                <LineStyle className='sidebarIcon'/>
                                Trang chủ
                            </li>
                        </Link>
                        <Link to="/users" className='link'>
                            <li className="sidebarItem">
                                <PermIdentity className='sidebarIcon'/>
                                Quản lý người dùng
                            </li>
                        </Link>
                        <Link to="/products" className='link'>
                            <li className="sidebarItem">
                                <Storefront className='sidebarIcon'/>
                                Quản lý sản phẩm
                            </li>
                        </Link>
                        <Link to="/transactions" className='link'>
                            <li className="sidebarItem">
                                <AttachMoney className='sidebarIcon'/>
                                Quản lý đơn hàng
                            </li>
                        </Link>
                        <Link to="/report"  className='link'>
                            <li className="sidebarItem">
                                <BarChart className="sidebarIcon" />
                                Báo cáo, thống kê
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
