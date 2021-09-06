import React,{useState, useEffect} from 'react'
import Tour from './Tour'
import * as tuyenApi from '../../../api/TuyenApi'
import './ListTour.css'
export default function ListTour() {
    const [list, setList] = useState([])
    useEffect(async()=>{
        try {
            const data = await tuyenApi.getListTuyen()
            setList(data)
        } catch (error) {
            console.log(error)
        }
    },[])
    return (
        <div className="row list-tour">
            <div className="col-12">
                <p className="list-tour__header">
                    List tour popular in summer of 2021
                </p>
            </div>
            <div className="tour-container">
               {list.map(tuyen =>{
                   return (
                       <Tour tuyen = {tuyen} />
                   )
               })}
            </div>
            
        </div>
    )
}
