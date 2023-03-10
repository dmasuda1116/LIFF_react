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

const Account_name_1 =[
  {label: "現金", id: 0},
  {label: "当座預金", id: 0},
  {label: "普通預金", id: 0},

]

// 収入時の勘定科目
const Account_name_2 =[
  {label: "売上高", id: 0},
  {label: "雑収入", id: 0},
]

// 支出時の勘定科目
const Account_name_3 =[
  {label: "会議費", id: 0},
  {label: "接待交際費", id: 1},
  {label: "旅費交通費", id: 2},
  {label: "消耗品費", id: 3},
  {label: "新聞図書費", id: 4},
  {label: "地代家賃", id: 5},
  {label: "通信費", id: 6},
  {label: "水道光熱費", id: 7},
  {label: "販売促進費", id: 8},
  {label: "雑費", id: 9},
  {label: "租税公費", id: 10},
  {label: "外注費", id: 11},
  {label: "修繕費", id: 12},
  {label: "広告宣伝費", id: 13},
  {label: "損害保険料費", id: 14},
  {label: "減価償却費", id: 15},
  {label: "給与賃金", id: 16},
  {label: "福利厚生費", id: 17},
  {label: "賃借料", id: 18},
  {label: "研究開発費", id: 19},
]

const subAccount_name =[
  {label: "補助科目なし", id: 0},
  {label: "小口現金", id: 1}
]

function App() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [in_out, setIn_out] = useState("支出");
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
      'text': "簿記記帳\n"+dayjs(date.valueOf()).format('YYYY/MM/DD')+"\n"+in_out +"\n" + account_1+"\n"+subaccount_1+"\n"+amount+"\n"+account_2+"\n"+subaccount_2+"\n"+amount+"\n"+ memo,
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
        <Grid item xs={0.5}/>
        <Grid item xs={12}>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <Box component="span" sx={{ p: 2}}>
                <Typography variant="h6" gutterBottom>
                  日付
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} localeText={jaJP.components.MuiLocalizationProvider.defaultProps.localeText} adapterLocale="ja">
                  <DatePicker
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
              </Box>
              <Box component="span" sx={{ p: 2}}>
                <Typography variant="h6" gutterBottom>
                    収入/支出
                </Typography>
                <Box component="span" sx={{ p: 0.5}}>
                  <FormControl>
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
                </Box>
                <Box component="span" sx={{ p: 2}}>
                  <Typography variant="subtitle1" gutterBottom>
                    勘定科目
                  </Typography>
                  <Autocomplete
                    defaultValue={{label: "現金", id: 0}}
                    disablePortal
                    id="combo-box-demo"
                    options={Account_name_1}
                    renderInput={(params) => <TextField {...params}/>}
                    inputValue={account_1}
                    onInputChange={(event, newInputValue) => {
                      setAccount_1(newInputValue);
                    }}
                  />
                </Box>
                <Box component="span" sx={{ p: 0.5}}>
                  <Typography variant="subtitle1" gutterBottom>
                    補助科目
                  </Typography>
                  <Autocomplete
                    defaultValue={{label: "補助科目なし", id: 0}}
                    disablePortal
                    id="combo-box-demo"
                    options={subAccount_name}
                    renderInput={(params) => <TextField {...params}/>}
                    inputValue={subaccount_1}
                    onInputChange={(event, newInputValue) => {
                      setSubAccount_1(newInputValue);
                    }}
                  />
                </Box>
              </Box>
              <Box component="span" sx={{ p: 2}}>
                <Typography variant="h6" gutterBottom>
                  用途と金額
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {in_out == "収入"? "何の収入ですか？" : "何に使いましたか？"}
                </Typography>
                <Box component="span" sx={{ p: 0}}>
                  <Typography variant="subtitle1" gutterBottom>
                    勘定科目
                  </Typography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={in_out == "収入"? Account_name_2 : Account_name_3}
                    // options={Account_name_2}
                    renderInput={(params) => <TextField {...params}/>}
                    inputValue={account_2}
                    onInputChange={(event, newInputValue) => {
                      setAccount_2(newInputValue);
                    }}
                  />
                </Box>
                <Box component="span" sx={{ p: 0.5}}>
                  <Typography variant="subtitle1" gutterBottom>
                    補助科目
                  </Typography>
                  <Autocomplete
                    defaultValue={{label: "補助科目なし", id: 0}}
                    disablePortal
                    id="combo-box-demo"
                    options={subAccount_name}
                    renderInput={(params) => <TextField {...params}/>}
                    inputValue={subaccount_2}
                    onInputChange={(event, newInputValue) => {
                      setSubAccount_2(newInputValue);
                    }}
                  />
                </Box>
                <Box component="span" sx={{ p: 0.5}}>
                  <Typography variant="subtitle1" gutterBottom>
                    金額
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    endAdornment={<InputAdornment position="end">円</InputAdornment>}
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
                </Box>
              </Box>
              <Box component="span" sx={{ p: 2}}>
                <Typography variant="h6" gutterBottom>
                  その他事項
                </Typography>
                <TextField
                id="outlined-basic"
                label="摘要"
                variant="outlined"
                value={memo}
                onChange={(event) => {setMemo(event.target.value);}} />
              </Box>
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
         <Grid item xs={0.5}/>
        </Grid>
      </Box>
  );
}


export default App;
