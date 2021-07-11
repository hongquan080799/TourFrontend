import React from 'react'
import './TourDetail.css'
export default function TourDetail() {
    return (
        <div className="tour-detail">
            <div className="row">
                <div className="col-12">
                    <p className="tour-detail__header">
                        DU LỊCH CÔN ĐẢO BẰNG PHÀ TỪ THÀNH PHỐ HỒ CHÍ MINH 
                    </p>
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-7">
                    <img alt="pt" className="tour-detail__img" src="https://www.saigontourist.net/uploads/destination/TrongNuoc/Condao/con-dao-beach.jpg"/>
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-5" >
                   <div className="detail__info">
                   <p className="detail__info__header">Du lịch côn đảo bằng phà từ thành phố Hồ Chí Minh</p>
                    <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td className="detail__info__label">Mã tour</td>
                          <td className="detail__info__value">15704</td>
                        </tr>
                        <tr>
                          <td className="detail__info__label">Thời gian</td>
                          <td className="detail__info__value">6 ngày 5 đêm</td>
                        </tr>
                        <tr>
                          <td className="detail__info__label">Khởi hành</td>
                          <td className="detail__info__value">03,10,17,24/04 ; 08,15,22/05 </td>
                        </tr>
                        <tr>
                          <td className="detail__info__label">Vận chuyển</td>
                          <td className="detail__info__value">Xe du lịch, Máy bay</td>
                        </tr>
                        <tr>
                          <td className="detail__info__label">Xuất phát</td>
                          <td className="detail__info__value">Thành phố Hồ Chí Minh</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                   </div>
                    <div className="detail__info__price">
                        <div className="detail__info__price-discount">
                            Giá từ 8,399,000 đ <span className="detail__info__price-raw">8,500,000 đ</span>
                        </div>
                        <button className="detail__info_price_btn">
                            ĐẶT TOUR
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
