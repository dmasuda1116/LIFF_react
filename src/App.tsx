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
import { LocalizationProvider, jaJP, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ja';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Account_name =[
  {label: "現金", id: 0},
  {label: "当座預金", id: 1}
]

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <Typography variant="h5" gutterBottom>
                ①日付を入力
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} localeText={jaJP.components.MuiLocalizationProvider.defaultProps.localeText} adapterLocale="ja">
                <DatePicker
                  label="日付"
                  defaultValue={dayjs(new Date())}
                  view="day"
                  componentsProps={{
                    toolbar: {
                      toolbarPlaceholder: "__",
                      toolbarFormat: "YYYY年MM月DD日",
                      hidden: true,
                    }
                  }}
                />
              </LocalizationProvider>
              <Typography variant="h5" gutterBottom>
                ②収入または支出を選択
              </Typography>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">収入/支出</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="収入" control={<Radio />} label="収入" />
                  <FormControlLabel value="支出" control={<Radio />} label="支出" />
                </RadioGroup>
              </FormControl>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Account_name}
                renderInput={(params) => <TextField {...params} label="勘定科目" />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Account_name}
                renderInput={(params) => <TextField {...params} label="補助科目" />}
              />
              <Typography variant="h5" gutterBottom>
                ③用途と金額を入力
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Account_name}
                renderInput={(params) => <TextField {...params} label="勘定科目" />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Account_name}
                renderInput={(params) => <TextField {...params} label="補助科目" />}
              />
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">金額</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  endAdornment={<InputAdornment position="end">円</InputAdornment>}
                  label="金額"
                />
              </FormControl>
              <Typography variant="h5" gutterBottom>
                ④その他事項を入力し登録
              </Typography>
              <TextField id="outlined-basic" label="摘要" variant="outlined" />
              <Grid container spacing={2}>
                <Grid item xs={4}/>
                <Grid item xs={8}>
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                      削除
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon />}>
                      登録
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={0}/>
                </Grid>
            </Stack>
          </Box>
         </Grid>
         <Grid item xs={1}/>
        </Grid>
      </Box>
  );
}


export default App;
