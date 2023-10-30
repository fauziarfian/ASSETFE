// material-ui
import {

  Grid,

  Typography
} from '@mui/material';

// project import
import DaftarAssetTable from '../dashboard/DaftarAssetTable';

import MainCard from 'components/MainCard';

import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DrawerAddKategori from '../dashboard/DrawerAddKategori';




// ==============================|| DASHBOARD - DEFAULT ||============================== //


const Pengguna= ({id_kategori}) => {

  const updateData = () => {
    fetchData();
    fetchData1();
    fetchData2();
   
  };

  console.log('hasil', id_kategori);
 
// State untuk menyimpan data pengguna dari API
const [jumlahAsset, setJumlahAsset] = useState(0);

const [jumlahPenggunaStatus, setJumlahPenggunaStatus] = useState(0);
const [jumlahPenggunaStatus2, setJumlahPenggunaStatus2] = useState(0);


// Gunakan useEffect untuk mengambil data dari API saat komponen dimuat
useEffect(() => {
  fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
  fetchData1();
  fetchData2();
 
}, []);

 // Fungsi untuk mengambil data dari API
 const fetchData = async () => {
  try {
      const response = await axios.get('http://localhost/daftar-asset/');
      // Dapatkan jumlah pengguna dari data API
      const dataAsset = response.data.data;
      const jumlahAssetDariAPI = dataAsset.length;
       // Perbarui nilai state jumlahPengguna
       setJumlahAsset(jumlahAssetDariAPI);

    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
};  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat


const fetchData1 = async () => {
  try {
      const status = await axios.get(`http://localhost/daftar-asset/status/0`);
      const dataPenggunaStatus = status.data;
      const jumlahPenggunaStatusDariAPI = dataPenggunaStatus.length;

      setJumlahPenggunaStatus(jumlahPenggunaStatusDariAPI);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
};


const fetchData2 = async () => {
  try {
    const status2 = await axios.get(`http://localhost/daftar-asset/status/1`);
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
        <Typography variant="h5">Laptop</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <AnalyticEcommerce  title="Jumlah Asset" count={jumlahAsset?.toString()}  extra="detail" />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="digunakan" count={jumlahPenggunaStatus2?.toString()} color="secondary"  extra="detail" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Persediaan" count={jumlahPenggunaStatus?.toString()}  color="secondary" extra="detail" />
      </Grid>
     

      
      

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Daftar Laptop</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        <DrawerAddKategori updateData={updateData}/>
          <DaftarAssetTable updateData={updateData}/>
        </MainCard>
      </Grid>
      </Grid>
     
     

  );
};

export default Pengguna;