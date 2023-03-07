import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, 	jaJP, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ja';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={jaJP.components.MuiLocalizationProvider.defaultProps.localeText} adapterLocale="ja">
          <DatePicker
          label="日付"
          defaultValue={dayjs(new Date())}
          view="day"
          />
        </LocalizationProvider>
      </Stack>
    </Box>
  );
}

export default App;
