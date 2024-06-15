import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "../layout/layout";
import "./calendar.scss";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import withAuth from "../../withAuth";
import Calendar_items from './calendar_items';
function callendar() {
 
  return (
    <Layout>
     
        <Calendar_items/>
    
    </Layout>
  );
}
export default withAuth(callendar);
