// Package
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Components
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Styles
import { useDefaultStyles } from "../../assets/GlobalStyle";

function SearchWithParameters() {
  const navigate = useNavigate();
  const params = useParams();
  const style = useDefaultStyles();

  const user = localStorage.getItem("user");
  const storedData = localStorage.getItem("search");
  const [query, setQuery] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    if (user !== null || undefined) {
      setData(storedData !== null ? JSON.parse(storedData) : []);
    } else {
      navigate("/");
    }
  }, [storedData]);

  const RenderSearch = () => {
    return (
      <>
        {data.length > 0 ? (
          <>
            {data.map((keys: any) => (
              <Box key={keys.url} className="mb-5" style={{ width: "100%" }}>
                <cite className={style.paramSearchUrl}>{keys.url}</cite>
                <h3 style={{ marginTop: "-7px" }}>
                  <a
                    className={`text-decoration-none ${style.paramSearchHeader}`}
                    href={keys.url}
                  >
                    {keys.header}
                  </a>
                </h3>
                <p>{keys.metadata}</p>
              </Box>
            ))}
          </>
        ) : (
          <Box>
            <h3>
              No record found for <code>{params.param}</code> try{" "}
            </h3>
          </Box>
        )}
      </>
    );
  };

  const handleSafeSearch = (e: any) => {
    if (query !== "") {
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
          console.log(data);
          localStorage.setItem("search", JSON.stringify(data.data));
          navigate(`/query/${query}`);
        });
    }
  };
  return (
    <Box>
      <Stack direction="row" spacing={6} className="mb-4">
        <Box className="col-lg-2 col-3 text-end mt-4">
          <Typography className={style.paramHeader}>
            <a href="/" style={{ textDecoration: "none" }}>
              Safe Search
            </a>
          </Typography>
        </Box>
        <Box className={`col-lg-3 col-4 mt-4 ${style.paramTextFieldFullWidth}`}>
          <TextField
            className={`col-xl-4 col-12 ${style.paramInput}`}
            defaultValue={params.param}
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
        <Box className="col-5">
          <Button
            className="mt-4"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={(e) => handleSafeSearch(e)}
          >
            SEARCH
          </Button>
        </Box>
      </Stack>
      <hr />
      <Stack direction="row" spacing={6} className="mb-4">
        <Box className="col-lg-2 col-0 text-end mt-2"></Box>
        <Box className="col-lg-4 col-12 mt-2">
          <RenderSearch />
        </Box>
      </Stack>
    </Box>
  );
}

export default SearchWithParameters;
