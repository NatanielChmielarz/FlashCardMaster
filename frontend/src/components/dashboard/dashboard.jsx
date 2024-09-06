import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import withAuth from "../../withAuth.jsx";
import Layout from "../layout/layout";
import { fetchData, createNote, getEvents } from "../api.js";
import Item from "./item";
import "./dashboard.scss";
import Box from "./box";
const Dashboard = () => {
  const [value, setValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [events, setEvents] = useState([]);
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
  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter and paginate items
  const filteredItems = value
    ? value.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <Layout>
      <Box
      nth={"first"}
        Text={"Upcoming events"}
        leftcolor={["#F3F2FA", "#6B66DA"]}
        rightcolor="#6B66DA"
      >
        <div className="Events-list">
          {console.log(events)}
          {events.length > 0 ? (
            <div>
              {events.map((event) => (
                <p key={event.id} >
                  <span >
                    <strong >{event.title}</strong> - {event.date}
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p>Brak nadchodzących wydarzeń</p>
          )}
        </div>
      </Box>

      <Box nth={"second"} Text={"Notes"} leftcolor={["#FEEDEB", "#F84F39"]} rightcolor="#F84F39">
      <div className="content-box dynamic-height">
        <div className="notes-bar">
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
          <button
            className="button"
            onClick={async () => {
              await createNote();
              getData();
            }}
          >
            Add new note
          </button>
        </div>
        <div className="itemList">
          {paginatedItems.map((element) => (
            <div key={element.id}>
            <Item title={element.title} id={element.id} />
            </div>
          ))}
        </div>

        
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
           
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Box>
    </Layout>
  );
};

export default withAuth(Dashboard);
