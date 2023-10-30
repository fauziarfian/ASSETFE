

// material-ui
import {

    Grid,
  
    Typography
  } from '@mui/material';
  
  // project import
  import OrdersTable from '../dashboard/OrdersTable';
  
  import MainCard from 'components/MainCard';
  
  
  
  
  
  
  
  
  
  
  
  // ==============================|| DASHBOARD - DEFAULT ||============================== //
  
  const RiwayatAsset= () => {
   
  
  
    return (
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        
  
        {/* row 3 */}
        <Grid item xs={12} md={7} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Riwayat status, penyerahan dan penerimaan asset</Typography>
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
  
  export default RiwayatAsset;
  