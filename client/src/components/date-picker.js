import 'flatpickr/dist/themes/material_green.css'

import React from 'react'
import Flatpickr from 'react-flatpickr'
import { Component } from 'react'
import { join } from 'path';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.currentDate
    };
    
  }

  render() {
    return (
      <Flatpickr id='flatPickr' data-enable-time
        
        options={{
          defaultDate: this.state.date,
            enableTime: true,
            dateFormat: "F j, Y, H:i",
        }}
        onChange={(date) => { this.setState({date});
                              this.props.sendDate(date);}} 
        onFocus={() => {this.setState({date: this.state.date})
                        this.props.sendDate(this.state.date)}} />
    )
  }
}

export default DatePicker;

