import React,{useEffect, useContext, useState} from 'react'
import { UserContext } from '../../context/UserContext'
import * as tourApi from '../../api/TourApi'
export default function ListTourOrder() {
    const [state,setState] = useContext(UserContext)
    const [listT, setListT] = useState([])
    useEffect(async()=>{
        if(state?.user == null)
            window.location.replace('/')
        try {
            const res = await tourApi.getListDatourByUser()
            console.log(res)
            setListT(res)
        } catch (error) {
            console.log(error)
        }
    },[state])
    return (
        <div className="container">
            <div className="table-responsive">
            <table className="table" style={{marginTop:'4rem'}}>
              <thead>
                <tr className="bg-info text-white">
                  <th scope="col">Mã tour</th>
                  <th scope="col">Tên tour</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Người đặt</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Danh sách tham gia</th>
                </tr>
              </thead>
              <tbody>
                {listT?.map(t =>{
                    return(
                        <tr>
                            <td>{t?.matour}</td>
                            <td>{t?.tentour}</td>
                            <td>{t?.soluong}</td>
                            <td>{t?.nguoidat}</td>
                            <td>{t?.tongtien} $</td>
                            <td><button className="btn btn-info" data-toggle="modal" data-target="#exampleModal">Xem</button></td>
                            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header bg-info text-white">
                                      <h5 className="modal-title" id="exampleModalLabel">Danh sách người tham gia</h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="table-responsive">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">CMND/CCCD</th>
                                            <th scope="col">Tên khách hàng</th>
                                            <th scope="col">Số điện thoại</th>
                                            <th scope="col">Địa chỉ</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Giới tính</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {t?.listKH?.map(kh =>{
                                              return (
                                                <tr>
                                                    <td>{kh?.cmnd}</td>
                                                    <td>{kh?.tenkh}</td>
                                                    <td>{kh?.sdt}</td>
                                                    <td>{kh?.diachi}</td>
                                                    <td>{kh?.email}</td>
                                                    <td>{kh?.giotinh == 1 ? 'Nam' : 'Nữ'}</td>
                                              </tr>
                                              )
                                          })}
                                        </tbody>
                                      </table>
                                      </div>
                                      
                            
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                        </tr>
                    )
                })}
              </tbody>
            </table>
            </div>
            
        </div>
    )
}
