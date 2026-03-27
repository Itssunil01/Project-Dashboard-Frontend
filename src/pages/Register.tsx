import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "DEVELOPER", 
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);
      alert("User registered!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 350,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create Account 
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Register to get started
        </Typography>

        
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

       
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

      
        <TextField
          select
          label="Role"
          fullWidth
          margin="normal"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <MenuItem value="ADMIN">ADMIN</MenuItem>
          <MenuItem value="PM">PM</MenuItem>
          <MenuItem value="DEVELOPER">DEVELOPER</MenuItem>
        </TextField>

        
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.2,
            fontWeight: "bold",
            borderRadius: 2,
            background: "linear-gradient(to right, #667eea, #764ba2)",
          }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography mt={2}>
          Already have an account?{" "}
          <span
            style={{ color: "#667eea", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}