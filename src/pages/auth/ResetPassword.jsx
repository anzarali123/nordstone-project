import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import LoadingButton from "@mui/lab/LoadingButton";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await sendPasswordResetEmail(auth, email);
      console.log(response);
      toast.success("Reset Link sent to your email");
      navigate("/login");
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "400px",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "2rem" }}>Reset Password</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          onSubmit={handleResetPassword}
        >
          <TextField
            sx={{ marginBottom: "1.5rem" }}
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />

          <LoadingButton
            loading={loading}
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Reset Password
          </LoadingButton>
        </form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              marginTop: "1rem",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              marginTop: "1rem",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
