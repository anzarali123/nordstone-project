import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";

const Calculator = () => {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nordstone-project-backend1.onrender.com/calculate",
        {
          number1,
          number2,
          operation,
        }
      );
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <TextField
          value={number1}
          onChange={(event) => setNumber1(Number(event.target.value))}
          label="Number 1"
          variant="outlined"
          sx={{ margin: "1rem" }}
        />
        <TextField
          value={number2}
          onChange={(event) => setNumber2(Number(event.target.value))}
          label="Number 2"
          variant="outlined"
          sx={{ margin: "1rem" }}
        />
        <FormControl sx={{ margin: "1rem", width: "200px" }}>
          <InputLabel id="operation-label">Operation</InputLabel>
          <Select
            labelId="operation-label"
            value={operation}
            onChange={(event) => setOperation(event.target.value)}
            variant="outlined"
          >
            <MenuItem value="add">Add</MenuItem>
            <MenuItem value="subtract">Subtract</MenuItem>
            <MenuItem value="multiply">Multiply</MenuItem>
            <MenuItem value="divide">Divide</MenuItem>
          </Select>
        </FormControl>
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
        >
          Calculate
        </LoadingButton>
        <Box>
          <Typography variant="h6" sx={{ marginTop: "1rem" }}>
            {result}
          </Typography>
        </Box>
      </Box>
    </form>
  );
};

export default Calculator;
