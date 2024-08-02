// This function handles the button used to display all the current events in the calendar

import React from 'react';
import moment from 'moment';
import './styles.css'; 

function EventListModal({ events, onClose, onSelectEvent }) {
  const sortedEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));

  const handleEventClick = (event) => {
    console.log("Event clicked:", event);
    if (typeof onSelectEvent === 'function') {
      onSelectEvent(event);
    } else {
      console.error("onSelectEvent is not a function");
    }
  };

  return (
    <div className="modal visible">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>All Events</h2>
        <ul className="event-list">
          {sortedEvents.map((event, index) => (
            <li key={index} className={`event-item event-priority-${event.priority}`} onClick={() => handleEventClick(event)}>
              <h3>{event.title}</h3>
              <p>{new Date(event.start).toLocaleDateString()}</p>
              <p>{event.description}</p>
              <p>{moment(event.start).format('HH:mm')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventListModal;