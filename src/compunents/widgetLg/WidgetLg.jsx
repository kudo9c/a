import { Visibility } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { userRequest } from '../../requestMethod'
import "./widgetLg.css"
import {format} from "timeago.js"

export default function WidgetLg() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
        try {
                const res = await userRequest.get("orders/?new=true")
                setOrders(res.data)
        }
        catch (error) {
            console.log(error)
        }}
        getOrders()
    },[])
    const Button = ({type}) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    }
    return (
        <div className='widgetLg'>
            <h3 className="widgetLgTitle">Đơn hàng gần đây</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Khách hàng</th>
                    <th className="widgetLgTh">Thời gian</th>
                    <th className="widgetLgTh">Tổng tiền</th>
                    <th className="widgetLgTh">Trạng thái</th>
                    
                </tr>
                {orders.map(order => (
                    <tr className="widgetLgTr" key={order._id}>
                        <td className="widgetLgUser">
                            {order.name}
                        </td>
                        <td className="widgetLgDate">{format(order.createdAt)}</td>
                        <td className="widgetLgAmount">{order.total}.000Đ</td>
                        <td className="widgetLgStatus">
                            <Button type={order.status}/>
                        </td>
                        <td>
                            <button className="widgetLgBtn">
                                <Visibility className="widgetLgIcon"/>
                                Xem
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
