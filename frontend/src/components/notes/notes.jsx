
import Editor from "./editor.jsx"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2 
import Layout from "../layout/layout.jsx"
import withAuth from '../../withAuth';
import Flashcardmenu from '../flashcards/flashcardmenu.jsx'
import { fetchNote, updateNote,deleteNote } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
const notes = ( ) =>{

  const [noteData, setNoteData] = useState(
    {
      title: "",
      content: "",
      flashcards_count: 0
    }
  );
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNote(id);
        setNoteData({
          title: data.title,
          content: data.content,
          flashcards_count: data.flashcards_count
        });
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
        navigate("/")
      }
    };

    fetchData();
  }, [id, navigate]);

  const sendUpdate = async () => {
    try {
      await updateNote(id, noteData.title, noteData.content);
    } catch (error) {
      console.error("Błąd aktualizacji danych:", error);
    }
  };
  const handleDelete = ()=>{
    try {
        deleteNote(id);
         navigate("/")
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
     
    }
  }
  return(
    <Layout>
    <Grid container>
    <Grid item lg={8} md={12}>
       <Editor data={noteData} setdata={setNoteData} update_note={sendUpdate} delete_note={handleDelete} id={id}/>
    </Grid>
    <Grid item lg={4} md={12}>
       <Flashcardmenu color={"#2A966F"} id={id} flashcards={noteData.flashcards_count}/>
    </Grid>
    </Grid></Layout>
  )
}
export default withAuth(notes)