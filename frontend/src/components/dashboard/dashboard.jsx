import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import withAuth from "../../withAuth.jsx";
import Layout from "../layout/layout";
import { fetchData, createNote } from "../api.js";
import Item from "./item";
import "./dashboard.scss";

const Dashboard = () => {
  const [value, setValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
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
            <p>20.06.2024 - Zaliczenie angielski</p>
            <p>25.06.2024 - Egzamin wos</p>
            <p>30.06.2024 - Zaliczenie matematyki</p>
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
        <Grid item lg={12} container md={12}
              sm={12}>
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
            <Grid
            item
              container
              spacing={2}
              
             
              className="item-container"
            >
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
