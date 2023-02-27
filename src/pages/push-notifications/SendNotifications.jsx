import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

const SendNotifications = () => {
  const handleNotification = () => {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        new Notification("Hi! New Notification!", {
          body: "Example Notification",
        });
      } else if (perm === "denied") {
        toast.error("You denied the notification permission request.");
      }
    });
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "red",
            opacity: "0.7",
          },
        }}
        startIcon={<SendIcon />}
        onClick={handleNotification}
      >
        Send Notification
      </Button>
    </Box>
  );
};

export default SendNotifications;
