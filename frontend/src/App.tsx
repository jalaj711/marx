import {
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { useState } from "react";

const NotesCard = (props: { title: string; description: string }) => (
  <Box sx={{
    padding: "2px",
    borderRadius: "16px",
    boxShadow: "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
    "&:hover": (theme) => ({
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
    })
  }}>
    <Card style={{ borderRadius: "16px" }} elevation={0}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.description}
      </Typography>
    </CardContent>
  </Card>
  </Box>
);

const createNote = (title: string, desc: string | null = null) => {
  return new Promise((resolve, reject) => {
    resolve([{title, desc}])
  })
}

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formError, setFormError] = useState("")
  return (
    <Container>
      <Grid container sx={{ minHeight: "60vh" }}>
        <Grid
          md={6}
          xs={12}
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Typography variant="h1">Marx</Typography>
        </Grid>
        <Grid
          md={6}
          xs={12}
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              px: 3,
              py: 2,
              minWidth: "80%",
            }}
            elevation={4}
          >
            <Search />
            <TextField
              variant="standard"
              placeholder="Search you notes..."
              sx={{
                minWidth: "90%",
                pl: 1,
                "& .MuiInput-input::before, & .MuiInput-input::after": {
                  border: "none !important",
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Masonry columns={4}>
        <NotesCard title="title" description="Some description"/>
        <NotesCard title="title" description="Some descriptionSome descriptionSome descriptionSome descriptionSome description"/>
        <NotesCard title="title" description="Some descriptionSome descriptionSome descriptionSome description"/>
        <NotesCard title="title" description="Some description"/>
        <NotesCard title="title" description="Some descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome description"/>
        <NotesCard title="title" description="Some descriptionSome descriptionSome descriptionSome description"/>
        <NotesCard title="title" description="Some description"/>
      </Masonry>
      <Fab sx={{
        position: "fixed",
        bottom: "64px",
        right: "64px"
      }} onClick={() => setOpenDialog(true)}>
        <Add />
      </Fab>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add a new note</DialogTitle>
        <DialogContent>
          <Typography color="error">{formError}</Typography>
          <TextField variant="outlined" label="Title" sx={{my: "8px", minWidth: "clamp(150px, 50vw, 500px)"}} id="new-note-title" />
          <br />
          <TextField variant="outlined" label="An optional description" sx={{my: "8px", minWidth: "clamp(150px, 50vw, 500px)"}} multiline rows={5} id="new-note-description" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            const title = (document.getElementById("new-note-title") as HTMLInputElement).value;
            const desc = (document.getElementById("new-note-description") as HTMLInputElement).value;
            if(!title){
              setFormError("Title is a required field")
            } else {
              createNote(title, desc)
            }
          }}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
