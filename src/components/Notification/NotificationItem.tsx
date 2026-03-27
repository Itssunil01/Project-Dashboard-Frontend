import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function NotificationItem({ notification }: any) {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: notification.isRead ? "white" : "#f0f4ff",
        mb: 1,
        borderRadius: 1,
      }}
    >
      <Typography variant="body2">
        {notification.message}
      </Typography>

      <Typography variant="caption" color="gray">
        {dayjs(notification.createdAt).fromNow()}
      </Typography>
    </Box>
  );
}