import React from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ page, setPage, totalPages }) => {
  return (
    <Pagination
      
      count={totalPages}
      page={page}
      onChange={(e, value) => {
        setPage({ page: +value });
      }}
    />
  );
};

export default PaginationComponent;