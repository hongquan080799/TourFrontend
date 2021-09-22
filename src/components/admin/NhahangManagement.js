import React,{useState,useEffect} from 'react'
import './TourDetail.css'
import * as nhahangApi from '../../api/NhahangApi'
export default function NhahangManagement() {
    const [open,setOpen] = useState(false)
    const [nhahang, setNhahang] = useState({})
    const [list, setList] = useState([])
    const [action, setAction] = useState('create')
    const handleInputChange= (e)=>{
        const {value,name} = e.target;
        setNhahang({
          ...nhahang,
          [name]:value
        })
      }
    useEffect( async()=>{
        try {
           const response = await nhahangApi.getListNhahang()
           setList(response) 
        } catch (error) {
            console.log(error)            
        }
    },[])
    const openUpdate = (pt)=>{
        setNhahang(pt)
        setAction('update')
        setOpen('true')
    }
    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(action == 'create'){
          try {
            const res = await nhahangApi.insertNhahang(nhahang)
            alert('Insert restaurent successfully !')
            window.location.reload()
          } catch (error) {
            alert('Insert restaurent failed !')
          }
      }
      if(action == 'update'){
        try {
          const res = await nhahangApi.updateNhahang(nhahang)
          alert('Update restaurent successfully !')
          window.location.reload()
        } catch (error) {
          alert('Update restaurent failed !')
        }
      }
     
    }
    const deleteNhahang = async(mapt)=>{
      try {
        if(window.confirm('Do you want to delete this restaurent ? ')){
          const res = await nhahangApi.deleteNhahang(mapt)
          alert('Delete restaurent successfully !')
          window.location.reload()
        }
      } catch (error) {
        alert('Delete restaurent failed !')
      }
    }
    return (
        <div className="tourmn">
        {open?
        <div className="form-input">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <p className="form-input__head">
                Nhập thông tin nhà hàng
              </p>
              <p onClick={()=> {setOpen(false); setAction('create') ; setNhahang({})}}>X</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <p className="input-label">Tên nhà hàng</p>
                <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={nhahang?.tennh} name="tennh" required onChange={handleInputChange} />

                
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
              Danh sách nhà hàng
          </p>
          <button className="btn btn-info" onClick={()=>setOpen(true)}>Thêm nhà hàng</button>
        </div>
        <div className="tourmn__table mt-2">
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã nhà hàng</th>
                  <th scope="col">Tên nhà hàng</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {list?.map(t =>{
                  return (
                    <tr onDoubleClick={()=>{openUpdate(t)}}>
                      <td>{t?.manh}</td>
                      <td>{t?.tennh}</td>
                      <td><button className='btn btn-danger' onClick={()=> deleteNhahang(t?.manh)}>Delete</button></td>
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
