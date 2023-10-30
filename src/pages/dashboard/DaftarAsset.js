

// material-ui
import {

    Grid,
  
    Typography
  } from '@mui/material';
  
  // project import
  import OrdersTable from './OrdersTable';
  
  import MainCard from 'components/MainCard';
  import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
  
  
  
  
  
  
  
  
  
  
  // ==============================|| DASHBOARD - DEFAULT ||============================== //
  
  const DashboardDaftarAsset= () => {
   
  
  
    return (
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Daftar Asset </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={6}>
          <AnalyticEcommerce title="Total Asset" count="1.200" isTotal percentage={2} extra="detail" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={6}>
          <AnalyticEcommerce title="Total Pengguna" count="98" isPengguna percentage={3} extra="detail" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="digunakan" count="995" percentage={4} isDigunakan color="secondary"  extra="detail" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Tidak digunakan" count="215" percentage={5} isTidakDigunakan color="secondary" extra="detail" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Rusak | diperbaiki" count="5" percentage={1} isDiperbaiki color="warning" extra="detail" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Hapus Asset" count="15" percentage={1} isHapus color="warning" extra="detail" />
        </Grid>
  
        
        
  
        {/* row 3 */}
        <Grid item xs={12} md={7} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Riwayat Asset</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        </Grid>
       
  
    );
  };
  
  export default DashboardDaftarAsset;
  