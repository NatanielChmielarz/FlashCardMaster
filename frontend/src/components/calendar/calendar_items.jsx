import React, { useState, useEffect } from "react";
import { getEvents, deleteEvent, markAsCompleted, createEvent } from "../api";
import "./calendar.scss";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      const data = await getEvents(filter);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleMarkAsCompleted = async (id) => {
    try {
      await markAsCompleted(id);
      fetchEvents();
    } catch (error) {
      console.error("Error marking event as completed:", error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await createEvent({ title, date });
      setTitle("");
      setDate("");
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="container">
      <h1>Events</h1>
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <form onSubmit={handleAddEvent}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {events.map((event) => (
          <li  key={event.id}>
            <span>
              {event.title} - {event.date}
            </span>
            <div className="Event_Element">
            <button onClick={() => handleMarkAsCompleted(event.id)}>
              {event.is_active ? "Mark as Completed": "Unmark as Completed" }
              
            </button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
