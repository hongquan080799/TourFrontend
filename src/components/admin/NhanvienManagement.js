import React,{useState,useEffect} from 'react'
import './TourManagement.css'
import {store} from '../../firebase'
import * as nhanvienApi from '../../api/NhanvienApi'
export default function NhanvienManagement() {
  const [open,setOpen] = useState(false)
  const [listNhanvien, setListNhanvien] = useState([])
  const [nhanvien, setNhanvien] = useState()
  const [progress,setProgress] =useState(0)
  const [image,setImage] = useState("https://img.icons8.com/material-sharp/96/000000/user-male-circle.png")
  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setNhanvien({
        ...nhanvien,
        [name]:value
    })
  }
  const handleImage = async (e)=>{
  
    // code here
    var file = e.target.files[0];
   // console.log('dsds')
    const fileNameFirst = file?.name;
    const fileNameFinal = fileNameFirst?.replace(/ /g,'')
    var storageRef =  store.ref().child("images/"+fileNameFinal)
    
    // const metadata = {
    //   contentType: 'image/jpeg'
    // };
 
    const uploadTask = storageRef.put(file);
    // uploadTask.task.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //   function progress(snapshot){
    //     let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
    //     setProgress(percentage)
    //     console.log(12)
    //   }
    // )
    uploadTask.on(`state_changed`,snapshot=>{
      setProgress((snapshot.bytesTransferred/snapshot.totalBytes)*100)
    },
    (err)=>{
      console.log(err)
    },
    ()=>{
      store.ref().child('images').child(fileNameFinal).getDownloadURL().then(url=> setImage(url));
    }
    )
    
   // console.log(image)
}
  const handleSubmit = async (e)=>{
      e.preventDefault();
      const data = {...nhanvien};
      if(data.password != data.rePassword){
          alert('Password is not matched !!!')
          return
      }
      delete data.rePassword
      data.photo = image
      console.log(data)
      try {
        const response = await nhanvienApi.insertNV(data)
        alert('Insert employee successfully !!!');
        window.location.reload()
        
      } catch (error) {
        alert('Insert employee failed !!!')
        console.log(error)
      }
  }
  useEffect(async()=>{
    try {
      const data = await nhanvienApi.getListNV()
      setListNhanvien(data)
    } catch (error) {
      console.log(error)
    }
  },[])
  const deleteNhanvien = async(username)=>{
      if(window.confirm('Do you want to delete employee : ' + username + ' ?')){
        try {
          const res = await nhanvienApi.deleteNV(username)
          alert('Delete Employee successfully !!!')
          const data = await nhanvienApi.getListNV()
          setListNhanvien(data)
          
        } catch (error) {
          console.log(error)
          alert('Delete employee failed !!!')
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
                    Form input employee
                  </p>
                  <p onClick={()=> setOpen(false)}>X</p>
                </div>
                <form className="card-body" onSubmit={handleSubmit}>
                  <form>
                            <p className="input-label">Username</p>
                            <input type="text" className="form-control mb-3" placeholder="Enter your username" name="username" onChange={handleInputChange}  />
                            <p className="input-label">Password</p>
                            <div className="form-inline d-flex">
                                <input type="password" className="form-control mb-3 mr-4" style={{width:'30%'}} placeholder="Enter your password" name="password" onChange={handleInputChange} />
                                <input type="password" className="form-control mb-3" style={{width:'30%'}} placeholder="Re-enter your password" name="rePassword" onChange={handleInputChange}  />
                            </div>
                            <p className="input-label">Full name</p>
                            <input type="text" className="form-control mb-3" placeholder="Enter your name" name="tennv" onChange={handleInputChange}  />
                            <p className="input-label">Phone number</p>
                            <input type="text" className="form-control mb-3" placeholder="Enter your phone number" name="sdt" onChange={handleInputChange} />
                            <p className="input-label">Email</p>
                            <input type="text" className="form-control mb-3" placeholder="Enter your email" name="email" onChange={handleInputChange} />
                            <p className="input-label">Gender</p>
                            <select className="custom-select mb-3" onChange={handleInputChange} name="gioitinh" >
                              <option value={1} selected>Male</option>
                              <option value={0}>Female</option>
                            </select>
                            <p className="input-label">Address</p>
                            <input type="text" className="form-control mb-3" placeholder="Enter your address" name="diachi" onChange={handleInputChange} />
                            <p className="input-label">Position</p>
                            <input type="text" className="form-control mb-3" placeholder="Enter your address" name="chucvu" onChange={handleInputChange} />
                            <div className="progress mt-3" style={{height:14,width:'20vw'}}>
                                <div className="progress-bar bg-success" role="progressbar" style={{width: progress +'%'}}>{progress} %</div>
                            </div>
                            <div className="image-upload">
                                <label for="file-input">
                                <div style={{cursor:'pointer'}}>
                                <img src="https://img.icons8.com/clouds/100/000000/upload.png" style={{width:50}}/>
                                    <p>Pick an image</p>
                                </div>
                                </label>

                                <input id="file-input" type="file" className="mb-4" onChange={handleImage}/>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 col-sm-12 col-md-4 col-lg-3 text-center">
                                    <img alt="pt" src={image} className="input-img mb-4" style={{width:150}} />
                                </div>  
                            </div>
                            <button type="submit" className="btn btn-info btn-input" onClick={handleSubmit}>Submit</button>
                            <button type="reset" className="btn btn-success btn-input">Reset</button>
                            <button type="button" className="btn btn-danger btn-input" onClick={()=>setOpen(false)}>Exit</button>
                        </form>
                </form>
              </div>
            </div>
            :
            <div>
              <div className="tourmn__head">
              <p className="tourmn__title">
                  Employee List
              </p>
              
              <button className="btn btn-info" onClick={()=>setOpen(true)}>Add Employee</button>
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
                  {listNhanvien?.map(nv =>{
                      const gioitinh = ()=>{
                        if(nv?.gioitinh == 1)
                          return 'Male'
                        else if(nv?.gioitinh == 0)
                          return 'Female'
                        else
                          return 'Something else'
                      }
                      return(
                        <tr>
                          <td>{nv?.manv}</td>
                          <td>{nv?.tennv}</td>
                          <td>{nv?.taikhoan?.username}</td>
                          <td>{nv?.email}</td>
                          <td>{nv?.sdt}</td>
                          <td>{gioitinh()}</td>
                          <td>{nv?.chucvu}</td>
                          <td style={{width:'10rem'}}><button className ="btn btn-info" data-target={'#'+nv?.manv} data-toggle="modal">View</button></td>
                          <td style={{width:'10rem'}}><button className ="btn btn-danger" onClick = {()=> deleteNhanvien(nv?.taikhoan?.username)}>Delete</button></td>
                          <div className="modal fade" id={nv?.manv} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                  <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title" id="exampleModalLabel">Employee Profile</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">??</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="row"> 
                                      <div className="col-4 text-center" style={{marginTop:'3rem'}}> 
                                        <img alt="pc" src={nv?.photo} className="rounded-circle w-50 mb-4 "  /><br/>
                                        <h5>{nv?.username}</h5>
                                      </div>
                                      <div className="col-8">
                                        <div className="table-responsive">
                                        <table className="table table-bordered">
                                          <tbody>
                                            <tr>
                                              <td>FullName</td>
                                              <td>{nv?.tennv}</td>
                                            </tr>
                                            <tr>
                                              <td>Email</td>
                                              <td>{nv?.email}</td>
                                            </tr>
                                            <tr>
                                              <td>Phone number</td>
                                              <td>{nv?.sdt}</td>
                                            </tr>
                                            <tr>
                                              <td>Gender</td>
                                              <td>{gioitinh()}</td>
                                            </tr>
                                            <tr>
                                              <td>Address</td>
                                              <td>{nv?.diachi}</td>
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
            }
        </div>
    )
}
