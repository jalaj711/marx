import {
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import React from "react";

const NotesCard = (props: {
  title: string;
  desc: string;
  id: string;
  handleDelete: (arg0: string) => void;
}) => (
  <Box
    sx={{
      padding: "2px",
      borderRadius: "16px",
      boxShadow:
        "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
      "&:hover": (theme) => ({
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }),
    }}
  >
    <Card
      style={{
        borderRadius: "16px",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
      }}
      elevation={0}
    >
      <CardContent>
        <span style={{ display: "flex" }}>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <span style={{ flexGrow: 1 }} />
          <IconButton onClick={() => props.handleDelete(props.id)}>
            <Close />
          </IconButton>
        </span>
        <Typography variant="body2" color="text.secondary">
          {props.desc}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

class App extends React.Component {
  state: {
    formError: string;
    notes: Array<{ title: string; desc: string | null; _id: string }>;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      formError: "",
      notes: [],
    };
    this.updateNotes = this.updateNotes.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.createNote = this.createNote.bind(this);
  }
  deleteNote(id: string) {
    fetch("/api/delete_note", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ notes: res });
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  updateNotes() {
    fetch("/api/get_notes")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ notes: res });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  createNote(title: string, desc: string | null = null) {
    fetch("/api/create_note", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ notes: res, openDialog: false });
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  componentDidMount() {
    this.updateNotes();
  }
  render() {
    return (
      <Container>
        <Grid container sx={{ minHeight: "60vh" }}>
          <Grid
            lg={6}
            md={12}
            item
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              [theme.breakpoints.down("lg")]: {
                my: theme.spacing(3),
              },
            })}
          >
            <Typography variant="h1">Marx</Typography>
          </Grid>
          <Grid
            lg={6}
            md={12}
            item
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              [theme.breakpoints.down("lg")]: {
                my: theme.spacing(3),
              },
            })}
          >
            <Paper
              sx={{
                width: "fit-content",
                px: 3,
                py: 2,
                minWidth: "80%",
              }}
              elevation={4}
            >
              <Typography variant="h3">Add a new note</Typography>
              <div>
                <Typography color="error">{this.state.formError}</Typography>
                <TextField
                  variant="outlined"
                  label="Title"
                  sx={{ my: "8px", minWidth: "clamp(150px, 50vw, 500px)" }}
                  id="new-note-title"
                />
                <br />
                <TextField
                  variant="outlined"
                  label="An optional description"
                  sx={{ my: "8px", minWidth: "clamp(150px, 50vw, 500px)" }}
                  multiline
                  rows={5}
                  id="new-note-description"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    const title = (
                      document.getElementById(
                        "new-note-title"
                      ) as HTMLInputElement
                    ).value;
                    const desc = (
                      document.getElementById(
                        "new-note-description"
                      ) as HTMLInputElement
                    ).value;
                    if (!title) {
                      this.setState({ formError: "Title is a required field" });
                    } else {
                      this.createNote(title, desc);
                    }
                  }}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        {this.state.notes.length === 0 ? (
          <Typography>You don't have any notes</Typography>
        ) : (
          <Masonry columns={{ xs: 1, md: 3, lg: 4 }}>
            {this.state.notes.map((el, index) => (
              <NotesCard
                title={el.title}
                desc={el.desc || ""}
                id={el._id}
                handleDelete={(id) => this.deleteNote(id)}
                key={index}
              />
            ))}
          </Masonry>
        )}
      </Container>
    );
  }
}

export default App;
