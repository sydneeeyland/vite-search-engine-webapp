// Package
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import {
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Stack,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// Styles
import { useDefaultStyles } from "../../assets/GlobalStyle";
import Logo from "../../assets/images/logo.png";

// Functions for Avatar
const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};
const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
// ********************

interface IUser {
  studentName: string;
  studentId: string;
  expiresIn: string;
}

interface ILogin {
  studentId: string;
  password: string;
}

function Index() {
  const navigate = useNavigate();
  const style = useDefaultStyles();
  const [showPrompt, setShowPrompt] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<IUser>();
  const local = localStorage.getItem("user");
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [restricted, setRestricted] = useState(false);

  const [anchorLogin, setAnchorLogin] = useState<null | HTMLElement>(null);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const openLogin = Boolean(anchorLogin);
  const openMenu = Boolean(anchorMenu);

  const [credentials, setCredentials] = useState<ILogin>({
    studentId: "",
    password: "",
  });

  useEffect(() => {
    setQuery("");
    setBtnDisable(true);
    if (local !== null || undefined) {
      const data = local !== null ? JSON.parse(local) : null;
      if (
        moment().format("MM/DD/YYYY HH:mm:ss") >=
        moment(data.expiresIn).format("MM/DD/YYYY HH:mm:ss")
      ) {
        setUser(undefined);
        localStorage.clear();
      } else {
        setUser(data);
      }
      if (data.restrict) {
        setRestricted(true);
      }
    }
  }, []);

  useEffect(() => {
    if (credentials.studentId !== "" && credentials.password !== "") {
      setBtnDisable(false);
    }
  }, [credentials]);

  const handleSafeSearch = (e: any) => {
    if (user === undefined) {
      setShowPrompt(true);
    } else {
      if (query !== "") {
        setSearchLoading(true);
        const payload = {
          q: query,
        };
        // Fetch search query
        fetch("http://localhost:5000/search/query", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("search", JSON.stringify(data.data));
            setTimeout(() => {
              setSearchLoading(false);
              navigate(`/query/${query}`);
            }, 1000);
          });

        //Log user param
        fetch("http://localhost:5000/search/log", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: `${user.studentId} - ${user.studentName}`,
            param: query,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }
    }
  };

  const handleAuth = (e: any) => {
    setLoading(true);
    fetch("http://localhost:5000/auth/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setUser(data.data);
          localStorage.setItem("user", JSON.stringify(data.data));
          setLoading(false);
          setAnchorLogin(null);
          setAnchorMenu(null);

          if (data.data.role === "admin") {
            navigate("/admin/dashboard");
          }
        }, 2000);
      });
  };

  const handleInputChange = (e: any) => {
    setCredentials((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box>
      <Box className={style.toolSection}>
        {user === undefined ? (
          <Box>
            <Button
              variant="contained"
              onClick={(e) => setAnchorLogin(e.currentTarget)}
            >
              Account
            </Button>
            <Menu
              id="login-menu"
              anchorEl={anchorLogin}
              open={openLogin}
              onClose={() => setAnchorLogin(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Stack direction="column" spacing={1}>
                  <label>Student ID</label>
                  <input
                    name="studentId"
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                    style={{ borderRadius: "5px" }}
                  />
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    onChange={(e) => handleInputChange(e)}
                    style={{ borderRadius: "5px" }}
                  />
                  <LoadingButton
                    className={style.button}
                    onClick={(e) => handleAuth(e)}
                    loading={loading}
                    disabled={btnDisable}
                    variant="contained"
                  >
                    Sign in
                  </LoadingButton>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Stack direction="row" spacing={1}>
            <Avatar
              {...stringAvatar(user?.studentName)}
              style={{ cursor: "pointer" }}
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={(e) => setAnchorMenu(e.currentTarget)}
            />
            <Menu
              id="account-menu"
              anchorEl={anchorMenu}
              open={openMenu}
              onClose={() => setAnchorMenu(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  setUser(undefined);
                  localStorage.clear();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        )}
      </Box>
      <Box className={style.container}>
        <img src={Logo} width="230" height="230" style={{ marginBottom: 15 }} />
        <Typography component="span" className={style.heading}>
          OUR LADY OF FATIMA UNIVERSITY
        </Typography>
        <Typography component="span" className={style.placeholder}>
          REAL TIME MONITORING
        </Typography>
        {restricted && (
          <Alert severity="error" className="mb-3">
            Your account has been restricted.
          </Alert>
        )}
        <TextField
          className={`col-xl-4 col-10 ${style.input}`}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <LoadingButton
          className={style.button}
          variant="contained"
          loading={searchLoading}
          onClick={(e) => handleSafeSearch(e)}
          disabled={restricted ? true : false}
        >
          SAFE SEARCH
        </LoadingButton>
      </Box>

      <Dialog
        open={showPrompt}
        onClose={() => setShowPrompt(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Oooppss.. You are not Logged in"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must log-in in-order to use OLFU Safe Search.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPrompt(false)} autoFocus>
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Index;
