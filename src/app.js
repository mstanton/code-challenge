// Given a standard, circular, twelve-hour analog clock, implement a simple, tested, quality JavaScript application 
// that can, for the input of any time (HH:MM), output the following:
    // * the clockwise angle, in degrees, of the hour hand
    // * the clockwise angle, in degrees, of the minute hand
    // * the acute angle, in degrees, between the hour hand and minute hand

// https://en.wikipedia.org/wiki/Clock_angle_problem :) 

// Sorry for the lack of commenting :()

import React, { Component } from 'react';

import './scss/main.scss';

export default class App extends Component {
    constructor( props ) {
        super( props )

        this.state = {
            timeString: null,
            hourDegrees: null, 
            minDegrees: null, 
            totalDegrees: null
        }

        this.calculateDegrees = this.calculateDegrees.bind( this );
        this.handleInput = this.handleInput.bind( this );
    }

    calculateDegrees( timeString ) { 
        const hours = parseFloat( timeString.slice( 0, 2 ), 10 ) % 12;
        const mins = parseFloat( timeString.slice( 3, 5 ), 10 );

        // Calculate Angle Sums 
        const hourDegrees = 0.5 * ( 60 * hours + mins );
        const minDegrees = 6.0 * mins;
        const totalDegrees =  minDegrees > hourDegrees ? minDegrees - hourDegrees : hourDegrees - minDegrees;

        this.setState({
            timeString: timeString,
            hourDegrees: hourDegrees ? hourDegrees : 0, 
            minDegrees: minDegrees ? minDegrees : 0, 
            totalDegrees: totalDegrees ? totalDegrees : 0,
        });
    };

    handleInput ( event ) {
        let timeString = event.target.value;
        this.calculateDegrees( timeString );
    }

    render() {
        return (
            <div>
                <div className="container app-container">
                    <div className="row">
                        <div className="col-xs-10 app-header">
                            <h1>Code Sample:</h1> 
                            <h3>Clock Angle Problem</h3>
                            <p className="ref-link">-ref: <a href="https://en.wikipedia.org/wiki/Clock_angle_problem">https://en.wikipedia.org/wiki/Clock_angle_problem</a></p>
                        </div>
                    </div>    
                    <div className="row">    
                        <div className="col-xs-4">
                            <form className="form-group form-time">
                                <label>Please enter time</label>            
                                
                                { /* time input type is poorly supported... YOLO */ }
                                <input id="time"
                                    name="time" 
                                    type="time" 
                                    style={ {  } }
                                    className="form-control input-lg time-input"
                                    onChange={ this.handleInput }
                                />

                            </form>
                        </div>
                        <div className="col-xs-7 table-angles-header">
                        <table className="table table-bordered table-condensed">
                                <thead>
                                    <tr>
                                        <th>Units: deg.&deg;</th>
                                        <th>Angle</th>
                                    </tr>
                                </thead>      
                                <tbody>
                                    <tr  className="text-right">
                                        <td>
                                            <span>{ this.state.hourDegrees ? this.state.hourDegrees : 0 }&deg;</span>
                                        </td>
                                        <td>Hour Hand</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>{ this.state.minDegrees ? this.state.minDegrees : 0 }&deg;</span>
                                        </td>
                                        <td>Minute Hand</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>{ this.state.totalDegrees ? this.state.totalDegrees : 0 }&deg;</span>
                                        </td>
                                        <td>Total between clock hands</td>
                                    </tr>
                                </tbody>    
                            </table>   
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

