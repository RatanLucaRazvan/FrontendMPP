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
import axios, { AxiosError } from "axios";
import Axios from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "../errors/error";
import useStore from "../global_state/phoneState";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
function ConfirmBox({ open, setOpen, id}: Props) {
  const {removePhone} = useStore();
  const notifyDelete = (message: string) => {
    toast.info(message);
  };
  const deleteData = async () => {
    await axios.delete(`http://localhost:3000/${id}`)
    .then((response) =>{
      removePhone(id);
      notifyDelete("Item deleted!");
    })
    .catch((error) => {
      if(error.message == "Network Error"){
        notifyDelete("Network Error! Backend is down!");
      } else{
        console.log(error);
        notifyDelete("Backend not responding!");
      }
    })
  };


  const handleDelete = () => {
    try {
      deleteData();
      setOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response && axiosError.response.status === 404) {
          notifyDelete(axiosError.response.data.message);
        } else {
          notifyDelete("An unexpected error occurred.");
        }
      } else {
        notifyDelete("An unexpected error occurred.");
      }
      setOpen(false);
    }
  };

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
                  Are you sure you want to delete this phone?
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
