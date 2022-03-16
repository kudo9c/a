import React from 'react'
import Sidebar from '../../compunents/sidebar/Sidebar'
import Topbar from '../../compunents/topbar/Topbar'
import "./transaction.css"

export const Transaction = () => {
  return (
    <div className="wrapper">
      <Topbar/>
      <div className="container">
        <Sidebar/>
        <div className='transaction'>
          <div className="transTitleContainer">
            <h1 className="transTitle">Chi tiết đơn hàng ID:1</h1>
            <button className="transSaveBtn">Lưu</button>
          </div>
          <div className="transWrapper">
            <div className="transLeft">
              <form action="" className="transForm">
                <label htmlFor="" >Tên khách hàng</label>
                  <input type="text" value="Trường Trần" className='input'/>
                  <label htmlFor="">Điện thoại</label>
                  <input type="text" value="0837202029" className='input'/>
                  <label htmlFor="">Email</label>
                  <input type="text" value="kudo9c88@gmail.com" className='input'/>
                  <label htmlFor="">Địa chỉ </label>
                  <input type="text" value="63 ngõ 66 Ngọc Lâm, Long Biên, HN" className='input'/>
                  <label htmlFor="">Trạng thái</label>
                  <select name="status" id="status" value="done" className='input'>
                      <option value="pending" className='input'>Chờ xác nhận</option>
                      <option value="delivering" className='input'>Đang chuyển</option>
                      <option value="done" className='input'>Hoàn thành</option>
                      <option value="cancel" className='input'>Bị hủy</option>
                  </select>
              </form>
            </div>
            <div className="transRight">
                <span>Chi tiết đơn hàng</span>
                <div className="transItemWrapper">
                  <div className="transItemLeft">
                    <img src="/img/beanie_2.png" alt="" className="transItemImg"/>
                    <div className="transInfoWrapper">
                      <span className="transItemInfo">Mũ len hình hoa cúc</span>
                      <span className="transItemInfo">Combo: 1</span>
                    </div>
                  </div>
                  <div className="transItemRight">
                    <span className="transItemInfo">Số lượng: 4</span>
                    <span className="transItemInfo">Giá: 29.000Đ</span>
                  </div>
                </div>
                <div className="transItemWrapper">
                  <div className="transItemLeft">
                    <img src="/img/sock_2.jpg" alt="" className="transItemImg"/>
                    <div className="transInfoWrapper">
                      <span className="transItemInfo">Tất T02</span>
                      <span className="transItemInfo">Combo: 1</span>
                    </div>
                  </div>
                  <div className="transItemRight">
                    <span className="transItemInfo">Số lượng: 2</span>
                    <span className="transItemInfo">Giá: 15.000Đ</span>
                  </div>
                </div>
                <div className="transItemWrapper">
                  <div className="transItemLeft">
                    <img src="/img/beanie_3.png" alt="" className="transItemImg"/>
                    <div className="transInfoWrapper">
                      <span className="transItemInfo">Mũ len hình mặt cười</span>
                      <span className="transItemInfo">Combo: 1</span>
                    </div>
                  </div>
                  <div className="transItemRight">
                    <span className="transItemInfo">Số lượng: 2</span>
                    <span className="transItemInfo">Giá: 49.000Đ</span>
                  </div>
                </div>
                <div className="transItemRight">
                    <span className="transItemTotal">Tổng: 244.000Đ</span>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
