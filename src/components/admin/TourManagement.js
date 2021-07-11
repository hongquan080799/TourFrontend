import React,{useState,useEffect} from 'react'
import {store} from '../../firebase'
import axios from 'axios'
import firebase from 'firebase'
import './TourManagement.css'
export default function TourManagement() {
  const defalseImg = "https://www.tullamoreshow.com/custom/public/images/.600.360.0.1.t/gallery-10.png"
  const [open,setOpen] = useState(false)
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
  useEffect(()=>{
    axios.get(process.env.REACT_APP_API + '/tuyen')
    .then(response =>{
      setListTuyen(response.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  const handleSubmit = ()=>{
    const photo = image.map(img => ({picture:img}))
    tuyen.photo = photo;
    axios.post(process.env.REACT_APP_API+"/tuyen",tuyen)
    .then(response=>{
      alert('Thêm thành công')
      setOpen(false)
      
      setImage([])
      setProgress(0)

      axios.get(process.env.REACT_APP_API + '/tuyen')
      .then(response =>{
        setListTuyen(response.data)
      })
      .catch(err=>{
        console.log(err)
      })

    })
    .catch(err=>{
      alert("Thêm thất bại \n" + err)
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
                  <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" name="mota" onChange={handleInputChange} />

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
                      <th scope="col">Mô tả</th>
                      <th scope="col">Thời gian</th>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Tour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listTuyen.map(t=>{
                      return(
                        <tr>
                          <td>{t.matuyen}</td>
                          <td>{t.tentuyen}</td>
                          <td>{t.mota}</td>
                          <td>{t.thoigian}</td>
                          <td><button className="btn btn-success">Xem hình ảnh</button></td>
                          <td><button className="btn btn-info">Xem tour</button></td>
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
