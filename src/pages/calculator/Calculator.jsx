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

const Calculator = () => {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/calculate", {
        number1,
        number2,
        operation,
      });
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
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
          margin="normal"
          variant="outlined"
        />
        <TextField
          value={number2}
          onChange={(event) => setNumber2(Number(event.target.value))}
          label="Number 2"
          margin="normal"
          variant="outlined"
        />
        <FormControl sx={{ margin: "1rem", width: "200px" }}>
          <InputLabel id="operation-label">Operation</InputLabel>
          <Select
            labelId="operation-label"
            value={operation}
            onChange={(event) => setOperation(event.target.value)}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="add">Add</MenuItem>
            <MenuItem value="subtract">Subtract</MenuItem>
            <MenuItem value="multiply">Multiply</MenuItem>
            <MenuItem value="divide">Divide</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Calculate
        </Button>
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
