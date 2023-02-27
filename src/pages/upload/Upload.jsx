import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

const UploadProfilePicture = () => {
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    try {
      const imageRef = ref(storage, `images/${user.uid}`);
      const response = await getDownloadURL(imageRef);
      setUrl(response);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchImage();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const imageRef = ref(storage, `images/${user.uid}`);
      await uploadBytes(imageRef, image);
      setImage(null);
      fetchImage();
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Grid marginTop="3rem" container direction="column" alignItems="center">
      <Typography
        sx={{ marginBottom: "2rem", fontWeight: "bold" }}
        variant="h6"
      >
        Profile Pic
      </Typography>
      <Avatar
        alt="Profile Picture"
        src={url}
        sx={{ width: "12.5rem", height: "12.5rem", marginBottom: "2rem" }}
      />
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          sx={{ marginBottom: "2rem" }}
          variant="contained"
          color="primary"
          component="span"
        >
          Choose Image
        </Button>
      </label>
      {image && (
        <LoadingButton
          variant="contained"
          loading={loading}
          color="secondary"
          onClick={handleUpload}
        >
          Upload Picture
        </LoadingButton>
      )}
    </Grid>
  );
};

export default UploadProfilePicture;
