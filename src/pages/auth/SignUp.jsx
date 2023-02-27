import { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password, name, cPassword } = formData;
    if (password !== cPassword) {
      toast.error("Password does not match");
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response.user.uid), {
        name,
        email,
        password,
        texts: [],
        timeStamp: serverTimestamp(),
      });
      setUser(response.user);
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
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "2rem" }}>Sign up</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          onSubmit={handleSignUp}
        >
          <TextField
            sx={{ marginBottom: "1.5rem" }}
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <TextField
            sx={{ marginBottom: "1.5rem" }}
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="cPassword"
            value={formData.cPassword}
            onChange={handleChange}
            required
          />
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign up
          </Button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "blue",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Log in
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default SignUp;
