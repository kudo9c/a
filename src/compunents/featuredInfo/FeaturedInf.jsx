import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { userRequest } from '../../requestMethod'
import "./featuredInfo.css"
export default function FeaturedInf() {
    const [income, setIncome] = useState([])
    const [percent, setPercent] = useState(0)
    useEffect(() => {
        const getIncome = async() => {
            try {
                const res = await userRequest.get("orders/income")
                setIncome(res.data)
                res.data.sort((a,b) => a._id - b._id)
                setPercent((res.data[1]?.total *100)/ res.data[0]?.total - 100)
            } catch (error) {
                
            }
        }
        getIncome()
    },[])
    return (
        <div className='featured'>
            <div className="featuredItem">
                <span className="featuredTitle">Doanh thu</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{income[1]?.total}.000Đ</span>
                    <span className="featuredMoneyRate">{Math.floor(percent)}% 
                    {percent < 0 ? 
                    <ArrowDownward className='featuredIcon negative'/> :
                    <ArrowUpward className='featuredIcon'/>
                    }
                    </span>
                </div>
                <span className="featuredSub">So sánh với tháng trước</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Số người dùng mới</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">5.000.000Đ</span>
                    <span className="featuredMoneyRate">-1.4 <ArrowDownward className='featuredIcon negative'/></span>
                </div>
                <span className="featuredSub">So sánh với tháng trước</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">5.000.000Đ</span>
                    <span className="featuredMoneyRate">+11.4 <ArrowUpward className='featuredIcon'/></span>
                </div>
                <span className="featuredSub">So sánh với tháng trước</span>
            </div>
            
        </div>
    )
}
