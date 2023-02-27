import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CreateIcon from "@mui/icons-material/Create";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link to="/" style={{ flexGrow: 1, cursor: "default" }}>
            <Typography variant="h6" component="div">
              NORDSTONE
            </Typography>
          </Link>

          {/* Push Notification page link button  */}
          <Link to="send-notifications">
            <Tooltip title="send notification">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <NotificationsIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Tooltip>
          </Link>

          {/* Photo upload page link button  */}
          <Link to="upload">
            <Tooltip title="upload picture">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <FileUploadIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Tooltip>
          </Link>

          {/* Post page link button  */}
          <Link to="write-post">
            <Tooltip title="write-post">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <CreateIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Tooltip>
          </Link>

          {/* Calculator page link button  */}
          <Link to="calculate">
            <Tooltip title="calculate">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <CalculateIcon sx={{ width: "30px", height: "30px" }} />
              </IconButton>
            </Tooltip>
          </Link>

          {/* auth page link button  */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
