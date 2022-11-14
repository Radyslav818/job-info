import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@mui/material/Pagination";

export function BasicPagination() {
  //   const useStyles = makeStyles((theme) => ({
  //     selected: {
  //       backgroundColor: "transparent",
  //       color: "#19D5C6",
  //     },
  //   }));
  //   // .... rest of code
  //   const classes = useStyles();
  return <Pagination count={18} />;
}
// className={classes.root}
