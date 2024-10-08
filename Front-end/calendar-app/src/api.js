// This code is used to simplify the API calls in the other functions
// This code has all the functions of PULL,PUSH, PUT and DELETE incorporated

const API_BASE_URL = 'http://localhost:4000/api'; 
const {checkEventName, checkEventDescription, checkEventStartDate, checkEventEndDate} = require('./helpers/endpointHelpers.js')

export const fetchEvents = () => {
  return fetch(`${API_BASE_URL}/events`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error fetching events:', error);
      throw error;
    });
};

export const createEvent = (newEvent) => {
  if(checkEventName(newEvent.title) || checkEventDescription(newEvent.description) || checkEventStartDate(newEvent.start) || checkEventEndDate(newEvent.end)){
    return fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  })
    .then((response) => response.json())
    .then((data) => data) 
    .catch((error) => {
      console.error('Error creating event:', error);
      throw error;
    });
  }else{
      console.status(401).send({message: "name not formatted correctly"})
      .catch((error) => {
      console.error('Error creating event:', error);
      throw error;
    });
    }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    window.location.reload();

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.status}`);
    }

    return await response.json(); 
  } catch (error) {
    throw new Error(`Failed to update event: ${error.message}`);
  }
};

export const deleteEvent = async (eventId) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete event: ${errorMessage}`);
  }
};