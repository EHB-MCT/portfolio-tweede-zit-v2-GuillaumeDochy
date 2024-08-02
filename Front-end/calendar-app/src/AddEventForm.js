// This code is used to display the form used to add an event to the calendar

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const AddEventForm = ({ selectedDate, onAddEvent }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: selectedDate,
    end: selectedDate,
    priority: 'low',
  });

  const handleSubmit = () => {
    onAddEvent(newEvent);
    window.location.reload();
  };

  return (
    <div className="form-container">
      <div>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Event Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
      </div>
      <div>
        <DatePicker
          selected={newEvent.start}
          onChange={(date) => setNewEvent({ ...newEvent, start: date })}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Start Date and Time"
        />
      </div>
      <div>
        <DatePicker
          selected={newEvent.end}
          onChange={(date) => setNewEvent({ ...newEvent, end: date })}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="End Date and Time"
        />
      </div>
      <div>
        <select
          value={newEvent.priority}
          onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Save Event</button>
      </div>
    </div>
  );
};

export default AddEventForm;