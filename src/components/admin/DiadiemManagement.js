import React,{useState,useEffect} from 'react'
import './TourDetail.css'
import * as diadiemApi from '../../api/DiadiemApi'
export default function DiadiemManagement({matuyen}) {
    const [open,setOpen] = useState(false)
    const [diadiem, setDiadiem] = useState({})
    const [list, setList] = useState([])
    const [action, setAction] = useState('create')
    const handleInputChange= (e)=>{
        const {value,name} = e.target;
        setDiadiem({
          ...diadiem,
          [name]:value
        })
      }
    useEffect( async()=>{
        try {
           const response = await diadiemApi.getListDiadiem()
           //console.log(response)
           setList(response) 
        } catch (error) {
            console.log(error)            
        }
    },[])
    const openUpdate = (pt)=>{
        setDiadiem(pt)
        setAction('update')
        setOpen('true')
    }
    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(action == 'create'){
          try {
            const res = await diadiemApi.insertDiadiem(diadiem)
            alert('Insert tranportation successfully !')
            window.location.reload()
          } catch (error) {
            alert('Insert tranportation failed !')
          }
      }
      if(action == 'update'){
        try {
          const res = await diadiemApi.updateDiadiem(diadiem)
          alert('Update tranportation successfully !')
          window.location.reload()
        } catch (error) {
          alert('Update tranportation failed !')
        }
      }
     
    }
    const deleteDiadiem = async(madd)=>{
      try {
        if(window.confirm('Do you want to delete this location ? ')){
          const res = await diadiemApi.deleteDiadiem(madd)
          alert('Delete location successfully !')
          window.location.reload()
        }
      } catch (error) {
        alert('Delete location failed !')
      }
    }
    return (
        <div className="tourmn">
        {open?
        <div className="form-input">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <p className="form-input__head">
                Nhập thông tin địa điểm
              </p>
              <p onClick={()=> {setOpen(false); setAction('create') ; setDiadiem({})}}>X</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <p className="input-label">Tên địa điểm</p>
                <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={diadiem?.tendiadiem} name="tendiadiem" required onChange={handleInputChange} />
                <p className="input-label">Mô tả</p>
                <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={diadiem?.mota} name="tendiadiem" required onChange={handleInputChange} />
                
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
              Danh sách địa điểm
          </p>
          <button className="btn btn-info" onClick={()=>setOpen(true)}>Thêm địa điểm</button>
        </div>
        <div className="tourmn__table mt-2">
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã địa điểm</th>
                  <th scope="col">Tên địa điểm</th>
                  <th scope="col">Mô tả</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {list?.map(t =>{
                  return (
                    <tr onDoubleClick={()=>{openUpdate(t)}}>
                      <td>{t?.id}</td>
                      <td>{t?.tendiadiem}</td>
                      <td style={{width : '60%'}}>{t?.mota}</td>
                      <td><button className='btn btn-danger' onClick={()=> deleteDiadiem(t?.id)}>Delete</button></td>
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
