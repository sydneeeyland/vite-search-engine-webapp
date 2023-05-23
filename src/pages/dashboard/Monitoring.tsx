import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  {
    cell: () => <SearchIcon style={{ fill: "#43a047" }} />,
    width: "56px", // custom width for icon button
    style: {
      borderBottom: "1px solid #FFFFFF",
      marginBottom: "-1px",
    },
  },
  {
    name: "Student ID / Name",
    selector: (row: any) => row?.user,
    sortable: true,
  },
  {
    name: "Search Param",
    selector: (row?: any) => row?.param,
    sortable: true,
  },
];

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

function Monitoring() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  async function Poll() {
    const res = await fetch("http://localhost:5000/search/feed");
    const data = await res.json();

    if (data !== undefined) {
      setFeed(data);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      Poll();
    }, 1000);
    return () => {
      setLoading(false);
      clearInterval(interval);
    };
  }, [feed]);

  return (
    <Box>
      <DataTable
        title="Search Feed"
        columns={columns}
        data={feed}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        pagination
        progressPending={loading}
      />
    </Box>
  );
}

export default Monitoring;
