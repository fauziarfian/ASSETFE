import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { ArrowLeftOutlined, PrinterOutlined } from '@ant-design/icons';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useParams, Link } from 'react-router-dom';

const customCss = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
  iconSize: '100px',
  color: '#52c41a',
};

const App = () => {
  // const { id } = useParams();
  const [data, setData] = useState('');
  const [printing, setPrinting] = useState(false);
  const { newId, newTgl } = useParams();
  console.log('newId:', newId);
  console.log('newTgl:', newTgl);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost/daftar-pengguna/${newId}/status/pengembalian/tgl/${newTgl}`);
      setData(response.data.data);
      console.log('hasil', response.data.data)
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const handlePrintQRCode = () => {
    setPrinting(true);
    fetchData(); // Memastikan data terbaru diambil sebelum mencetak

    
    setTimeout(() => {
      const printWindow = window.open('', '', 'width=2480px,height=2480px'); // Atur lebar dan tinggi dalam piksel (1cm = 37.79px)
      printWindow.document.open();
      const dataToPrint = 
                          data ? data.riwayat_asset.map((riwayat) => (
                            
                              `<li>
                                <b>${riwayat.item_name}</b><br>
                                (${riwayat.kode_barang})<br>
                                <span style="font-size:13px"><i>${riwayat.create_at}</i></span>
                              </li><br>`
                            
                          )).join('') : '';
      
      const dataToPrint2 = data ? `${data.riwayat_asset[0].id_pengguna}-${data.riwayat_asset[0].status}-${data.riwayat_asset[0].tgl}` : '';
      const date = data ? `${data.riwayat_asset[0].tgl}` : '';
      const nama = data ? `${data.nama}` : '';
      const qrCodeDataUrl = document.getElementById('qrcode-image').toDataURL();
      
      
      printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
      <title>Bukti Pengembalian Barang ${nama} - ${date}</title>
        <style>
          /* CSS untuk tampilan cetak */
          body {
            font-family: Arial, sans-serif;
            margin-top: -25px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h2 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .signature {
            width: 40%;
            height: 60px;
            margin-top: 20px;
            border-bottom: 1px solid #000;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
          }
          .uppercase {
            text-transform: uppercase;
            font-size: 10px;
            margin-top: 10px;
          }
          img {
            width: 30%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>BUKTI PENGEMBALIAN BARANG</h2>
          <table>
            <tr>
              <th>dikembalikan oleh</th>
              <td>${nama}</td>
            </tr>
            <tr>
              <th>Penerima</th>
              <td>Fauzi Arfian</td>
            </tr>
            <tr>
              <th><h2>ITEM</h2></th>
              <td>
                <ul>
                ${dataToPrint}
                </ul>
              </td>
            </tr>
            
            <tr>
              <th>
              <center> 
              <img src="${qrCodeDataUrl}" />
              <div class="uppercase">${dataToPrint2}</div>
              </center>
              </th>
              <td><center>
                <div class="ttd">Tanda Tangan Penerima</div>
                <div class="signature"></div>
                </center>
              </td>
            </tr>
            <tr>
              <th><center>${date}</center></th>
              <td>Catatan : </td>
            </tr>
          </table>
          <div class="footer">
          </div>
        </div>
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
    <>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: ${customCss.fontVariationSettings};
          font-size: ${customCss.iconSize};
          color: ${customCss.color};
        }
      `}</style><br></br><br></br>
      <Result
        icon={<span className="material-symbols-outlined">handshake</span>}
        title={<div>
          
          <h2>Barang telah dikembalikan</h2> 
          Oleh {data && data.nama}
        
         {/* {data && data.riwayat_asset.map((item, index) => (
        <div key={index}>
          <p>ID: {item.kode_barang}</p>
        </div>
      ))} */}

        
        <div key="qrcode" style={{ display: 'none', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <QRCode value="tes" id="qrcode-image" />
          
        </div>
        
        </div>}
        subTitle={
          <div>
           {/* {data && data.riwayat_asset[0].daftar_asset[0].nama_barang} */}
            <p>Tanda bukti pengembalian dapat dilihat kembali pada riwayat asset</p>
          </div>
        }
        extra={[
          <Button type="primary" key="console">
           <Link to="/penyerahan">
            <ArrowLeftOutlined /> Tambah lagi
            </Link>
          </Button>,
          
          <Button key="buy" onClick={handlePrintQRCode} disabled={printing}>
          <PrinterOutlined />{printing ? 'Mencetak...' : 'Cetak'}
        </Button>,
        ]}
      />
    </>
  );
};

export default App;
