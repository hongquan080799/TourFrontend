import React,{useState,useEffect,useRef, useContext} from 'react'
import TourManagement from './TourManagement'
import TourDetail from './TourDetail'
import './index.css'
import {UserContext} from '../../context/UserContext'
import userIcon from './icon.png'
import { useParams, useHistory } from 'react-router-dom'
import NhanvienManagement from './NhanvienManagement'
export default function Index() {
    const [state, setState] = useContext(UserContext)
    const history = useHistory()
    const {id, tuyenID} = useParams()
    const [on,setOn] = useState(false);
    const slideRef = useRef(null)
    useEffect(()=>{
        
    },[on])
    const handleLogout = ()=>{
        setState({})
        window.localStorage.removeItem('jwt')
        window.location.replace('/')
    }
    const handleOn=()=>{
        setOn(!on);
        slideRef.current.classList.toggle("dashboard-on");
    }
    const render = ()=>{
        let page = <TourManagement />
        switch(id){
            case 'index':{
                page = <TourManagement />
                break;
            }
            case 'tuyen':{
                page = <TourManagement />
                break;
            }
            case 'tour':{
                page = <TourDetail matuyen = {tuyenID} />
                break;
            }
            case 'nhanvien':{
                page = <NhanvienManagement />
            }
            
        }
        return page
    }
    return (
        <div className="admin">
            <div className="dashboard" ref={slideRef}>
                <p className={on?"dashboard__admin dashboard__admin-on":'dashboard__admin'}><span className="dashboard__admin-icon"><i class="fas fa-users-cog"></i></span> {!on?'ADMIN PAGE':''}</p>
                <hr className="hr-custom"/>
                <p className={on?'dashboard__item dashboard__item-on active':'dashboard__item active'} onClick={()=> history.push('/admin/tuyen')} >
                    <span className="dashboard__item-icon"><i class="fas fa-list-alt"></i></span> {!on?'Tour Management':''}
                </p>
                <hr className="hr-custom"/>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'}>
                    <span className="dashboard__item-icon"><i class="fas fa-user"></i></span> {!on?'User Management':''}
                </p>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'} onClick={()=> history.push('/admin/nhanvien')}>
                    <span className="dashboard__item-icon"><i class="fas fa-user-friends"></i></span> {!on?'Employee Management':''}
                </p>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'}>
                    <span className="dashboard__item-icon"><i class="fas fa-wallet"></i></span> {!on?'Tour Order':''}
                </p>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'}>
                    <span className="dashboard__item-icon"><i class="fas fa-chart-area"></i></span> {!on?'Chart':''}
                </p>
                <p className={on?'dashboard__item dashboard__item-on':'dashboard__item'} onClick={handleLogout}>
                    <span className="dashboard__item-icon"><i class="fas fa-sign-out-alt"></i></span> {!on?'Logout':''}
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
                    <div className="playground__user"><p className="playground__user-name">Trần Hồng Quân <span className="playground__user-img"><img alt='pt' src={userIcon} /></span></p></div>
                </div>
                <div className="playground__bottom mt-4 ml-4 mr-4">
                    {render()}
                    
                </div>
            </div>
        </div>
    )
}
