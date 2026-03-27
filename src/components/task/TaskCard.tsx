import { Card, Typography, Box } from "@mui/material";
import StatusDropdown from "../task/StatusDrop";
import api from "../../services/api";

export default function TaskCard({ task }: any) {
  const handleStatusChange = async (newStatus: string) => {
    try {
      await api.put(`/tasks/${task.id}/status`, {
        status: newStatus,
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{task.title}</Typography>

      <Box mt={2}>
        <StatusDropdown
          value={task.status}
          onChange={handleStatusChange}
        />
      </Box>
    </Card>
  );
}