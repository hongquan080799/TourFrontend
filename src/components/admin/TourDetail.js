import React,{useState,useEffect} from 'react'
import './TourDetail.css'
import * as tourApi from '../../api/TourApi'
import { useParams } from 'react-router-dom'
export default function TourDetail({matuyen}) {
    const [open,setOpen] = useState(false)
    const [tour, setTour] = useState({})
    const [listTour, setListTour] = useState([])
    const [action, setAction] = useState('create')
    const handleInputChange= (e)=>{
        const {value,name} = e.target;
        let myData = {
          ...tour,
          [name]:value
        }
        if(myData?.gianguoilon != null && myData?.giatreem != null){
          if(isNaN(myData?.gianguoilon) || isNaN(myData?.giatreem))
              return
          if(myData?.gianguoilon < myData?.giatreem){
            alert('Giá người lớn phải lớn hơn hoặc bằng giá trẻ em')
            myData.giatreem = ''
          }
        }
        if(myData?.tgbd != null && myData?.tgkt != null){
          if(myData?.tgbd >= myData?.tgkt){
            alert('Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
            return
          }
        }
        setTour(myData)
      }
    useEffect( async()=>{
        try {
            const data = await tourApi.getListTour(matuyen)
            console.log(data)
            setListTour(data);
        } catch (error) {
            console.log(error)            
        }
    },[])
    const handleSubmit = async(e)=>{
      e.preventDefault()
      const myTour = tour
      if(action == 'create'){
        try {
          const response = await tourApi.insertTour(myTour, matuyen)
          alert('Insert tour successfully !')
          const data = await tourApi.getListTour(matuyen)
          setListTour(data)
          setOpen(false)
        } catch (error) {
          alert('Insert tour failed !')
          console.log(error)
        }
      }
      else{
        try {
          const response = await tourApi.updateTour(myTour)
          alert('update tour successfully !')
          const data = await tourApi.getListTour(matuyen)
          setListTour(data)
          setOpen(false)
        } catch (error) {
          alert('update tour failed !')
          console.log(error)
        }
      }
    }
    const handleOpenUpdate = (t)=>{
       setAction('update')
       setTour(t)
       setOpen(true)
    }
    const handleOpenCreate = ()=>{
      setAction('create')
      setTour({})
      setOpen(true)
    }
    const deleteTour = async(matour)=>{
      if(window.confirm('Do you want to delete this tour ?')){
        try {
          const res = await tourApi.deleteTour(matour)
          alert('Delete tour successfully !')
          window.location.reload()
        } catch (error) {
          alert('Delete tour failed !!')
        }
      }
    }
    return (
        <div className="tourmn">
        {open?
        <div className="form-input">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <p className="form-input__head">
                Nhập thông tin tour
              </p>
              <p onClick={()=> setOpen(false)}>X</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <p className="input-label">Thời gian bắt đầu</p>
                <input type="datetime-local" className="form-control mb-3" placeholder="Nhập vào đây" min={new Date().toISOString().slice(0, -8)} name="tgbd" value ={tour?.tgbd} required onChange={handleInputChange} />

                <p className="input-label">Thời gian kết thúc</p>
                <input type="datetime-local" className="form-control mb-3" placeholder="Nhập vào đây" min={new Date().toISOString().slice(0, -8)} name="tgkt" value ={tour?.tgkt} required onChange={handleInputChange} />

                <p className="input-label">Giá người lớn</p>
                <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" name="gianguoilon" value ={tour?.gianguoilon} required onChange={handleInputChange} />

                <p className="input-label">Giá trẻ em</p>
                    <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value ={tour?.giatreem} name="giatreem" required onChange={handleInputChange} />
                
                <button type="submit" className="btn btn-info btn-input" >Submit</button>
                <button type="reset" className="btn btn-success btn-input">Reset</button>
                <button type="button" className="btn btn-danger btn-input" onClick={()=>setOpen(false)}>Exit</button>
              </form>
            </div>
          </div>
        </div>
        :
        <div>
          <div className="tourmn__head">
          <p className="tourmn__title">
              Danh sách các tour
          </p>
          <button className="btn btn-info" onClick={handleOpenCreate}>Thêm tour</button>
        </div>
        <div className="tourmn__table mt-2">
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã tour</th>
                  <th scope="col">Thời gian bắt đầu</th>
                  <th scope="col">Thời gian kết thúc</th>
                  <th scope="col">Giá người lớn</th>
                  <th scope="col">Giá trẻ em</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {listTour?.map(t =>{
                  return (
                    <tr onDoubleClick = {()=> handleOpenUpdate(t)}>
                      <td>{t?.matour}</td>
                      <td>{t?.tgbd}</td>
                      <td>{t?.tgkt}</td>
                      <td>{t?.gianguoilon} $</td>
                      <td>{t?.giatreem} $</td>
                      <td><button className="btn btn-danger" onClick={()=> deleteTour(t?.matour)}>Delete</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
            
          </div>  
        </div>
        }
    </div>
    )
}
