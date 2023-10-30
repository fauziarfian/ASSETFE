import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';

const redirectToPage = (url) => {
  window.location.href = url;
};

const App = () => {
  const { id } = useParams();
  const [data, setData] = useState('');
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost/daftar-asset/kode-barang/${id}`);
      setData(response.data[response.data.length - 1]);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const handlePrintQRCode = () => {
    setPrinting(true);
    fetchData(); // Memastikan data terbaru diambil sebelum mencetak
    setTimeout(() => {
      const printWindow = window.open('', '', 'width=226px,height=226px'); // Atur lebar dan tinggi dalam piksel (1cm = 37.79px)
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              @page {
                size: 6cm 6cm; /* Atur ukuran kertas dalam cm */
                margin: 0; /* Hapus margin */
                padding: 0; /* Hapus padding */
              }
              body {
                width: 100%; /* Atur lebar body sesuai kebutuhan */
                height: 100%; /* Atur tinggi body sesuai kebutuhan */
                margin: 0; /* Hapus margin */
                padding: 0; /* Hapus padding */
              }
              img {
                width: 80%; /* Atur lebar gambar sesuai kebutuhan */
                height: 80%; /* Atur tinggi gambar sesuai kebutuhan */
                margin-top:6%;
              }
              .text {
                margin-top:3%;
                font-size: 12px;
                text-transform: uppercase; /* Ubah teks menjadi huruf kapital (uppercase) */
              }
            </style>
          </head>
          <body><center>
          <img src="${document.getElementById('qrcode-image').toDataURL()}" />
            <div class="text">${data && data.kode_barang}</div></center>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
      setPrinting(false);
    }, 0); // Tunggu 1 detik untuk memastikan gambar QR Code sudah dimuat
  };
  
  return (
    <Result
      status="success"
      title="Asset Berhasil ditambah!"
      subTitle={data && (
        <span style={{ textTransform: 'uppercase' }}>{data.kode_barang}</span>
      )}
      extra={[
        <div key="qrcode" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <QRCode value={data && data.kode_barang} id="qrcode-image" />
        </div>,
        <Button type="primary" key="console" onClick={() => redirectToPage('/tambah-asset')}>
          Tambah Lagi
        </Button>,
        <Button key="buy" onClick={handlePrintQRCode} disabled={printing}>
          {printing ? 'Mencetak...' : 'Cetak QR Code'}
        </Button>,
      ]}
    />
  );
};

export default App;
