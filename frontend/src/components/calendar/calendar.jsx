import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Layout from "../layout/layout"
import "./calendar.scss"
import Grid from '@mui/material/Unstable_Grid2/Grid2';
function callendar() {
  const [date, setdate] = useState();
  const [title,setTitle] = useState();
    const handlechange = (date)=>{
        setdate(date.toLocaleDateString('pl-US'))
    }
  return (
    <Layout>
      <div className='CalendarSection'>
      <Grid container>
        <Grid item xs={12} lg={6}>
      <Calendar onChange={(value) => handlechange(value)} value={date} />

      </Grid>
      <Grid item xs={12} lg={6}>
      <div className="Control">
        <p>Data</p>
        <input type="text" className="input" disabled value={date}/>
        <p>Nazwa wydarzenia</p>
        <input type="text" className="input" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
        <button className='button'>Dodaj wydarzenie</button>
      </div>
      </Grid>
      </Grid>
      </div>
    </Layout>
  );
}
export default callendar;