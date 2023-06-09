import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import SearchBox from "./searchBox";
import CircleIcon from "@mui/icons-material/Circle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import api from "./api";

const web_name = "Recipe Finder";
const web_link = "http://localhost:5173/";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={web_link}>
        {web_name}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function ResultNotFound() {
  return (
    <Typography sx={{ my: 4, fontWeight: "bold" }} variant="h4" align="center">
      No results found
    </Typography>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Album() {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const onSearch = (searchParams, reset) => {
    console.log("searchText: ", searchParams, loading);
    const filteredData = Object.entries(searchParams).filter(
      ([key, value]) => value.length > 0
    );
    const filteredObject = Object.fromEntries(filteredData);
    filteredObject["q"] = filteredObject["q"] ? filteredObject["q"] : "";
    if (filteredObject.q.trim() !== "") {
      api
        .get("", {
          params: filteredObject,
        })
        .then((result) => {
          setLoading(true);
          console.log("res: ", result.data.hits);
          setResults(result.data.hits);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (filteredObject.q.trim() === "" && !reset) {
      handleSnackbarClick();
    }

    if (!reset) {
      setResults([]);
    }
  };

  React.useEffect(() => {
    if (results.length > 0) {
      setLoading((prev) => !prev);
    }
  }, [results]);

  return (
    <div style={{ width: "100vw" }}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <FastfoodIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            {web_name}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 0,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {web_name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Unlock Culinary Inspiration, Explore Endless Recipes, and Delight
              Your Taste Buds with Our Recipe Finder.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 3 }} maxWidth="md">
          <SearchBox onSearch={onSearch} />
          {/* End hero unit */}
          {!loading ? (
            results.length > 0 ? (
              <Grid container spacing={4}>
                {results.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      key={card.recipe.url}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image={card.recipe.image}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.recipe.label}
                        </Typography>
                        <Typography sx={{ fontStyle: "italic" }}>
                          {card.recipe.mealType}
                        </Typography>
                        <Typography>
                          {card.recipe.ingredientLines.map((ing, idx) => {
                            return (
                              <Box
                                key={idx}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  pb: 1,
                                  py: 0,
                                }}
                              >
                                <CircleIcon sx={{ fontSize: "10px" }} />
                                <p>{ing}</p>
                              </Box>
                            );
                          })}
                        </Typography>
                      </CardContent>
                      {/* <CardActions>
                        <Button size="small" variant="contained">
                          View
                        </Button>
                      </CardActions> */}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <ResultNotFound />
            )
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <CircularProgress size="6rem" />
            </Box>
          )}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          {web_name}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Prepare your food here!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please enter a food name!!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
