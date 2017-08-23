// Given a standard, circular, twelve-hour analog clock, implement a simple, tested, quality JavaScript application 
// that can, for the input of any time (HH:MM), output the following:
    // * the clockwise angle, in degrees, of the hour hand
    // * the clockwise angle, in degrees, of the minute hand
    // * the acute angle, in degrees, between the hour hand and minute hand

// https://en.wikipedia.org/wiki/Clock_angle_problem :) 

// Sorry for the lack of commenting :()

import React, { Component } from 'react';
// import './scss/main.scss';

export default class App extends Component {
    constructor( props ) {
        super( props )

        this.state = {
            timeString: '00:00',
            hourDegrees: null, 
            minDegrees: null, 
            totalDegrees: null
        }

        this.calculateDegrees = this.calculateDegrees.bind( this );
        this.handleInput = this.handleInput.bind( this );
    }

    calculateDegrees( timeString ) { 
        const hours = parseFloat( timeString.slice( 0, 2 ), 10) % 12;
        const mins = parseFloat( timeString.slice( 3, 5 ), 10);

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
                <div className="container" style={ { marginTop: '100px' } }>
                    <div className="row">
                        <div className="col-xs-12">
                            <h2>Code Challenge: Clock Angle Problem</h2>
                            <blockquote style={{ margin: '14px 0px 7px 0px'}}>
                                <p>"Clock angle problems are a type of mathematical problem which involve finding the
                                angles between the hands of an analog clock."</p>
                            </blockquote> 
                            <span className="pull-right">- <a href="https://en.wikipedia.org/wiki/Clock_angle_problem">https://en.wikipedia.org/wiki/Clock_angle_problem</a></span>
   
                        </div>
                        <div className="col-xs-4" style={ { paddingTop: '72px' } }>
                           
                                    <form className="form-group">
                                    <label>Please enter time</label>
                                    
                                    { /* time input type is poorly supported... YOLO */ }
                                    <input name="time" id="time" type="time" style={{ maxWidth: '260px'}}
                                        className="form-control input-lg"
                                        onChange={ this.handleInput }/>
                                    </form>
                            
                        </div>
                        <div className="col-xs-5" style={ { paddingTop: '56px', paddingLeft: '40px' } }>
                        <table className="table table-bordered table-condensed">
                                <thead>
                                    <tr>
                                        <th>Units: deg.&deg;</th>
                                        <th>Measurement</th>
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

