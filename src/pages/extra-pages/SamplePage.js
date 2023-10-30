import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const SamplePage = () => {
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost/daftar-asset/')
      .then((response) => {
        setData(response.data.data);
        if (response.data.data.length > 0) {
          setLastData(response.data.data[response.data.data.length - 1]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <MainCard title="Sample Card">
      <Typography variant="body2">
        {data.map((item) => (
          <div key={item.id_asset}>
            {item.id_asset} | {item.nama_barang}
          </div>
        ))}
      </Typography>

      {lastData && (

        
         <div key={lastData.id_asset}>
          <h1>Data terakhir</h1>
         {lastData.id_asset} | {lastData.nama_barang}
       </div>
      )}
    </MainCard>
  );
};

export default SamplePage;
