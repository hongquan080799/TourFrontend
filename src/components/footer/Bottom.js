import React from 'react'
import './Bottom.css'
export default function Bottom(){
    return (
        <div className='bottom'>
            <div className='container '>
                <div className='row text-center '>
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left mt-4 px-4'>
                        <h4>LIÊN HỆ</h4>
                        <p className="contact-1"><i className="fa fa-envelope mr-2" aria-hidden="true"></i> hongquan080799@gmail.com</p>
                        <p className="contact-1"><i className="fa fa-phone-square mr-2" aria-hidden="true"></i>0336781801</p>
                        <p className="contact-1"><i className="fa fa-map-marker mr-2" aria-hidden="true"></i>97 Man Thiện Q.9 TPHCM</p>

                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left mt-4 px-4'>
                        <h4>TRỢ GIÚP NHANH</h4>
                        <p className='section'>Hướng dẫn thanh toán</p>
                        <p className='section'>Liên hệ</p>
                        <div className='contact'>
                            <i class="fab fa-facebook"></i>
                            <i className="fab fa-twitter" aria-hidden="true"></i>
                            <i class="fas fa-address-book"></i>
                        </div>
                        
                    </div> 
                    <div className='col-sm-12 col-md-6 col-lg-3 text-left mt-4 px-4'>
                        <h4>CHÍNH SÁCH CÔNG TY</h4>
                        <p className='section'>Chính sách và quy định chung</p>
                        <p className='section'>Chính sách hoàn tiền</p>
                        <p className='section'>Chính sách bảo mật thông tin</p>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3 px-4 text-left mt-4'>
                        <img src="https://dulichviet.com.vn/thumbs/0/278x229/images/bandidau/NOI-DIA/Ha-Noi/du-lich-cat-ba-dip-le-30-4-du-lich-viet(1).jpg" alt='pictur' className="rounded"></img>
                    </div>
                </div>
            </div>
            <footer className='text-center mt-4'>
                <span className="copyright"> &copy; 2021 DulichTour</span>
                <div>CÔNG TY TNHH DU LỊCH VIỆT T&P Số ĐKKD: 0105957237
                    - Ngày cấp: 31/07/2012, được sửa đổi lần thứ 7, ngày 15/06/2015
                </div>
            </footer>
        </div>
    )
}