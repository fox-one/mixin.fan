import React, {useState} from 'react';
import Layout from '/components/Layout';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {useUser} from '/src/hooks';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const assets = [
  {label: 'BTC', key: 'BTC Price', startedAt: '2019-07-12'},
  {label: 'EOS', key: 'EOS Price', startedAt: '2019-07-12'},
  {label: 'XIN', key: 'XIN Price', startedAt: '2019-07-12'},
  {label: 'ETH', key: 'ETH Price', startedAt: '2021-01-19'},
  {label: 'DOT', key: 'DOT Price', startedAt: '2021-01-19'},
  {label: 'MOB', key: 'MOB Price', startedAt: '2021-01-19'},
  {label: 'UNI', key: 'UNI Price', startedAt: '2021-01-19'},
  {label: 'BOX', key: 'BOX Price', startedAt: '2019-07-12'},
];

const periods = [
  {label: '每天', key: '1day'},
  {label: '每周', key: '1week'},
  {label: '每月', key: '1month'},
];

const IndexStyle = {
  'display': 'flex',
  'justifyContent': 'center',
  'padding': '15px',
  'flexDirection': 'column',
  '> div': {
    marginBottom: '20px',
  },
};

const today = dayjs().format('YYYY-MM-DD');

export default function Index() {
  const [asset, setAsset] = useState('BTC Price');
  const [period, setPeriod] = useState('1day');
  const [money, setMoney] = useState('10');
  const [startedAt, setStartedAt] = useState('2019-07-12');
  const [finishedAt, setFinishedAt] = useState(today);
  const [earns, setEarns] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useUser();
  async function handleCalcEarn() {
    setLoading(true);
    const ret = await user.calcEarn({asset, period, money: Number(money), startedAt, finishedAt});
    setLoading(false);
    setEarns(ret.reverse());
  }


  return (
    <Layout sx={IndexStyle} loading={loading}>
      <TextField
        select
        label='标的'
        value={asset}
        onChange={(e) => {
          const key = e.target.value;
          setAsset(e.target.value);
          for (const asset of assets) {
            if (asset.key === key) {
              setStartedAt(asset.startedAt);
              break;
            }
          }
        }}
        helperText='请选择定投标的'
        fullWidth
      >
        {assets.map(({label, key}, idx) => (
          <MenuItem key={idx} value={key}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label='定投周期'
        value={period}
        onChange={(e) => {
          setPeriod(e.target.value);
        }}
        helperText='请选择定投周期'
        fullWidth
      >
        {periods.map(({label, key}, idx) => (
          <MenuItem key={idx} value={key}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label='金额(USDT)'
        value={money}
        onChange={(e) => {
          setMoney(e.target.value);
        }}
        helperText='请输入定投金额'
        fullWidth
      / >
      <TextField
        label='开始时间'
        value={startedAt}
        onChange={(e) => {
          setStartedAt(e.target.value);
        }}
        helperText='请输入定投开始时间'
        fullWidth
      / >
      <TextField
        label='结束时间'
        value={finishedAt}
        onChange={(e) => {
          setFinishedAt(e.target.value);
        }}
        helperText='请输入定投结束时间'
        fullWidth
      / >
      <Button variant="outlined" onClick={handleCalcEarn}> 计算 </Button>
      {earns.length > 0 && <>
        <Card sx={{marginTop: '10px'}}>
          <CardContent>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            总市值 ${earns[0].worth.toFixed(2)} 总花费 ${earns[0].total_money.toFixed(2)}
            </Typography>
            <Typography sx={{fontSize: 14}} color="text.secondary">
            收益 ${(earns[0].worth - earns[0].total_money).toFixed(2)}({earns[0].rate.toFixed(2)}%)
            总共购买 {earns[0].total_amount.toFixed(4)}
            </Typography>
          </CardContent>
        </Card>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Money</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {earns.map((earn) => (
              <TableRow
                key={earn.date}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {earn.date}
                </TableCell>
                <TableCell align="right">{earn.money}</TableCell>
                <TableCell align="right">{earn.price}</TableCell>
                <TableCell align="right">{earn.amount.toFixed(4)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>}
    </Layout>
  );
}
