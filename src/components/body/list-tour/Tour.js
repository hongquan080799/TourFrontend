import React from 'react'
import './Tour.css'
export default function Tour() {
    return (
        <div className="tour">
            <img alt="pt" class="tour__img" src="https://www.saigontourist.net/uploads/destination/TrongNuoc/Condao/con-dao-beach.jpg" />
            <p className="tour__name">Tour Con dao Summer 2021</p>
            <div className="tour__info">
                <p>Schedule : 5 days 4 nights</p>
                <p>Start day : 22/06/2021</p>
                <p>Avalable : 2 </p>
            </div>
            <p className="tour__price">8.399.000 đ <span className="tour__price-not-discount">9.000.000 đ</span></p> 
            
        </div>
    )
}
