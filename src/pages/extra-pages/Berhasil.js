import React from 'react';
import { QRCode ,Button, Result } from 'antd';

const redirectToPage = (url) => {
  window.location.href = url;
};

const App = () => (
  <Result
    status="success"
    title="Asset Berhasil ditambah!"
    subTitle="DIVHUMAS-24102023-01"
    extra={[
      <div key="qrcode" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <QRCode value="https://example.com" />
      </div>, 
      <Button type="primary" key="console" onClick={() => redirectToPage('/tambah-asset')}>
        Tambah Lagi
      </Button>,
      <Button key="buy">Cetak QR Code</Button>,
    ]}
  />
);


export default App;
