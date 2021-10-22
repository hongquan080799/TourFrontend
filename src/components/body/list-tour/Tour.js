import React from 'react'
import './Tour.css'
import { useHistory } from 'react-router-dom';
export default function Tour({tuyen}) {
    const history = useHistory()
    const getPrice = ()=>{
        let price = 0;
        let i = 0
        tuyen?.tour?.forEach(value => {
            price += value.gianguoilon
            i++
        });
        return price/i
    }
    return (
        <div className="tour" onClick={()=> history.push(`/tuyen/${tuyen?.matuyen}`)}>
            <img alt="pt" class="tour__img" src={tuyen?.photo[0]?.picture} />
            <p className="tour__name">{tuyen.tentuyen}</p>
            <div className="tour__info">
                <p>Schedule : {tuyen?.thoigian}</p>
                <p>Avalable : {tuyen?.tour?.length} </p>
            </div>
            {isNaN(getPrice())?'':<p className="tour__price">{getPrice().toFixed(2)} $ <span className="tour__price-not-discount">{getPrice().toFixed(2)} $</span></p>} 
            
        </div>
    )
}
