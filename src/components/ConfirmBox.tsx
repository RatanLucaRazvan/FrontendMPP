import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  message: string;
}
function ConfirmBox({ open, setOpen, handleDelete, message}: Props) {
  // const notifyDelete = (message: string) => {
  //   toast.info(message);
  // };
  // const deleteData = async () => {
  //   await axios.delete(`http://localhost:3000/phones/${id}`)
  //   .then((response) =>{
  //     removePhone(id);
  //     notifyDelete("Item deleted!");
  //   })
  //   .catch((error) => {
  //     if(error.message == "Network Error"){
  //       notifyDelete("Network Error! Backend is down!");
  //     } else{
  //       console.log(error);
  //       notifyDelete("Backend not responding!");
  //     }
  //   })
  // };


  // const handleDelete = () => {
  //   try {
  //     deleteData();
  //     setOpen(false);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const axiosError = error as AxiosError<ErrorResponse>;
  //       if (axiosError.response && axiosError.response.status === 404) {
  //         notifyDelete(axiosError.response.data.message);
  //       } else {
  //         notifyDelete("An unexpected error occurred.");
  //       }
  //     } else {
  //       notifyDelete("An unexpected error occurred.");
  //     }
  //     setOpen(false);
  //   }
  // };

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        maxWidth="md"
        scroll="body"
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <IconButton
            sx={{ position: "absolute", right: "0.1cm", top: "0.1cm" }}
            onClick={() => setOpen(false)}
          >
            X
          </IconButton>
          <Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifiyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography>Delete phone</Typography>
                <Typography>
                  {message}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifiyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Button
                  onClick={() => handleDelete()}
                  size="small"
                  color="error"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  size="small"
                  color="primary"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConfirmBox;
