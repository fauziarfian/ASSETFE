import React, { useEffect } from 'react';
import { message } from 'antd';
import '../../../src/assets/third-party/style.css';
import qr from '../../../src/assets/images/qr3.gif';
import '../aktifitas/style.css';

// ==============================|| SAMPLE PAGE ||============================== //
const SamplePage = () => {
  const messageApi = message; // Menggunakan message dari antd

  useEffect(() => {
    // Tampilkan pesan loading
    const hide = messageApi.info('Gunakan QR Code Scanner', 0);
    // // Simulasikan tindakan yang memerlukan waktu
    setTimeout(() => {
      // Tindakan selesai, tutup pesan loading
      hide();
    }, 2000); // Ganti nilai 5000 dengan waktu yang sesuai dengan tindakan Anda
  }, []);

  return (
    <>
      <center style={{ marginTop: '19%' }}>
        <img src={qr} alt="My Animation" width="100" height="100" />
        {/* <h3 style={{ color: '#7b7b7b' }}>Scan QR Code</h3> */}
      </center>
    </>
  );
};

export default SamplePage;
