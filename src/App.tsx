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

const subAccount_name =[
  {label: "補助科目なし", id: 0},
  {label: "小口現金", id: 1}
]

function App() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [in_out, setIn_out] = useState("");
  const [account_1, setAccount_1] = useState("");
  const [subaccount_1, setSubAccount_1] = useState("");
  const [account_2, setAccount_2] = useState("");
  const [subaccount_2, setSubAccount_2] = useState("");
  const [amount, setAmount] = useState(Number);
  const [memo, setMemo] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  type Inputs = {
    applicationDate: Date | null
  }

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });
  function register() {
    liff.sendMessages([{
        'type': 'text',
      'text': "簿記会計\n"+dayjs(date.valueOf()).format('YYYY/MM/DD')+"\n"+account_1+"\n"+subaccount_1+"\n"+amount+"\n"+account_2+"\n"+subaccount_2+"\n"+amount+"\n"+memo,
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert("Fail to send message" + error);
    });
  }

  function close(){
    liff.closeWindow();
  }
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
                  value={date}
                  onChange={handleDateChange}
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
                  value={in_out}
                  onChange={(event) => {setIn_out(event.target.value);}}
                >
                  <FormControlLabel value="収入" control={<Radio />} label="収入" />
                  <FormControlLabel value="支出" control={<Radio />} label="支出" />
                </RadioGroup>
              </FormControl>
              <Autocomplete
                defaultValue={{label: "現金", id: 0}}
                disablePortal
                id="combo-box-demo"
                options={Account_name}
                renderInput={(params) => <TextField {...params} label="勘定科目" />}
                inputValue={account_1}
                onInputChange={(event, newInputValue) => {
                  setAccount_1(newInputValue);
                }}

              />
              <Autocomplete
                defaultValue={{label: "補助科目なし", id: 0}}
                disablePortal
                id="combo-box-demo"
                options={subAccount_name}
                renderInput={(params) => <TextField {...params} label="補助科目" />}
                inputValue={subaccount_1}
                onInputChange={(event, newInputValue) => {
                  setSubAccount_1(newInputValue);
                }}
              />
              <Typography variant="h5" gutterBottom>
                ③用途と金額を入力
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Account_name}
                renderInput={(params) => <TextField {...params} label="勘定科目" />}
                inputValue={account_2}
                onInputChange={(event, newInputValue) => {
                  setAccount_2(newInputValue);
                }}
              />
              <Autocomplete
                defaultValue={{label: "補助科目なし", id: 0}}
                disablePortal
                id="combo-box-demo"
                options={subAccount_name}
                renderInput={(params) => <TextField {...params} label="補助科目" />}
                inputValue={subaccount_2}
                onInputChange={(event, newInputValue) => {
                  setSubAccount_2(newInputValue);
                }}
              />

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">金額</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  endAdornment={<InputAdornment position="end">円</InputAdornment>}
                  label="金額"
                  inputProps={{
                    pattern: '[0-9]*', // 数字の正規表現パターン
                    inputMode: 'numeric', // 数字入力モードを指定
                    style: { textAlign: 'right' }, // 右寄せにするためのスタイル
                  }}
                  value={amount}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    if (/^\d*$/.test(newValue)) {
                      setAmount(newValue === '' ? 0 : parseInt(newValue, 10));
                    }
                  }}

                />
              </FormControl>
              <Typography variant="h5" gutterBottom>
                ④その他事項を入力し登録
              </Typography>
              <TextField
              id="outlined-basic"
              label="摘要"
              variant="outlined"
              value={memo}
              onChange={(event) => {setMemo(event.target.value);}} />
              <Grid container spacing={2}>
                <Grid item xs={4}/>
                <Grid item xs={8}>
                  <Stack direction="row" spacing={2}>
                    <Button onClick={close} variant="outlined" startIcon={<DeleteIcon />}>
                      削除
                    </Button>
                    <Button onClick={register} variant="contained" endIcon={<SendIcon />}>
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
