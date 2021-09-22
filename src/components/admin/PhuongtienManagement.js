import React,{useState,useEffect} from 'react'
import './TourDetail.css'
import * as phuongtienApi from '../../api/PhuongtienApi'
export default function PhuongtienManagement({matuyen}) {
    const [open,setOpen] = useState(false)
    const [phuongtien, setPhuongtien] = useState({})
    const [list, setList] = useState([])
    const [action, setAction] = useState('create')
    const handleInputChange= (e)=>{
        const {value,name} = e.target;
        setPhuongtien({
          ...phuongtien,
          [name]:value
        })
      }
    useEffect( async()=>{
        try {
           const response = await phuongtienApi.getListPhuongtien()
           setList(response) 
        } catch (error) {
            console.log(error)            
        }
    },[])
    const openUpdate = (pt)=>{
        setPhuongtien(pt)
        setAction('update')
        setOpen('true')
    }
    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(action == 'create'){
          try {
            const res = await phuongtienApi.insertPhuongtien(phuongtien)
            alert('Insert tranportation successfully !')
            window.location.reload()
          } catch (error) {
            alert('Insert tranportation failed !')
          }
      }
      if(action == 'update'){
        try {
          const res = await phuongtienApi.updatePhuongtien(phuongtien)
          alert('Update tranportation successfully !')
          window.location.reload()
        } catch (error) {
          alert('Update tranportation failed !')
        }
      }
     
    }
    const deletePhuongtien = async(mapt)=>{
      try {
        if(window.confirm('Do you want to delete this tranportation ? ')){
          const res = await phuongtienApi.deletePhuongtien(mapt)
          alert('Delete tranportation successfully !')
          window.location.reload()
        }
      } catch (error) {
        alert('Delete tranportation failed !')
      }
    }
    return (
        <div className="tourmn">
        {open?
        <div className="form-input">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <p className="form-input__head">
                Nhập thông tin phương tiện
              </p>
              <p onClick={()=> {setOpen(false); setAction('create') ; setPhuongtien({})}}>X</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <p className="input-label">Tên phương tiện</p>
                <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={phuongtien?.tenpt} name="tenpt" required onChange={handleInputChange} />

                
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
              Danh sách phương tiện
          </p>
          <button className="btn btn-info" onClick={()=>setOpen(true)}>Thêm phương tiện</button>
        </div>
        <div className="tourmn__table mt-2">
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã phương tiện</th>
                  <th scope="col">Tên phương tiện</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {list?.map(t =>{
                  return (
                    <tr onDoubleClick={()=>{openUpdate(t)}}>
                      <td>{t?.mapt}</td>
                      <td>{t?.tenpt}</td>
                      <td><button className='btn btn-danger' onClick={()=> deletePhuongtien(t?.mapt)}>Delete</button></td>
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
