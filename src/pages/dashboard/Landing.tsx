import { Outlet, NavLink } from "react-router-dom";

import { Box, Avatar } from "@mui/material";
import { useLayoutStyle } from "../../assets/GlobalStyle";
import Navigation from "../../pages/dashboard/Navigation";

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

function Landing() {
  const classes = useLayoutStyle();

  const RenderClient = () => {
    return (
      <>
        <NavLink
          to="/"
          className="logo d-flex align-items-center text-decoration-none"
        >
          <span className="d-none d-lg-block">Real Time Monitoring</span>
        </NavLink>
        <Box
          component="i"
          className="bi bi-list toggle-sidebar-btn"
          onClick={() => {
            const body = document.querySelectorAll("body");
            body[0].classList.toggle(classes.toggle);
          }}
        />
        <Box className={classes.userIcon}>
          <Avatar {...stringAvatar("Testing Data")} />
        </Box>
      </>
    );
  };

  return (
    <Box>
      <Box className={`${classes.header} fixed-top d-flex align-items-center`}>
        <Box className="d-flex align-items-center justify-content-between"></Box>
        <RenderClient />
      </Box>
      <Box className={classes.sidebar}>
        <Navigation />
      </Box>
      <Box className={classes.main}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Landing;
