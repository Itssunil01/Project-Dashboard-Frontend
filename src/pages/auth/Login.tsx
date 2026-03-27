import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import api from "../../services/api";
import { useAppDispatch } from "../../features/Store";
import { setCredentials } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      dispatch(setCredentials(res.data));
      navigate("/dashboard");
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
          Welcome Back
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Login to your account
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography mt={2}>
                  Don't have an account?{" "}
                  <span
                    style={{ color: "#667eea", cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </span>
                </Typography>
      </Paper>
    </Box>
  );
}