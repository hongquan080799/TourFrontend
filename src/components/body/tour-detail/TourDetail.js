import React,{useEffect, useState} from 'react'
import './TourDetail.css'
import * as tuyenApi from '../../../api/TuyenApi'
import { useParams, useHistory } from 'react-router-dom'
export default function TourDetail() {
    const history = useHistory()
    const [tuyen, setTuyen] = useState({})
    const {matuyen} = useParams()
    const getPrice = ()=>{
        let price = 0;
        let i = 0
        tuyen?.tour?.forEach(value => {
            price += value.gianguoilon
            i++
        });
        return price/i
    }
    useEffect(async ()=>{
        try {
            const data = await tuyenApi.getTuyen(matuyen)
            setTuyen(data)
        } catch (error) {
            console.log(error)
        }
    },[])
    const getListKhoihang = ()=>{
        let data = ''
        tuyen?.tour?.forEach((value, index) => {
            if(index == 0)
                data += value?.tgbd
            else
                data += ', ' + value?.tgbd
        } )
        return data
    }
    return (
        <div className="tour-detail">
            <div className="row">
                <div className="col-12">
                    <p className="tour-detail__header">
                        {tuyen?.tentuyen}
                    </p>
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-7">
                    <div id="quan" class="carousel slide" data-ride="carousel">


                        <div class="carousel-inner">
                            {tuyen?.photo?.map((value, index)=>{
                                return(
                                    <div class={index == 0 ?"carousel-item active":"carousel-item"}>
                                        <img src={value?.picture} alt="Los Angeles" className="w-100" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#quan" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#quan" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>

                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-5" >
                   <div className="detail__info">
                   <p className="detail__info__header">{tuyen?.tentuyen}</p>
                    <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td className="detail__info__label">Mã tuyến</td>
                          <td className="detail__info__value">{tuyen?.matuyen}</td>
                        </tr>
                        <tr>
                          <td className="detail__info__label">Thời gian</td>
                          <td className="detail__info__value">{tuyen?.thoigian}</td>
                        </tr>
                        <tr>
                          <td className="detail__info__label">Khởi hành</td>
                          <td className="detail__info__value">{getListKhoihang()} </td>
                        </tr>
                        <tr>
                          <td className="detail__info__label">Vận chuyển</td>
                          <td className="detail__info__value">Xe du lịch, Máy bay</td>
                        </tr>
                        <tr>
                          <td className="detail__info__label">Xuất phát</td>
                          <td className="detail__info__value">{tuyen?.diadiemxp}</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                   </div>
                   {!isNaN(getPrice()) ?
                    <div className="detail__info__price">
                        <div className="detail__info__price-discount">
                            Giá {getPrice()} $ <span className="detail__info__price-raw">{getPrice().toFixed(2)} $</span>
                        </div>
                        <button className="detail__info_price_btn">
                            LIÊN HỆ
                        </button>
                    </div> :'' }

                </div>
                <div className="mt-4 col-12 detail__info__describe">
                    <h5 className="detail__info__describe__header">Danh sách tour</h5>
                    <div className="table-responsive">
                    <table className="table table-sm table-hover mt-2">
                      <thead>
                        <tr>
                          <th scope="col">Khởi hàng</th>
                          <th scope="col">Mã tour</th>
                          <th scope="col">Giá người lớn</th>
                          <th scope="col">Giá trẻ em</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tuyen?.tour?.map(t =>{
                            if(new Date(t?.tgbd) >= new Date())
                            return(
                                <tr>
                                    <td>{t?.tgbd}</td>
                                    <td>{t?.matour}</td>
                                    <td>{t?.gianguoilon} $</td>
                                    <td>{t?.giatreem} $</td>
                                    <td><button className="btn btn-info" onClick={()=> history.push('/dattour/' + t?.matour)}>Đặt tour</button></td>
                                </tr>
                            )
                        })}
                      </tbody>
                    </table>
                    </div>
                    
                    
                </div>
                <div className="mt-4 col-12">
                    <h5>
                        Chi tiết hành trình
                    </h5>
                    <p >
                    {tuyen?.lichtrinh?.map(lt =>{
                        return (
                            <div>
                                {lt?.mota}
                            </div>
                        )
                    })}
                    </p>
                </div>
            </div>
        </div>
    )
}
