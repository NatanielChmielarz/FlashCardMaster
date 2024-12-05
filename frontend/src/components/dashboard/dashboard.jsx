import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import withAuth from "../../withAuth.jsx";
import Layout from "../layout/layout";
import {
  fetchData,
  createNote,
  getEvents,
  searchNoteByKeyword ,
} from "../api.js";
import Item from "./item";
import "./dashboard.scss";
import Box from "./box";
const Dashboard = () => {
  const [value, setValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [events, setEvents] = useState([]);
  const [keywordSearch, setkeywordSearch] = useState([]);
  const [keyword, setkeyword] = useState("");
  const getSerchData = async () => {
    try {
      const response = await searchNoteByKeyword (keyword); // Oczekujemy, że odpowiedź zawiera obiekt z polem 'notes_ids'

      if (response && response.notes_ids && Array.isArray(response.notes_ids)) {
        // Przekształcamy tablicę notes_ids na tablicę obiektów
        const formattedData = response.notes_ids.map((item) => ({
          id: item[0], // item[0] to id
          title: item[1], // item[1] to title
        }));
        setkeywordSearch(formattedData); // Ustawiamy dane w stanie
      } else {
        setkeywordSearch([]); // Jeśli nie ma wyników, ustaw pustą tablicę
      }
    } catch (error) {
      console.error("Błąd podczas wyszukiwania:", error);
      setkeywordSearch([]); // Jeśli wystąpił błąd, ustaw pustą tablicę
    }
  };
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
  const handleKeywordChange = (e) => {
    setkeyword(e.target.value);
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
          {events.length > 0 ? (
            <div>
              {events.map((event) => (
                <p key={event.id}>
                  <span>
                    <strong>{event.title}</strong> - {event.date}
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p>Brak nadchodzących wydarzeń</p>
          )}
        </div>
      </Box>

      <Box
        nth={"second"}
        Text={"Notes"}
        leftcolor={["#FEEDEB", "#F84F39"]}
        rightcolor="#F84F39"
      >
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
      <div className="filtering">
        <h1>Can't find your notes?</h1>
        <p>Enter the keyword that you are looking for!</p>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          onChange={handleKeywordChange}
          value={keyword}
          placeholder="Find notes.."
        />
        <button
          className="button"
          onClick={async () => {
            await getSerchData();
          }}
        >
          Search
        </button>
        <div className="elements">
          {keywordSearch.length > 0 ? (
            keywordSearch.map((element) => (
              <div key={element.id}>
                <Item title={element.title} id={element.id} />
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(Dashboard);
