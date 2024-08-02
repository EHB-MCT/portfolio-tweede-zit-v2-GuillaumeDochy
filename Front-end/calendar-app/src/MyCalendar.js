// This code is the base for the calendar
// This code also implements the selecting of a date by clicking on it
// This code also handles the priority system colors
// This function also handles the implementation of other functions

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import AddEventForm from './AddEventForm';
import EventDetailsModal from './EventDetailsModal';
import EventListModal from './EventListModal';
import { fetchEvents, createEvent, updateEvent } from './api';
import './styles.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  const [isEventListModalOpen, setIsEventListModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };

    fetchData();
  }, []);

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor:
        event.priority === 'low'
          ? 'green'
          : event.priority === 'medium'
          ? 'orange'
          : 'red',
    };
    return {
      style,
    };
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const handleAddEvent = async (newEvent) => {
    const createdEvent = await createEvent(newEvent);
    setEvents([...events, createdEvent]);
  };

  const handleSelectEvent = (event) => {
    console.log("Event selected:", event);
    setSelectedEvent(event);
    setIsEventDetailsModalOpen(true);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      await updateEvent(selectedEvent._id, updatedEvent);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update event:', error);
    }

    setIsEventDetailsModalOpen(false);
  };

  const handleEventListItemClick = (event) => {
    console.log("Event list item clicked:", event);
    if (typeof handleSelectEvent === 'function') {
      handleSelectEvent(event);
      setIsEventListModalOpen(false); 
    } else {
      console.error("handleSelectEvent is not a function");
    }
  };

  const EventComponent = ({ event }) => (
    <span>
      <strong>{moment(event.start).format('HH:mm')} - </strong>
      {event.title}
    </span>
  );

  const sortedEvents = events.slice().sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div>
      <button onClick={handleSelectSlot}>Create Event</button>
      <button onClick={() => setIsEventListModalOpen(true)}>Show All Events</button>
      <Calendar
        localizer={localizer}
        events={sortedEvents}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
        views={['month']}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        components={{
          event: EventComponent,
        }}
      />

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <AddEventForm selectedDate={selectedDate} onAddEvent={handleAddEvent} />
          </div>
        </div>
      )}

      {isEventDetailsModalOpen && (
        <EventDetailsModal
          isOpen={isEventDetailsModalOpen}
          onRequestClose={() => setIsEventDetailsModalOpen(false)}
          event={selectedEvent}
          onAddEvent={handleUpdateEvent}
        />
      )}

      {isEventListModalOpen && (
        <EventListModal
          events={sortedEvents}
          onClose={() => setIsEventListModalOpen(false)}
          onSelectEvent={handleEventListItemClick} 
        />
      )}
    </div>
  );
};

export default MyCalendar;
