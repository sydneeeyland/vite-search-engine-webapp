import { useEffect, useState } from "react";

import {
  Box,
  Stack,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import DataTable from "react-data-table-component";
import PersonIcon from "@mui/icons-material/Person";

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

function Users() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  async function Poll() {
    const res = await fetch("http://localhost:5000/auth/list");
    const data = await res.json();

    if (data !== undefined) {
      setFeed(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    Poll();
  }, []);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const generatePassword = () => {
    setPassword((Math.random() + 1).toString(36).substring(6));
  };

  const handleRegister = () => {
    const payload = {
      studentId: studentId,
      password: password,
      studentName: studentName,
      restricted: false,
      role: "student",
    };

    fetch("http://localhost:5000/auth/register", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowDialog(false);
        setState({ ...state, open: true });
        setMessage("Registration Success");
      });
  };

  const handlePermission = async (restrict: boolean, id: string) => {
    const payload = {
      restrict,
      id,
    };

    const res = await fetch("http://localhost:5000/auth/permission", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setState({ ...state, open: true });
    setMessage(data.message);
  };

  const columns = [
    {
      cell: () => <PersonIcon style={{ fill: "#43a047" }} />,
      width: "56px", // custom width for icon button
      style: {
        borderBottom: "1px solid #FFFFFF",
        marginBottom: "-1px",
      },
    },
    {
      name: "Student ID",
      selector: (row: any) => row?.studentId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row?: any) => row?.studentName,
      sortable: true,
    },
    {
      name: "Restricted",
      selector: (row?: any) => (row?.restricted === true ? "Yes" : "No"),
      sortable: true,
    },
    {
      cell: (row: any) => (
        <Stack direction="row" spacing={1}>
          {row?.restricted ? (
            <button
              id={row?.id}
              className="btn btn-sm btn-success"
              onClick={() => handlePermission(false, row?._id)}
            >
              <i className="bi bi-check-circle p-1" />
              Grant
            </button>
          ) : (
            <button
              id={row?.id}
              className="btn btn-sm btn-danger"
              onClick={() => handlePermission(true, row?._id)}
            >
              <i className="bi bi-x-octagon p-1" />
              Restrict
            </button>
          )}
        </Stack>
      ),
      allowOverflow: false,
      button: true,
      width: "200px",
    },
  ];

  return (
    <Box>
      <button
        className="btn btn-secondary float-end mb-3"
        onClick={() => setShowDialog(true)}
      >
        <i className="bi bi-plus-circle p-1" />
        Register
      </button>
      <DataTable
        title="Users"
        columns={columns}
        data={feed}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        pagination
        progressPending={loading}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Register a User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="column" component="div">
              <Typography component="label">Student ID</Typography>
              <input
                type="number"
                className="form-control mb-3"
                onChange={(e) => setStudentId(e.target.value)}
              />
              <Typography component="label">Password</Typography>
              <Stack direction="row" gap={2}>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={password}
                  disabled
                />
                <button
                  className="btn btn-sm btn-primary"
                  style={{ height: "40px" }}
                  onClick={() => generatePassword()}
                >
                  Generate
                </button>
              </Stack>
              <Typography component="label">Student Name</Typography>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDialog(false)}
            color="error"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={() => handleRegister()}
            autoFocus
            color="primary"
            variant="outlined"
            disabled={
              (studentId && studentName && password) === "" ? true : false
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Users;
