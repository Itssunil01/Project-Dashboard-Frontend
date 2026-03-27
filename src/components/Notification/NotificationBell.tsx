import { useEffect, useState } from "react";
import {
  Badge,
  IconButton,
  Menu,
  Box,
  Typography,
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import api from "../../services/api";
import NotificationItem from "./NotificationItem";
import { getSocket } from "../../hooks/useSocket";

export default function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState<any[]>([]);


  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    };

    fetchNotifications();
  }, []);


  useEffect(() => {
    const socket = getSocket();

    socket.on("newNotification", (notification: any) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => socket.off("newNotification");
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <IconButton onClick={(e: any) => setAnchorEl(e.currentTarget)}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <Box p={2} width={300}>
          <Typography variant="h6">Notifications</Typography>

          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </Box>
      </Menu>
    </>
  );
}