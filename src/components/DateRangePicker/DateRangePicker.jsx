import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ unavailableDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isUnavailableDate = (date) => {
    return unavailableDates.some(
      (unavailableDate) =>
        date.getTime() === new Date(unavailableDate).getTime()
    );
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        excludeDates={unavailableDates.map((date) => new Date(date))}
        placeholderText="From"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || new Date()}
        excludeDates={unavailableDates.map((date) => new Date(date))}
        placeholderText="To"
      />
    </div>
  );
};

export default DateRangePicker;
