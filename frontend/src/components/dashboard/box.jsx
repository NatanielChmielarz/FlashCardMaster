import React, { Children } from "react";
import Grid from "@mui/material/Grid";
import "./BoxsStyle.scss"
const box = ({Text,nth , leftcolor,rightcolor,children}) =>{
    return (
        <Grid container sm={12} className="mainbox">

        <Grid item lg={6} md={6} sm={12} xs={12}>  
        <div className={`leftbox ${"leftbox"+nth}`} style={{"background":leftcolor[0]}}>
            <h1 style={{"color":leftcolor[1]}}>{Text}</h1>
        </div>
        </Grid>  
        <Grid item lg={6} md={6} sm={12} xs={12}>  
        <div className={`rightbox ${"rightbox"+nth}`} style={{"background":rightcolor}}>
        {children}
        </div>
        </Grid>   
        </Grid>
    )
}


export default box;