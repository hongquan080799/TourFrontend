import React,{useState, useEffect} from 'react'
import {store} from '../../firebase'
import axios from 'axios'
import firebase from 'firebase'
import * as tuyenApi from '../../api/TuyenApi'
import * as khachsanApi from '../../api/KhachsanApi'
import * as nhahangApi from '../../api/NhahangApi'
import * as diadiemApi from '../../api/DiadiemApi'
import * as phuongtienApi from '../../api/PhuongtienApi'
import {useHistory} from 'react-router-dom'
import './TourManagement.css'
export default function TourManagement() {
  const history = useHistory()
  const defalseImg = "https://www.tullamoreshow.com/custom/public/images/.600.360.0.1.t/gallery-10.png"
  const [open, setOpen] = useState(false)
  const [image,setImage] = useState([])
  const [tuyen,setTuyen] = useState({})
  const [progress,setProgress] =useState(0)
  const [listTuyen,setListTuyen] = useState([])
  const [listKS, setListKS] = useState([])
  const [listNH, setListNH] = useState([])
  const [listDD, setListDD] = useState([])
  const [listPT, setListPT] = useState([])
  const [action, setAction] = useState('insert')
  const handleInputChange= (e)=>{
    const {value,name} = e.target;

    setTuyen({
      ...tuyen,
      [name]:value
    })
  }
  const handleInputChangeMoTaLichTrinh = (e, idDiadiem)=>{
      const {value} = e.target
      let lichtrinh = tuyen?.lichtrinh
      for(let i = 0 ; i < lichtrinh?.length ; i++){
        
        if(lichtrinh[i].diadiem?.id == idDiadiem)
          lichtrinh[i].mota = value
      }
      setTuyen({
        ...tuyen,
        lichtrinh
      })
  }
  useEffect(async()=>{
    try {
      const data = await tuyenApi.getListTuyen();
      await setListTuyen(data)

      const list1 = await khachsanApi.getListKhachsan()
      setListKS(list1)

      const list2 = await nhahangApi.getListNhahang()
      setListNH(list2)

      const list3 = await diadiemApi.getListDiadiem()
      setListDD(list3)

      const list4 = await phuongtienApi.getListPhuongtien()
      setListPT(list4)

      
    } catch (error) {
       console.log(error)
    }

  },[])

  const updateListKS = (list, tuyen)=>{
    const myList = list?.map(ks =>{
      return {
        ...ks,
        isChecked : tuyen?.datkhachsan?.some(dks => dks?.khachsan?.maks == ks?.maks )
      }
      
    })
    return myList
  }
  const updateListNH = (list, tuyen)=>{
    const myList = list?.map(nh =>{
      return {
        ...nh,
        isChecked : tuyen?.datnhahang?.some(dnh => dnh?.nhahang?.manh == nh?.manh )
      }
      
    })
    return myList
  }
  const updateListPT = (list, tuyen)=>{
    const myList = list?.map(pt =>{
      return {
        ...pt,
        isChecked : tuyen?.hinhthucdichuyen?.some(dpt=> dpt?.phuongtien?.mapt == pt?.mapt )
      }
      
    })
    return myList
  }
  const updateListLT = (list, tuyen)=>{
    const myList = list?.map(lt =>{
      return {
        ...lt,
        isChecked : tuyen?.lichtrinh?.some(dlt => dlt?.diadiem?.id == lt?.id )
      }
      
    })
    return myList
  }
  const handleSubmit = async()=>{
    const photo = image.map(img => ({picture:img}))
    tuyen.photo = photo;
    // console.log(tuyen)
    if(action === 'create'){
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
    if(action === 'update'){
      try {
        const response = await tuyenApi.updateTuyen(tuyen)
        const data = await tuyenApi.getListTuyen();
        await setListTuyen(data)
        alert('Sửa tuyến thành công')
        setOpen(false)
      } catch (error) {
        alert('Sửa tuyến thất bại !!!')
      }
    }
    setAction('create')
    window.location.reload()
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
    const closeImage = (myImg)=>{
      const myImage = image;
      setImage(myImage.filter((value,index) => {return value != myImg}))
      setProgress(0)
    }
    const updateTuyen = (t)=>{
      setOpen(true)
      setTuyen(t)
      setImage(t?.photo?.map(p => p.picture))
      setAction('update')
      setListKS(updateListKS(listKS, t))
      setListNH(updateListNH(listNH, t))
      setListDD(updateListLT(listDD, t))
      setListPT(updateListPT(listPT, t))
    }
    const handleChangeKhachSan = (maks) =>{
      let myList = listKS 
      for(let i = 0; i < myList.length; i++){
        if(myList[i].maks == maks){
          myList[i].isChecked = !myList[i].isChecked
          break
        }
      }
      setListKS(myList)
      setTuyen({
        ...tuyen,
        datkhachsan : myList?.map(l => {
          if(l?.isChecked)
          return{
            tuyenMatuyen : tuyen?.matuyen,
            khachsanMaks : l?.maks,
            khachsan: {
              maks : l?.maks,
              tenks : l?.tenks
            }
          }
        }).filter(l => l != null)
      })
    }
    const handleChangeNhaHang = (manh) =>{
      let myList = listNH
      for(let i = 0; i < myList?.length; i++){
        if(myList[i].manh == manh){
          myList[i].isChecked = !myList[i].isChecked
          break
        }
      }
      setTuyen({
        ...tuyen,
        datnhahang : myList?.map(l => {
          if(l?.isChecked)
          return {
            tuyenMatuyen : tuyen?.matuyen,
            nhahangManh : l?.manh,
            nhahang: {
              manh : l?.manh,
              tennh : l?.tennh
            }
          }
        }).filter(l => l != null)
      })
      setListNH(myList)
    }
    const handleChangePhuongTien = (mapt) =>{
      let myList = listPT 
      for(let i = 0; i < myList?.length; i++){
        if(myList[i].mapt == mapt){
          myList[i].isChecked = !myList[i].isChecked
          break
        }
      }
      setTuyen({
        ...tuyen,
        hinhthucdichuyen : myList?.map(l => {
          if(l?.isChecked)
          return {
            tuyenMatuyen : tuyen?.matuyen,
            phuongtienMapt : l?.mapt,
            phuongtien: {
              mapt : l?.mapt,
              tenpt : l?.tenpt
            }
          }
        }).filter(l => l != null)
      })
      setListPT(myList)
    }
    const handleChangeLichTrinh = (id) =>{
      let myList = listDD 
      for(let i = 0; i < myList?.length; i++){
        if(myList[i].id == id){
          myList[i].isChecked = !myList[i].isChecked
          break
        }
      }
      setTuyen({
        ...tuyen,
        lichtrinh : myList?.map(l => {
          if(l?.isChecked)
          return {
            tuyenMatuyen : tuyen?.matuyen,
            diadiemId : l?.id,
            diadiem: {
              id : l?.id,
              tendiadiem : l?.tendiadiem,
            },
            mota:tuyen?.lichtrinh?.filter(tt => tt?.diadiem?.id == l?.id)[0]?.mota
          }
        }).filter(l => l != null)
      })
      setListDD(myList)
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
                  <p onClick={()=> {window.location.reload()}}>X</p>
                </div>
                <div className="card-body">
                  <p className="input-label">Mã tuyến</p>
                  <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={tuyen?.matuyen} name="matuyen" onChange={handleInputChange} />

                  <p className="input-label">Tên tuyến</p>
                  <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={tuyen?.tentuyen} name="tentuyen" onChange={handleInputChange} />

                  <p className="input-label">Mô tả</p>
                  <textarea className="form-control" rows={3} defaultValue={""} value={tuyen?.mota} onChange={handleInputChange} name="mota"/>
      
                  <p className="input-label">Thời gian hành trình</p>
                  <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={tuyen?.thoigian} name="thoigian" onChange={handleInputChange} />
                  <p className="input-label">Dịa điểm xuất phát</p>
                  <input type="text" className="form-control mb-3" placeholder="Nhập vào đây" value={tuyen?.diadiemxp} name="diadiemxp" onChange={handleInputChange} />
                  {action == 'update'?
                    <div>
                      <p className="input-label">Khách sạn</p>
                      {tuyen?.datkhachsan?.map(ks =>{
                        if(listKS?.some(k => k?.maks == ks?.khachsan?.maks && k?.isChecked))
                        return (
                          <p className="ml-4">
                            - {ks?.khachsan?.tenks}
                          </p>
                        )
                      })}
                      <button className="btn btn-outline-info" data-toggle="modal" data-target="#addHotel">Thêm</button>
                      <div className="modal fade" id="addHotel" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog  " role="document">
                            <div className="modal-content">
                              <div className="modal-header bg-info text-white">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm khách sạn</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="table-responsive">
                                <table className="table" style={{maxHeight:'40vh', overflow:'scroll'}}>
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Mã khách sạn</th>
                                      <th scope="col">Tên khách sạn</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {listKS?.map(ks =>{
                                      return (
                                        <tr>
                                          <td><input type="checkbox" defaultChecked = {ks?.isChecked} onChange={() => handleChangeKhachSan(ks?.maks)} /> </td>
                                          <td>{ks?.maks}</td>
                                          <td>{ks?.tenks}</td>
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
                      <p className="input-label mt-4">Nhà hàng</p>
                      {tuyen?.datnhahang?.map(nh =>{
                         if(listNH?.some(k => k?.manh == nh?.nhahang?.manh && k?.isChecked))
                        return (
                          <p className="ml-4">
                            - {nh?.nhahang?.tennh}
                          </p>
                        )
                      })}
                      <button className="btn btn-outline-info" data-toggle="modal" data-target="#addRestaurent">Thêm</button>
                      <div className="modal fade" id="addRestaurent" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog  " role="document">
                            <div className="modal-content">
                              <div className="modal-header bg-info text-white">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm nhà hàng</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="table-responsive">
                                <table className="table" style={{maxHeight:'40vh', overflow:'scroll'}}>
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Mã nhà hàng</th>
                                      <th scope="col">Tên nhà hàng</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {listNH?.map(nh =>{
                                      return (
                                        <tr>
                                          <td><input type="checkbox" defaultChecked={nh?.isChecked} onChange={()=> handleChangeNhaHang(nh?.manh)} /></td>
                                          <td>{nh?.manh}</td>
                                          <td>{nh?.tennh}</td>
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
                      <p className="input-label mt-4">Hình thức di chuyển</p>
                      {tuyen?.hinhthucdichuyen?.map(ht =>{
                        if(listPT?.some(k => k?.mapt == ht?.phuongtien?.mapt && k?.isChecked))
                        return (
                          <p className="ml-4">
                            - {ht?.phuongtien?.tenpt}
                          </p>
                        )
                      })}
                      <button className="btn btn-outline-info" data-toggle="modal" data-target="#addPT">Thêm</button>
                      <div className="modal fade" id="addPT" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog  " role="document">
                            <div className="modal-content">
                              <div className="modal-header bg-info text-white">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm phương tiện</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="table-responsive">
                                <table className="table" style={{maxHeight:'40vh', overflow:'scroll'}}>
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Mã phương tiện</th>
                                      <th scope="col">Tên phương tiện</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {listPT?.map(pt =>{
                                      return (
                                        <tr>
                                          <td><input type="checkbox" defaultChecked={pt?.isChecked} onChange={() => handleChangePhuongTien(pt?.mapt)} /></td>
                                          <td>{pt?.mapt}</td>
                                          <td>{pt?.tenpt}</td>
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
                      <p className="input-label mt-4">Lịch trình</p>
                      {tuyen?.lichtrinh?.map(lt =>{
                        if(listDD?.some(k => k?.id == lt?.diadiem?.id && k?.isChecked))
                        return (
                          <div className="ml-4">
                            <p> - Địa điểm : {lt?.diadiem?.tendiadiem}</p>
                            <textarea className="form-control" name = "motalichtrinh" rows={3} onChange={(e)=> handleInputChangeMoTaLichTrinh(e, lt?.diadiem?.id)} value={lt?.mota} />
                            <hr />  
                          </div>
                        )
                      })}
                      <button className="btn btn-outline-info mb-4" data-toggle="modal" data-target="#addDD">Thêm</button>
                      <div className="modal fade" id="addDD" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-xl  " role="document">
                            <div className="modal-content">
                              <div className="modal-header bg-info text-white">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm lịch trình</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="table-responsive">
                                <table className="table" style={{maxHeight:'40vh', overflow:'scroll'}}>
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Mã địa điểm</th>
                                      <th scope="col">Tên địa điểm</th>
                                      <th scope="col">Mô tả</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {listDD?.map(dd =>{
                                      return (
                                        <tr>
                                          <td><input type="checkbox" checked={dd?.isChecked} onChange={()=> handleChangeLichTrinh(dd?.id)} /></td>
                                          <td>{dd?.id}</td>
                                          <td>{dd?.tendiadiem}</td>
                                          <td>{dd?.mota}</td>
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
                    </div>:''
                  }
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
                          <p className="cancelImg" onClick={() => closeImage(img)}>x</p>
                          <img alt="pt" src={img} className="input-img mb-4" />
                        </div>  
                      )
                    })}
                  </div>
                  <button type="submit" className="btn btn-info btn-input" onClick={handleSubmit}>Submit</button>
                  <button type="submit" className="btn btn-success btn-input">Reset</button>
                  <button type="submit" className="btn btn-danger btn-input" onClick={()=> {window.location.reload()}}>Exit</button>
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
                        <tr onDoubleClick={()=> updateTuyen(t)} >
                          <td>{t.matuyen}</td>
                          <td>{t.tentuyen}</td>
                          <td>{t.thoigian}</td>
                          <td style={{width:'12%'}}><button className="btn btn-info mr-1" data-toggle="modal" data-target={'#' + t.matuyen}>View</button></td>
                          <td style={{width:'12%'}}><button className="btn btn-info" onClick={()=> history.push('/admin/tour/' + t.matuyen)}>Edit Tour</button></td>
                          <div className="modal" id={t.matuyen}>
                              <div className="modal-dialog modal-xl">
                                  <div className="modal-content">

                                  <div className="modal-header">
                                      <h3 className="modal-title">{t.tentuyen}</h3>
                                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                                  </div>

                                  
                                  <div className="modal-body px-4">
                                      <div className="row detail_product_admin px-4">
                                          <div className="col-7">
                                            <div id={'t'+t.matuyen} class="carousel slide" data-ride="carousel">
                                              <div class="carousel-inner">
                                                {t.photo?.map((ha,index) =>{
                                                  return(
                                                    <div class={ index===0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                                                      <img src={ha.picture} alt="Los Angeles" style={{width:'100%'}}/>
                                                    </div>
                                                  )
                                                })}
                                              </div>

                                              <a class="carousel-control-prev" href={"#t"+t.matuyen } data-slide="prev">
                                                <span class="carousel-control-prev-icon navigation-icon"></span>
                                              </a>
                                              <a class="carousel-control-next" href={"#t"+t.matuyen } data-slide="next">
                                                <span class="carousel-control-next-icon navigation-icon"></span>
                                              </a>

                                            </div>
                                        </div>
                                          <div className="col-5">
                                            <h5>Describe</h5>
                                            {t.mota}
                                          </div>
                                        <div className="col-12">
                                          <h5>Start location</h5>
                                          {t?.diadiemxp}
                                        </div>
                                        <div className="col-4">
                                            <h5>List hotel</h5>
                                            {t?.datkhachsan?.map(kh =>{
                                              return (
                                                <p> - {kh?.khachsan?.tenks}</p>
                                              )
                                            })}
                                        </div>
                                        <div className="col-4">
                                            <h5>List restaurent</h5>
                                            {t?.datnhahang?.map(nh =>{
                                              return (
                                                <p> - {nh?.nhahang?.tennh}</p>
                                              )
                                            })}
                                        </div>
                                        <div className="col-4">
                                            <h5>Tranportation</h5>
                                            {t?.hinhthucdichuyen?.map(ht =>{
                                              return (
                                                <p> - {ht?.phuongtien?.tenpt}</p>
                                              )
                                            })}
                                        </div>
                                        <div className="col-12" style={{height:'40vh', overflow:'scroll'}}>
                                            <h5>Schedule</h5>
                                            {t?.lichtrinh?.map(lt =>{
                                              return (
                                                <div className="mb-4">
                                                  <p>Location : {lt?.diadiem?.tendiadiem}</p>
                                                  <p>Description : {lt?.diadiem?.mota}</p>
                                                  <hr />
                                                </div>
                                              )
                                            })}
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
