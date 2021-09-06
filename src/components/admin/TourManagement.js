import React,{useState, useEffect} from 'react'
import {store} from '../../firebase'
import axios from 'axios'
import firebase from 'firebase'
import * as tuyenApi from '../../api/TuyenApi'
import {useHistory} from 'react-router-dom'
import './TourManagement.css'
export default function TourManagement() {
  const history = useHistory()
  const defalseImg = "https://www.tullamoreshow.com/custom/public/images/.600.360.0.1.t/gallery-10.png"
  const [open, setOpen] = useState(false)
  const [image,setImage] = useState([])
  const [progress,setProgress] =useState(0)
  const [tuyen,setTuyen] = useState({})
  const [listTuyen,setListTuyen] = useState([])
  const handleInputChange= (e)=>{
    const {value,name} = e.target;
    setTuyen({
      ...tuyen,
      [name]:value
    })
  }
  useEffect(async()=>{
    try {
      const data = await tuyenApi.getListTuyen();
      console.log(data)
      await setListTuyen(data)
    } catch (error) {
       console.log(error)
    }

  },[])
  const handleSubmit = async()=>{
    const photo = image.map(img => ({picture:img}))
    tuyen.photo = photo;
    try {
      const response = await tuyenApi.insertTuyen(tuyen)
      const data = await tuyenApi.getListTuyen();
      await setListTuyen(data)
      alert('Thêm tuyến thành công')
      setOpen(false)
    } catch (error) {
      alert('Thêm tuyến thất bại !!!')
    }
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
      store.ref().child('images').child(fileNameFinal).getDownloadURL().then(url=> setImage([...image,url]));
    }
    )
    
   // console.log(image)
}
    return (
        <div className="tourmn">
            {open?
            <div className="form-input">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <p className="form-input__head">
                    Nhập thông tin tuyến
                  </p>
                  <p onClick={()=> setOpen(false)}>X</p>
                </div>
                <div className="card-body">
                  <p className="input-label">Mã tuyến</p>
                  <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" name="matuyen" onChange={handleInputChange} />

                  <p className="input-label">Tên tuyến</p>
                  <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" name="tentuyen" onChange={handleInputChange} />

                  <p className="input-label">Mô tả</p>
                  <textarea className="form-control" rows={3} defaultValue={""} onChange={handleInputChange} name="mota"/>
      
                  <p className="input-label">Thời gian hành trình</p>
                  <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" name="thoigian" onChange={handleInputChange} />

                  <p className="input-label">Hình ảnh</p>
                  <div className="progress mt-3" style={{height:14,width:'20vw'}}>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: progress +'%'}}>{progress} %</div>
                  </div>
                  
                  <div class="image-upload">
                    <label for="file-input">
                      <div style={{cursor:'pointer'}}>
                        <img src={defalseImg} style={{width:100}}/>
                        <p>Pick an image</p>
                      </div>
                    </label>

                    <input id="file-input" type="file" className="mb-3" onChange={handleImage}/>
                  </div>
                  <div className="row mb-3">
                    {image.map(img=>{
                      return(
                        <div className="col-12 col-sm-12 col-md-4 col-lg-3 text-center">
                          <img alt="pt" src={img} className="input-img mb-4" />
                        </div>  
                      )
                    })}
                  </div>
                  <button type="submit" className="btn btn-info btn-input" onClick={handleSubmit}>Submit</button>
                  <button type="submit" className="btn btn-success btn-input">Reset</button>
                  <button type="submit" className="btn btn-danger btn-input" onClick={()=>setOpen(false)}>Exit</button>
                </div>
              </div>
            </div>
            :
            <div>
              <div className="tourmn__head">
              <p className="tourmn__title">
                  Danh sách các tuyến
              </p>
              <button className="btn btn-info" onClick={()=>setOpen(true)}>Thêm tuyến</button>
            </div>
            <div className="tourmn__table mt-2">
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Mã tuyến</th>
                      <th scope="col">Tên tuyến</th>
                      <th scope="col">Thời gian</th>
                      <th scope="col">Xem hình ảnh</th>
                      <th scope="col">Tour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listTuyen.map(t=>{
                      return(
                        <tr>
                          <td>{t.matuyen}</td>
                          <td>{t.tentuyen}</td>
                          <td>{t.thoigian}</td>
                          <td style={{width:'12%'}}><button className="btn btn-info mr-1" data-toggle="modal" data-target={'#' + t.matuyen}>View</button></td>
                          <td style={{width:'12%'}}><button className="btn btn-info" onClick={()=> history.push('/admin/tour/' + t.matuyen)}>Xem tour</button></td>
                          <div className="modal" id={t.matuyen}>
                              <div className="modal-dialog modal-lg">
                                  <div className="modal-content">

                                  <div className="modal-header">
                                      <h3 className="modal-title">{t.tentuyen}</h3>
                                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                                  </div>

                                  
                                  <div className="modal-body px-4">
                                      <div className="row detail_product_admin px-4">
                                          <div className="col-6">
                                            <div id="demo" class="carousel slide" data-ride="carousel">
                                              <div class="carousel-inner">
                                                {t.photo?.map((ha,index) =>{
                                                  return(
                                                    <div class={ index===1 ? 'carousel-item active' : 'carousel-item'} key={index}>
                                                      <img src={ha.picture} alt="Los Angeles" style={{width:'100%'}}/>
                                                    </div>
                                                  )
                                                })}
                                              </div>

                                              <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                                <span class="carousel-control-prev-icon navigation-icon"></span>
                                              </a>
                                              <a class="carousel-control-next" href="#demo" data-slide="next">
                                                <span class="carousel-control-next-icon navigation-icon"></span>
                                              </a>

                                            </div>
                                        </div>
                                          <div className="col-6">
                                            <h5>Describe</h5>
                                            {t.mota}
                                          </div>

                              
                                      </div>
                                      </div>
                                      

                                  
                                  <div className="modal-footer">
                                      <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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
