import React from 'react'
import './Carousel.css'
export default function Carousel() {
    return (
        <div className="carousel-container">
            <div id="demo" className="carousel slide my-carousel" data-ride="carousel">

           
            <ul className="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" className="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>


            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="carousel-img" src="https://www.saigontourist.net/uploads/sliders/Slider-Dalat.jpg" alt="Los Angeles"/>
                    <div className="carousel-caption">
                        <p className="carousel-caption__describe">Explore Dalat. The land of mist</p>
                        <p className="carousel-caption__title">DALAT'S TOUR</p>
                        <p className="carousel-caption__price">3.400.000 đ</p>
                        <button className="btn btn-outline-light carousel-caption__btn" type="button">View more</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="carousel-img" src="https://www.saigontourist.net/uploads/sliders/slider-templates_PhuQuoc.jpg" alt="Chicago"/>
                    <div className="carousel-caption">
                        <p className="carousel-caption__describe">Phu Quoc where love starts</p>
                        <p className="carousel-caption__title">Phu Quoc'S TOUR</p>
                        <p className="carousel-caption__price">5.400.000 đ</p>
                        <button className="btn btn-outline-light carousel-caption__btn" type="button">View more</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="carousel-img" src="https://www.saigontourist.net/uploads/sliders/Saigontourist-slider-TourDongTayBac_140454723.jpg" alt="New York"/>
                    <div className="carousel-caption">
                        <p className="carousel-caption__describe">Explore the summer</p>
                        <p className="carousel-caption__title">SAPA'S TOUR</p>
                        <p className="carousel-caption__price">7.400.000 đ</p>
                        <button className="btn btn-outline-light carousel-caption__btn" type="button">View more</button>
                    </div>
                </div>
            </div>


            {/* <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
                <span className="carousel-control-next-icon"></span>
            </a> */}

            </div>

            <div className="search">
                 <input type="text" className="search__bar" placeholder="Find tour"/>
                 <span className="search__icon"><i class="fas fa-search"></i></span>
            </div>
        </div>
    )
}
