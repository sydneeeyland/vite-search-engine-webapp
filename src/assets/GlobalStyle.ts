import { makeStyles } from "@mui/styles";

export const useDefaultStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  heading: {
    fontSize: "35px !important",
    color: "#00773c",
    fontWeight: "700 !important",
    textAlign: "center",
  },
  placeholder: {
    marginBottom: "25px !important",
    fontWeight: "700 !important",
  },
  input: {
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      borderRadius: 30,
    },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "16px 25px",
      textDecoration: "unset",
    },
  },
  button: {
    marginTop: "20px !important",
  },
  toolSection: {
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    marginRight: 25,
    marginTop: 10,
  },
  paramHeader: {
    fontSize: "24px !important",
    fontWeight: "700 !important",
  },
  paramInput: {
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      height: "10px !important",
      padding: "16px 25px",
      textDecoration: "unset",
    },
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
  },
  paramTextFieldFullWidth: {
    "& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {
      width: "100%",
    },
  },
  paramSearchUrl: {
    fontFamily: "arial, sans-serif",
    fontStyle: "normal",
    color: "#202124",
    fontSize: "14px",
  },
  paramSearchHeader: {
    fontSize: "20px",
  },
});

export const useLayoutStyle = makeStyles({
  header: {
    transition: "all 0.3s",
    zIndex: "997",
    height: "60px",
    boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
    backgroundColor: "#fff",
    paddingLeft: "20px",
    "& .logo": {
      fontSize: 26,
      fontWeight: 700,
      color: "#012970",
      fontFamily: "Nunito, sans-serif",
      "@media (min-width: 1200px)": {
        width: "280px",
      },
    },
    "& .toggle-sidebar-btn": {
      fontSize: 32,
      paddingLeft: 10,
      cursor: "pointer",
      color: "#012970",
    },
  },
  userIcon: {
    position: "fixed",
    right: 15,
  },
  sidebar: {
    position: "fixed",
    top: "60px",
    left: 0,
    bottom: 0,
    width: "300px",
    zIndex: 996,
    transition: "all 0.3s",
    padding: "20px",
    overflowY: "scroll",
    overflowX: "visible",
    scrollbarWidth: "thin",
    scrollbarColor: "#aab7cf transparent",
    boxShadow: "0px 0px 20px rgba(1, 41, 112, 0.1)",
    backgroundColor: "#fff",
    "@media (max-width: 1199px)": {
      left: "-300px",
    },
    "&::-webkit-scrollbar": {
      width: 5,
      height: 8,
      backgroundColor: "#fff",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#aab7cf",
    },
    "& div": {
      width: "100%",
    },
  },
  main: {
    marginTop: 60,
    padding: "20px 40px",
    transition: "all 0.3s",
    backgroundColor: "#f6f6f6",
    minHeight: "93vh",
    "@media (max-width: 1199px)": {
      padding: "20px",
    },
    "@media (min-width: 1200px)": {
      marginLeft: "300px",
    },
  },
  toggle: {
    "& .makeStyles-sidebar-3": {
      "@media (max-width: 1199px)": {
        left: 0,
      },
      "@media (min-width: 1200px)": {
        left: -300,
      },
    },
    "& .makeStyles-main-4": {
      "@media (min-width: 1200px)": {
        marginLeft: 0,
      },
    },
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyle: "none",
    "& li": {
      padding: 0,
      margin: 0,
      listStyle: "none",
    },
    "& .nav-item": {
      marginBottom: "5px",
    },
    "& .nav-heading": {
      fontSize: 11,
      textTransform: "uppercase",
      color: "#899bbd",
      fontWeight: 600,
      margin: "10px 0 5px 15px",
    },
    "& .nav-link": {
      display: "flex",
      alignItems: "center",
      fontSize: 15,
      fontWeight: 600,
      color: "#4154f1",
      transition: "0.3",
      background: "#f6f9ff",
      padding: "10px 15px",
      borderRadius: "4px",
    },
    "& .nav-link i": {
      fontSize: 16,
      marginRight: 10,
      color: "#4154f1",
    },
    "& .nav-link.collapsed": {
      color: "#012970",
      background: "#fff",
    },
    "& .nav-link.collapsed i": {
      color: "#899bbd",
    },
    "& .nav-link:hover": {
      color: "#4154f1",
      background: "#f6f9ff",
    },
    "& .nav-link:hover i": {
      color: "#4154f1",
    },
    "& .nav-link .bi-chevron-down": {
      marginRight: 0,
      transition: "transform 0.2s ease-in-out",
    },
    "& .nav-link:not(.collapsed) .bi-chevron-down": {
      transform: "rotate(180deg)",
    },
    "& .nav-content": {
      padding: "5px 0 0 0",
      margin: 0,
      listStyle: "none",
    },
    "& .nav-content a": {
      display: "flex",
      alignItems: "center",
      fontSize: 14,
      fontWeight: 600,
      color: "#012970",
      padding: "10px 0 10px 40px",
      transition: "0.3s",
    },
    "& .nav-content a i": {
      fontSize: 6,
      marginRight: 8,
      lineHeight: 0,
      borderRadius: "50%",
    },
    "& .nav-content a:hover, .nav-content a.active": {
      color: "#4154f1",
    },
    "& .nav-content a.active i": {
      backgroundColor: "#4154f1",
    },
  },
});
