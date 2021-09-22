import React,{useState,useEffect} from 'react'
import './TourDetail.css'
import * as khachsanApi from '../../api/KhachsanApi'
export default function KhachsanManagement({matuyen}) {
    const [open,setOpen] = useState(false)
    const [khachsan, setKhachsan] = useState({})
    const [list, setList] = useState([])
    const [action, setAction] = useState('create')
    const handleInputChange= (e)=>{
        const {value,name} = e.target;
        setKhachsan({
          ...khachsan,
          [name]:value
        })
      }
    useEffect( async()=>{
        try {
           const response = await khachsanApi.getListKhachsan()
           setList(response) 
        } catch (error) {
            console.log(error)            
        }
    },[])
    const openUpdate = (pt)=>{
        setKhachsan(pt)
        setAction('update')
        setOpen('true')
    }
    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(action == 'create'){
          try {
            const res = await khachsanApi.insertKhachsan(khachsan)
            alert('Insert hotel successfully !')
            window.location.reload()
          } catch (error) {
            alert('Insert hotel failed !')
          }
      }
      if(action == 'update'){
        try {
          const res = await khachsanApi.updateKhachsan(khachsan)
          alert('Update hotel successfully !')
          window.location.reload()
        } catch (error) {
          alert('Update hotel failed !')
        }
      }
     
    }
    const deleteKhachsan = async(mapt)=>{
      try {
        if(window.confirm('Do you want to delete this hotel ? ')){
          const res = await khachsanApi.deleteKhachsan(mapt)
          alert('Delete hotel successfully !')
          window.location.reload()
        }
      } catch (error) {
        alert('Delete hotel failed !')
      }
    }
    return (
        <div className="tourmn">
        {open?
        <div className="form-input">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <p className="form-input__head">
                Nhập thông tin khách sạn
              </p>
              <p onClick={()=> {setOpen(false); setAction('create') ; setKhachsan({})}}>X</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <p className="input-label">Tên khách sạn</p>
                <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={khachsan?.tenks} name="tenks" required onChange={handleInputChange} />

                
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
              Danh sách khách sạn
          </p>
          <button className="btn btn-info" onClick={()=>setOpen(true)}>Thêm khách sạn</button>
        </div>
        <div className="tourmn__table mt-2">
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã khách sạn</th>
                  <th scope="col">Tên khách sạn</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {list?.map(t =>{
                  return (
                    <tr onDoubleClick={()=>{openUpdate(t)}}>
                      <td>{t?.maks}</td>
                      <td>{t?.tenks}</td>
                      <td><button className='btn btn-danger' onClick={()=> deleteKhachsan(t?.maks)}>Delete</button></td>
                      <td><button className='btn btn-info' onClick={()=>{openUpdate(t)}}>Update</button></td>
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
