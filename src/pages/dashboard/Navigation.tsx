// Package
import { NavLink } from "react-router-dom";

// Components
import { Box } from "@mui/material";

// Style
import { useLayoutStyle } from "../../assets/GlobalStyle";

// Constant
import { NavigationList } from "../../config/Navigation";

type Props = {};

function Navigation({}: Props) {
  const classes = useLayoutStyle();

  const RenderHeadingOnly = ({ url, icon, name, i, isHidden }: any) => {
    return (
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link collapsed"
        }
        to={`${url}`}
        style={{ display: isHidden ? "none" : "block" }}
      >
        <i className={`${icon}`}></i>
        <span>{name}</span>
      </NavLink>
    );
  };

  const RenderHeading = ({ target, icon, name }: any) => {
    return (
      <Box
        component="a"
        className="nav-link collapsed"
        data-bs-target={`#${target}`}
        data-bs-toggle="collapse"
        href="."
      >
        <i className={`${icon}`}></i>
        <span>{name}</span>
        <i className="bi bi-chevron-down ms-auto"></i>
      </Box>
    );
  };

  const RenderChildren = ({ target, children }: any) => {
    return (
      <Box
        component="ul"
        id={`${target}`}
        className="nav-content collapse"
        data-bs-parent="#sidebar-nav"
      >
        {children?.map((b: any, index: number) => {
          return (
            <Box component="li" key={`c-${index}`}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link collapsed"
                }
                to={`${b.url}`}
              >
                <i className="bi bi-circle"></i>
                <span>{b.name}</span>
              </NavLink>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <>
      <Box component="ul" className={classes.ul}>
        {NavigationList.map((x, i) => {
          return x.withChildren ? (
            <Box component="li" className="nav-item" key={i}>
              <RenderHeading
                target={x?.target}
                icon={x?.icon}
                name={x?.name}
                isHidden={x?.isHidden}
              />
              <RenderChildren target={x?.target} children={x?.children} />
            </Box>
          ) : (
            <Box component="li" className="nav-item" key={i}>
              <RenderHeadingOnly
                url={x?.url}
                icon={x?.icon}
                name={x?.name}
                i={i}
                isHidden={x?.isHidden}
              />
            </Box>
          );
        })}

        <Box component="li" className="nav-heading">
          System
        </Box>

        <Box component="li" className="nav-item">
          <NavLink className="nav-link collapsed" to="/system/settings">
            <i className="bi bi-gear"></i>
            <span>Settings</span>
          </NavLink>
        </Box>
      </Box>
    </>
  );
}

export default Navigation;
