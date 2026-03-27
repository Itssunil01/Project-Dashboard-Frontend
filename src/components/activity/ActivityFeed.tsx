import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ActivityItem from "./ActivityItem";
import api from "../../services/api";
import { getSocket } from "../../hooks/useSocket";

export default function ActivityFeed({ projectId }: any) {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await api.get(`/activity/${projectId}`);
      setActivities(res.data);
    };

    fetchActivities();
  }, [projectId]);

  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinProject", projectId);

    socket.on("taskUpdated", (newActivity: any) => {
      setActivities((prev) => [newActivity, ...prev.slice(0, 19)]);
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, [projectId]);

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Activity Feed
      </Typography>

      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </Box>
  );
}