import React,{useState,useEffect,useRef} from 'react'
import TourManagement from './TourManagement'
import './index.css'
export default function Index() {
    const [on,setOn] = useState(false);
    const slideRef = useRef(null)
    useEffect(()=>{
        
    },[on])
    const handleOn=()=>{
        setOn(!on);
        slideRef.current.classList.toggle("dashboard-on");
    }
    return (
        <div className="admin">
            <div className="dashboard" ref={slideRef}>
                <p className={on?"dashboard__admin dashboard__admin-on":'dashboard__admin'}><span className="dashboard__admin-icon"><i class="fas fa-users-cog"></i></span> {!on?'ADMIN PAGE':''}</p>
                <hr className="hr-custom"/>
                <p className={on?'dashboard__item dashboard__item-on active':'dashboard__item active'} >
                    <span className="dashboard__item-icon"><i class="fas fa-list-alt"></i></span> {!on?'Tour Management':''}
                </p>
                <hr className="hr-custom"/>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'}>
                    <span className="dashboard__item-icon"><i class="fas fa-user"></i></span> {!on?'User Management':''}
                </p>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'}>
                    <span className="dashboard__item-icon"><i class="fas fa-user-friends"></i></span> {!on?'Employee Management':''}
                </p>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'}>
                    <span className="dashboard__item-icon"><i class="fas fa-wallet"></i></span> {!on?'Tour Order':''}
                </p>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'}>
                    <span className="dashboard__item-icon"><i class="fas fa-chart-area"></i></span> {!on?'Chart':''}
                </p>
                
                <div className={on?"dashboard__utils-on":'dashboard__utils'} onClick={handleOn}> &#60; </div>
            </div>
            <div className={on?"playground playground-on":'playground'}>
                <div className="playground__top">
                    <p className="playground__top__header"><span className="playground__top__header-icon" ><i class="fas fa-smile-wink"></i></span> HAPPY TOUR</p>
                    <div className="find-admin">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search"/>
                            <div class="input-group-append">
                                <button class="btn btn-info" type="submit"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="playground__user"><p className="playground__user-name">Trần Hồng Quân <span className="playground__user-img"><img alt='pt' src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-1/p160x160/79771446_2469549519965437_8172007245870006272_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=7206a8&_nc_ohc=1ZCd5epk1FMAX_LTrl5&_nc_ht=scontent-sin6-4.xx&tp=6&oh=38f18e8325cd36ea960ec2aa24e015c3&oe=60CB87D2" /></span></p></div>
                </div>
                <div className="playground__bottom mt-4 ml-4 mr-4">
                    <TourManagement />
                    
                </div>
            </div>
        </div>
    )
}
