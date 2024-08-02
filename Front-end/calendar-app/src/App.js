import React, { useState, useEffect } from 'react';
import MyCalendar from './MyCalendar';
import { fetchEvents, createEvent } from './api';
import EventDetailsModal from './EventDetailsModal';
import './styles.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleAddEvent = (newEvent) => {
    createEvent(newEvent)
      .then((createdEvent) => {
        setEvents([...events, createdEvent]);
        setIsEventDetailsModalOpen(false);
      })
      .catch((error) => console.error('Error adding event:', error));
  };

  return (
    <div>
      <MyCalendar
        events={events}
        onAddEvent={handleAddEvent}
        onEventClick={(event) => {
          setSelectedEvent(event);
          setIsEventDetailsModalOpen(true);
        }}
      />

      {isEventDetailsModalOpen && (
        <EventDetailsModal
          isOpen={isEventDetailsModalOpen}
          onRequestClose={() => setIsEventDetailsModalOpen(false)}
          event={selectedEvent}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
};

export default App;
