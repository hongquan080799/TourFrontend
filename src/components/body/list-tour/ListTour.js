import React from 'react'
import Tour from './Tour'
import './ListTour.css'
export default function ListTour() {
    return (
        <div className="row list-tour">
            <div className="col-12">
                <p className="list-tour__header">
                    List tour popular in summer of 2021
                </p>
            </div>
            <div className="tour-container">
                <Tour />
                <Tour />
                <Tour />
                <Tour />
                <Tour />
                <Tour />
                <Tour />
                <Tour />
            </div>
            
        </div>
    )
}
