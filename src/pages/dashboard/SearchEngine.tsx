import { useEffect, useState } from "react";

import {
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
  Button,
  Snackbar,
} from "@mui/material";
import DataTable from "react-data-table-component";

import SearchIcon from "@mui/icons-material/Search";

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

function SearchEngine() {
  const [searchData, setSearchData] = useState([]);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({
    url: "",
    header: "",
    metadata: "",
    visible: true,
  });
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const searchEngine = async () => {
      const res = await fetch("http://localhost:5000/search/get");
      const data = await res.json();
      console.log(data);
      setSearchData(data.data);
    };
    searchEngine();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/search/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setOpen(false);
    setMessage(data.message);
    setShowDialog(true);
  };

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
      name: "Url",
      selector: (row: any) => row?.url,
      width: "250px",
      sortable: true,
    },
    {
      name: "Header",
      selector: (row?: any) => row?.header,
      width: "250px",
      sortable: true,
    },
    {
      name: "Metadata",
      selector: (row?: any) => row?.metadata,
      width: "800px",
      sortable: true,
    },
    {
      cell: (row: any) => (
        <Stack direction="row" spacing={1}>
          {!row?.visible && (
            <button id={row?.id} className="btn btn-sm btn-success">
              <i className="bi bi-check-circle p-1" />
              Show
            </button>
          )}
        </Stack>
      ),
      allowOverflow: false,
      button: true,
      width: "200px",
    },
  ];

  console.log(payload);
  return (
    <Box>
      <button
        className="btn btn-secondary float-end mb-3"
        onClick={() => setOpen(true)}
      >
        <i className="bi bi-plus-circle p-1" />
        Add Searchable
      </button>
      <DataTable
        title="Search Feed"
        columns={columns}
        data={searchData}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        pagination
        // progressPending={loading}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create searchable"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="column" component="div">
              <Typography component="label">URL</Typography>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) =>
                  setPayload((prevState) => ({
                    ...prevState,
                    url: e.target.value,
                  }))
                }
              />
              <Typography component="label">Header</Typography>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) =>
                  setPayload((prevState) => ({
                    ...prevState,
                    header: e.target.value,
                  }))
                }
              />
              <Typography component="label">Metadata</Typography>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) =>
                  setPayload((prevState) => ({
                    ...prevState,
                    metadata: e.target.value,
                  }))
                }
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="error"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={() => handleSubmit()}
            autoFocus
            color="primary"
            variant="outlined"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showDialog}
        onClose={() => setShowDialog(false)}
        message={message}
      />
    </Box>
  );
}

export default SearchEngine;
