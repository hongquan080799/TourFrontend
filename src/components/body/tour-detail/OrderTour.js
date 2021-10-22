import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import * as tourApi from '../../../api/TourApi'
import { UserContext } from '../../../context/UserContext'
export default function OrderTour() {
    const [state, setState] = useContext(UserContext)
    const [tour, setTour] = useState({})
    const {matour} = useParams()
    const [num, setNum] = useState({nguoilon:1, treem:0})
    const [thamgias, setThamgias] = useState([])
    useEffect(async()=>{
        try {
            const res = await tourApi.getTourById(matour)
            setTour(res)
        } catch (error) {
            
        }
    },[])
    const handleChangeNum = (e)=>{
        const {value, name} = e.target

        setNum({
            ...num,
            [name]:value
        })
    }
    useEffect(()=>{
       let len = Number(num?.nguoilon ) + Number(num?.treem)
       let list = []
        for(let i = 0; i < len ; i++){
            list.push({
                cmnd:'',
                name:'',
                sdt:'',
                email:'',
                loaive: i >=  num?.nguoilon ? 0 : 1
            })
        }
        setThamgias(list)
    }, [num])

    const handleChangeInput = (e, index)=>{
        const {name, value} = e.target

        let list = thamgias

        // for(let i = 0; i< list.length; i++){
        //     if(i == index){
        //         list[i] = {
        //             ...list[i],
        //             [name]:value
        //         }
        //     }
        // }
        const kk = list.map((valu, ind) =>{
            if(index == ind)
            return {
                ...valu,
                [name]: value
            }
            else return {...valu}
        })
        setThamgias(kk)
    }
    const handleDattour = async()=>{
        if(state?.user == null){
            alert('Login để đặt tour !!!')
            return
        }
        let dattour = {
            idTour : tour?.matour,
            trangthai : 1,
            httt : 1,
            soluong : thamgias?.length,
            thamgias,
            thoigian : ''
        }


        try {
            console.log(dattour)
            const res = await tourApi.dattour(dattour)
            alert('Đặt tour thành công !!!')
           // window.location.replace('/')
        } catch (error) {
            alert('Đặt tour thất bại !!!')
        }

    }
    return (
        <div className='tour-detail'>
            <div className="d-flex justify-content-center">
                <div className="" style={{width:'30%', marginRight:'30%'}}>
                    <h4>Số lượng hàng khách</h4>
                    <p>Người lớn</p>
                    <input type="number" className="form-control mb-2 mr-sm-2" min="1" value={num?.nguoilon} name="nguoilon" onChange={handleChangeNum}  />
                    <p>Trẻ em</p>
                    <input type="number" className="form-control mb-2 mr-sm-2" min="0" value={num?.treem} name ="treem" onChange={handleChangeNum} />

                    {thamgias?.map((valu, index) =>{
                        return (
                            <div style={{marginTop:40}}>
                                <h4>Thông tin khách {index + 1} ({valu?.loaive == 1 ? 'Người lớn' : 'Trẻ em'})</h4>
                                {valu?.loaive == 1 ?<input type="text" className="form-control mb-2 mr-sm-2" placeholder="CMND/CCCD" value={valu?.cmnd} name="cmnd" onChange={(e)=> handleChangeInput(e, index)} /> :''}
                                <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Họ và tên" value={valu?.name} name="name" onChange={(e)=> handleChangeInput(e, index)}/>
                                <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Số điện thoại" value={valu?.sdt} name="sdt" onChange={(e)=> handleChangeInput(e, index)}/>
                                <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Email" value={valu?.email} name="email" onChange={(e)=> handleChangeInput(e, index)}/>
                            </div>
                        )
                    })}
                </div>
                <div className="">
                    <h4>Thông tin tour</h4>
                    <div className='tour-info'>
                        <img src={tour?.photo} alt="pt" />
                        <div className="text">
                            <h4>{tour?.tentour}</h4>
                            <p><i class="fas fa-barcode"></i> Mã tour : {tour?.matour}</p>
                            <p><i class="fas fa-calendar-alt"></i> Ngày đi : {tour?.ngaydi}</p>
                            <p><i class="far fa-calendar-alt"></i> Ngày về : {tour?.ngayve}</p>
                            <p><i class="far fa-clock"></i> Thời gian : {tour?.thoigian}</p>
                            <p><i class="fas fa-user-secret"></i> Giá người lớn : {tour?.gianguoilon * num?.nguoilon} $</p>
                            {num?.treem > 0 ? <p><i class="fas fa-child"></i> Giá trẻ em : {tour?.giatreem * num?.treem} $</p> : ''}
                            <h4>Tổng : {tour?.gianguoilon * num?.nguoilon + tour?.giatreem * num?.treem} $</h4>
                        </div>
                       
                    </div>
                    <button className="dattour" onClick={handleDattour}>Đặt tour</button>

                </div>

            </div>
        </div>
    )
}
