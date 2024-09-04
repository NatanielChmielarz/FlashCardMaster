import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import withAuth from "../../withAuth.jsx";
import Layout from "../layout/layout";
import { fetchData, createNote, getEvents } from "../api.js";
import Item from "./item";
import "./dashboard.scss";

const Dashboard = () => {
  const [value, setValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        const events_data = await getEvents("active");
        const sortedEvents = events_data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        // Take only the first 3 events closest to today's date
        const upcomingEvents = sortedEvents.slice(0, 3);
        setEvents(upcomingEvents);

        setValue(data);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
        // Obsługa błędów
      }
    };

    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item md={7} sm={12}>
          <div className="content-box">
            <h1>Nadchodzące wydarzenia</h1>
            {console.log(events)}
            {events.length > 0 ? (
                <div>
                  {events.map((event) => (
                    <p key={event.id}>
                      <span>
                        {event.title} - {event.date}
                      </span>
                    </p>
                  ))}
                </div>
              ) : 
              (<p>Brak nadchodzących wydarzeń</p>)
            }
          </div>
        </Grid>
        <Grid item md={5} sm={12}>
          <div className="content-box">
            <h1>Statystyki</h1>
            <p>Ilość notatek: {value ? value.length : "Ładowanie..."} </p>
            <p>Ilość fiszek: 0</p>
            <p>Ukończone wyzwanie fiszkowe: 0</p>
          </div>
        </Grid>
        <Grid container item lg={12} md={12} sm={12}>
          <div className="content-box dynamic-height">
            <div className="notes-bar">
              <h1>Notes</h1>
              <div className="input-box">
                <input
                  type="search"
                  name="search-form"
                  id="search-form"
                  className="search-input"
                  onChange={handleSearchChange}
                  value={searchTerm}
                  placeholder="Search notes.."
                />
              </div>
              <button className="button" onClick={createNote}>
                Add new note
              </button>
            </div>
            <Grid container spacing={2}>
              {value &&
                value
                  .filter((item) =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((element) => (
                    <Grid item md={4} sm={12} key={element.id}>
                      <Item title={element.title} id={element.id} />
                    </Grid>
                  ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default withAuth(Dashboard);
