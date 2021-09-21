import React,{useState,useEffect} from 'react'
import './TourManagement.css'
import * as khachhangApi from '../../api/KhachhangApi'
export default function NhanvienManagement() {
  const [open,setOpen] = useState(false)
  const [listKhachhang, setListKhachhang] = useState([])
  const [progress,setProgress] =useState(0)
  
  useEffect(async()=>{
    try {
      const data = await khachhangApi.getListKH()
      setListKhachhang(data)
    } catch (error) {
      console.log(error)
    }
  },[])
  const deleteKhachhang = async(username)=>{
      if(window.confirm('Do you want to delete customer : ' + username + ' ?')){
        try {
          const res = await khachhangApi.deleteKh(username)
          alert('Delete customer successfully !!!')
          const data = await khachhangApi.getListKH()
          setListKhachhang(data)
          
        } catch (error) {
          console.log(error)
          alert('Delete customer failed !!!')
        }
      }
  }
    return (
        <div className="tourmn">
            <div>
              <div className="tourmn__head">
              <p className="tourmn__title">
                  Customer List
              </p>
              
            </div>
            <div className="tourmn__table mt-2">
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Full name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone number</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Position</th>
                      <th scope="col">View More</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  {listKhachhang?.map(kh =>{
                      const gioitinh = ()=>{
                        if(kh?.gioitinh == 1)
                          return 'Male'
                        else if(kh?.gioitinh == 0)
                          return 'Female'
                        else
                          return 'Something else'
                      }
                      return(
                        <tr>
                          <td>{kh?.id}</td>
                          <td>{kh?.tenkh}</td>
                          <td>{kh?.taikhoan?.username}</td>
                          <td>{kh?.email}</td>
                          <td>{kh?.sdt}</td>
                          <td>{gioitinh()}</td>
                          <td>{kh?.chucvu}</td>
                          <td style={{width:'10rem'}}><button className ="btn btn-info" data-target={'#hongquan'+kh?.id} data-toggle="modal">View</button></td>
                          <td style={{width:'10rem'}}><button className ="btn btn-danger" onClick = {()=> deleteKhachhang(kh?.taikhoan?.username)}>Delete</button></td>
                          <div className="modal fade" id={'hongquan'+kh?.id} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                  <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title" id="exampleModalLabel">Employee Profile</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="row"> 
                                      <div className="col-4 text-center" style={{marginTop:'3rem'}}> 
                                        <img alt="pc" src={kh?.photo} className="rounded-circle w-50 mb-4 "  /><br/>
                                        <h5>{kh?.username}</h5>
                                      </div>
                                      <div className="col-8">
                                        <div className="table-responsive">
                                        <table className="table table-bordered">
                                          <tbody>
                                            <tr>
                                              <td>FullName</td>
                                              <td>{kh?.tenkh}</td>
                                            </tr>
                                            <tr>
                                              <td>Email</td>
                                              <td>{kh?.email}</td>
                                            </tr>
                                            <tr>
                                              <td>Phone number</td>
                                              <td>{kh?.sdt}</td>
                                            </tr>
                                            <tr>
                                              <td>Gender</td>
                                              <td>{gioitinh()}</td>
                                            </tr>
                                            <tr>
                                              <td>Address</td>
                                              <td>{kh?.diachi}</td>
                                            </tr>

                                          </tbody>
                                        </table>
                                        </div>
                                        
                                      </div>
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
            </div>
        </div>
    )
}
