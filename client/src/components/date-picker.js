import 'flatpickr/dist/themes/material_green.css'

import React from 'react'
import Flatpickr from 'react-flatpickr'
import { Component } from 'react'

class DatePicker extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }

  render() {
    const { date } = this.state;
    console.log("Date: ", date)
    return (
      <Flatpickr data-enable-time
        value={date}
        options={{
            enableTime: true,
            dateFormat: "Y-m-d H:i:s",
        }}
        onChange={date => { this.setState({date}) }} />
    )
  }
}

export default DatePicker;

