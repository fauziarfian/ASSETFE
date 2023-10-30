import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AnalyticEcommerce from '../../../components/cards/statistics/AnalyticEcommerce';
import MainCard from 'components/MainCard';
import DaftarAssetTable from '../../dashboard/DaftarAssetTable';
// import DrawerAddKategori from '../../dashboard/DrawerAddKategori';


const Pengguna = () => {
  // State untuk menyimpan data pengguna dari API
  const [jumlahAsset, setJumlahAsset] = useState(0);
  const [jumlahPenggunaStatus, setJumlahPenggunaStatus] = useState(0);
  const [jumlahPenggunaStatus2, setJumlahPenggunaStatus2] = useState(0);
  const [kategori, setKategori] = useState('');
  const { id } = useParams();

  // Gunakan useEffect untuk mengambil data dari API saat komponen dimuat
  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    fetchData1();
    fetchData2();
    fetchData3();
  }, []);

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost/daftar-asset/kategori/${id}`);
      const dataAsset = response.data;
      const jumlahAssetDariAPI = dataAsset.length;
      setJumlahAsset(jumlahAssetDariAPI);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const fetchData1 = async () => {
    try {
      const status = await axios.get(`http://localhost/daftar-asset/status/0/category/${id}`);
      const dataPenggunaStatus = status.data;
      const jumlahPenggunaStatusDariAPI = dataPenggunaStatus.length;
      setJumlahPenggunaStatus(jumlahPenggunaStatusDariAPI);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const fetchData2 = async () => {
    try {
      const status2 = await axios.get(`http://localhost/daftar-asset/status/1/category/${id}`);
      const dataPenggunaStatus2 = status2.data;
      const jumlahPenggunaStatusDariAPI2 = dataPenggunaStatus2.length;
      setJumlahPenggunaStatus2(jumlahPenggunaStatusDariAPI2);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const fetchData3 = async () => {
    try {
      const status3 = await axios.get(`http://localhost/kategori/${id}`);
      const kategoriTitle = status3.data.data;
      // console.log('hasil', kategoriTitle);
      setKategori(kategoriTitle);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const updateData = () => {
    fetchData();
    fetchData1();
    fetchData2();
    fetchData3();
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Ringkasan - {kategori.kategori}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <AnalyticEcommerce title="Jumlah Asset" count={jumlahAsset?.toString()} extra="detail" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="digunakan" count={jumlahPenggunaStatus2?.toString()} color="secondary" extra="detail" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Persediaan" count={jumlahPenggunaStatus?.toString()} color="secondary" extra="detail" />
      </Grid>
      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Daftar - {kategori.kategori}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {/* <DrawerAddKategori updateData={updateData} /> */}
        
          <DaftarAssetTable updateData={updateData} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Pengguna;
