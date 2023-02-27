import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate("/");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const guestUserLogin = () => {
    setFormData({ email: "guestuser@gmail.com", password: "12341234" });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Submit form data here
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("Logged In successfully!");
      setUser(user);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
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
        <h2 style={{ marginBottom: "2rem" }}>Log in</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          onSubmit={handleLogin}
        >
          <TextField
            sx={{ marginBottom: "1.5rem" }}
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            sx={{ marginBottom: "1.5rem" }}
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Log in
          </Button>
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="error"
            onClick={guestUserLogin}
          >
            Sign In as a guest user
          </Button>
        </form>
        <Link
          to="/reset-password"
          style={{
            textDecoration: "none",
            color: "#1976d2",
            marginTop: "1rem",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Forgot Password?
        </Link>
        <p style={{ marginTop: "1rem" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign up
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default Login;
