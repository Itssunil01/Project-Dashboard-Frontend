import { MenuItem, Select } from "@mui/material";

const statuses = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

export default function StatusDropdown({ value, onChange }: any) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {statuses.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  );
}