import React,{useEffect, useState} from 'react'
import './TourDetail.css'
import * as tuyenApi from '../../../api/TuyenApi'
import { useParams } from 'react-router-dom'
export default function TourDetail() {
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
                    <div className="detail__info__price">
                        <div className="detail__info__price-discount">
                            Giá từ {getPrice()} đ <span className="detail__info__price-raw">{getPrice()} đ</span>
                        </div>
                        <button className="detail__info_price_btn">
                            LIÊN HỆ
                        </button>
                    </div>

                </div>
                <div className="detail__info__describe">
                    <p className="detail__info__describe__header">
                        Chi tiết hành trình
                    </p>
                    <p className="detail__info__describe__body">
                    Miền Bắc là nơi khởi nguồn văn hóa ngàn năm văn hiến của dân tộc Việt Nam.
                     Du lịch miền Bắc du khách sẽ được khám phá những thắng cảnh thiên nhiên đẹp
                      mê hồn cùng nhiều công trình kiến trúc ấn tượng được tạo nên bởi bàn tay khéo
                       léo của con người. Điểm du lịch Tràng An là nơi du khách sẽ được khám phá một
                        trong những địa điểm du lịch đẹp nhất Ninh Bình. Tạo hóa đã vô cùng ưu ái ban tặng
                         cho nơi đây một cảnh quan thiên nhiên tuyệt đẹp với các dãy núi uốn lượn bao quanh 
                         các dòng Suối nước tự nhiên, tạo nên vô vàn các hang động kỳ ảo, huyền bí.... Cùng Du Lịch Việt
                          khám phá những địa điểm du lịch miền bắc hấp dẫn nhất như Hà Nội - Yên Tử - Hạ Long - Chùa Bái Đính - 
                          Tràng An - Sapa - Bản Cát Cát - Đỉnh Fansipan,... để bắt đầu lên kế hoạch cho chuyến du lịch ngay nhé!
                    </p>
                </div>
                <div className="detail__info__schedule">
                    <p className="detail__info__schedule__header">
                        Chi tiết hành trình
                    </p>
                    <p className="detail__info__schedule__body">
                    Miền Bắc là nơi khởi nguồn văn hóa ngàn năm văn hiến của dân tộc Việt Nam.
                     Du lịch miền Bắc du khách sẽ được khám phá những thắng cảnh thiên nhiên đẹp
                      mê hồn cùng nhiều công trình kiến trúc ấn tượng được tạo nên bởi bàn tay khéo
                       léo của con người. Điểm du lịch Tràng An là nơi du khách sẽ được khám phá một
                        trong những địa điểm du lịch đẹp nhất Ninh Bình. Tạo hóa đã vô cùng ưu ái ban tặng
                         cho nơi đây một cảnh quan thiên nhiên tuyệt đẹp với các dãy núi uốn lượn bao quanh 
                         các dòng Suối nước tự nhiên, tạo nên vô vàn các hang động kỳ ảo, huyền bí.... Cùng Du Lịch Việt
                          khám phá những địa điểm du lịch miền bắc hấp dẫn nhất như Hà Nội - Yên Tử - Hạ Long - Chùa Bái Đính - 
                          Tràng An - Sapa - Bản Cát Cát - Đỉnh Fansipan,... để bắt đầu lên kế hoạch cho chuyến du lịch ngay nhé!
                    </p>
                </div>
            </div>
        </div>
    )
}
