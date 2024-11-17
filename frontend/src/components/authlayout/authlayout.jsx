import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid 2
import PropTypes from "prop-types";
import "./layout.scss";

export default function AuthLayout({ leftContent, rightContent }) {
  return (
    <div className="auth-layout">
      <Grid container>
        {/* Left Panel */}
        <Grid
          item
          xs={12}
          md={6}
          className="left-panel"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {leftContent}
        </Grid>

        {/* Right Panel */}
        <Grid
          item
          xs={12}
          md={6}
          className="right-panel"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {rightContent}
        </Grid>
      </Grid>
    </div>
  );
}

AuthLayout.propTypes = {
  leftContent: PropTypes.node.isRequired, // Content for the left panel
  rightContent: PropTypes.node.isRequired, // Content for the right panel
};