import { Card, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ActivityItem({ activity }: any) {
  return (
    <Card sx={{ p: 2, mb: 1 }}>
      <Typography variant="body2">
        <strong>{activity.userName}</strong> moved Task #{activity.taskId} from{" "}
        <strong>{activity.fromStatus}</strong> →{" "}
        <strong>{activity.toStatus}</strong>
      </Typography>

      <Typography variant="caption" color="gray">
        {dayjs(activity.createdAt).fromNow()}
      </Typography>
    </Card>
  );
}