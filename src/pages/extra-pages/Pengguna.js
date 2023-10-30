// material-ui
import {

  Grid,

  Typography
} from '@mui/material';

// project import
import UserTable from '../dashboard/UserTable';

import MainCard from 'components/MainCard';

import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DrawerAddPengguna from '../dashboard/DrawerAddPengguna';
import DrawerAddSatker from '../dashboard/DrawerAddSatker';
// import { Carousel } from 'antd';




// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Pengguna= () => {

  const updateData = () => {
    fetchData0();
    fetchData();
    fetchData1();
    fetchData2();
   
  };
 
// State untuk menyimpan data pengguna dari API
const [jumlahSatker, setJumlahSatker] = useState(0);
const [jumlahPengguna, setJumlahPengguna] = useState(0);
const [jumlahPenggunaStatus, setJumlahPenggunaStatus] = useState(0);
const [jumlahPenggunaStatus2, setJumlahPenggunaStatus2] = useState(0);


// Gunakan useEffect untuk mengambil data dari API saat komponen dimuat
useEffect(() => {
  fetchData0();
  fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
  fetchData1();
  fetchData2();
 
}, []);

const fetchData0 = async () => {
  try {
      const response = await axios.get('http://localhost/satker/');
      // Dapatkan jumlah pengguna dari data API
      const dataPengguna = response.data.data;
      const jumlahPenggunaDariAPI = dataPengguna.length;
       // Perbarui nilai state jumlahPengguna
       setJumlahSatker(jumlahPenggunaDariAPI);

    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
};  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat


 // Fungsi untuk mengambil data dari API
 const fetchData = async () => {
  try {
      const response = await axios.get('http://localhost/daftar-pengguna/');
      // Dapatkan jumlah pengguna dari data API
      const dataPengguna = response.data.data;
      const jumlahPenggunaDariAPI = dataPengguna.length;
       // Perbarui nilai state jumlahPengguna
       setJumlahPengguna(jumlahPenggunaDariAPI);

    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
};  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat


const fetchData1 = async () => {
  try {
      const status = await axios.get(`http://localhost/daftar-pengguna/status/0`);
      const dataPenggunaStatus = status.data;
      const jumlahPenggunaStatusDariAPI = dataPenggunaStatus.length;

      setJumlahPenggunaStatus(jumlahPenggunaStatusDariAPI);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
};


const fetchData2 = async () => {
  try {
    const status2 = await axios.get(`http://localhost/daftar-pengguna/status/1`);
    const dataPenggunaStatus2 = status2.data;
    const jumlahPenggunaStatusDariAPI2 = dataPenggunaStatus2.length;

    setJumlahPenggunaStatus2(jumlahPenggunaStatusDariAPI2);
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
};




// ... (kode lainnya)

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      {/* row 1 */}
      
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Pengguna </Typography>
      </Grid>
        
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce  title="Jumlah Pengguna" count={jumlahPengguna?.toString()}  extra="detail" />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce  title="Jumlah Satker" count={jumlahSatker?.toString()}  extra="detail" />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Menggunakan Asset" count={jumlahPenggunaStatus?.toString()} color="secondary"  extra="detail" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tidak Menggunakan Asset" count={jumlahPenggunaStatus2?.toString()}  color="secondary" extra="detail" />
      </Grid>
     

      
      

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Daftar pengguna</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        <DrawerAddPengguna updateData={updateData}/>
        <DrawerAddSatker updateData={updateData}/>
          <UserTable updateData={updateData}/>
        </MainCard>
      </Grid>
      </Grid>
     
     

  );
};

export default Pengguna;