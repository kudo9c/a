import React, { useEffect, useMemo, useState } from 'react'
import Chart from '../../compunents/chart/Chart'
import FeaturedInf from '../../compunents/featuredInfo/FeaturedInf'
import "./home.css"
import {userData} from "../../dummyData"
import WidgetSm from '../../compunents/widgetSm/WidgetSm'
import WidgetLg from '../../compunents/widgetLg/WidgetLg'
import { userRequest } from '../../requestMethod'
import Topbar from '../../compunents/topbar/Topbar'
import Sidebar from '../../compunents/sidebar/Sidebar'


export default function Home() {
    const [orderStats,setOrderStats] = useState([])
    const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],[]);
    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/orders/income")
                res.data.map(item => 
                    setOrderStats(prev=> [
                        ...prev,
                        {name:MONTHS[item._id - 1],"Doanh thu": item.total}
                    ])
                )
            } catch (error) {
                
            }
        }
        getStats()
    },[MONTHS])
    return ( 
        <div className='wrapper'>
            <Topbar/>
            <div className="container">
                <Sidebar/>
                <div className='home'>
                    <FeaturedInf/>
                    <Chart data={orderStats} title="Biểu đồ về doanh thu theo tháng" grid dataKey="Doanh thu"/>
                    <div className="homeWidgets">
                        <WidgetSm/>
                        <WidgetLg/>
                    </div>
                </div>
            </div>
        </div>
    )
}
