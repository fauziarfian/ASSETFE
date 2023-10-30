import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Input, Badge, Tooltip } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
// import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';
import {
   DeleteOutlined, PrinterOutlined
} from '@ant-design/icons';
import DrawerDetailItem from '../drawer/DrawerDetailitem';
import DrawerDetailHistory from '../drawer/DrawerDetailHistory';
import QRCode from 'qrcode.react';

//import DrawerAddPengguna from '../dashboard/DrawerAddPengguna';

const { Search } = Input;




const App = ({ updateData }) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [printing, setPrinting] = useState(false);
  const { id } = useParams(); 
  
 
 

  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    
  }, []);

   // Fungsi untuk mengambil data dari API
   const fetchData = async () => {
    try {
      
      const response = await axios.get(`http://localhost/daftar-asset/kategori/${id}`);
      setData(response.data);
      fetchData();
      updateData();
      
      
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const handleDelete = async (id_asset) => {
  try {
    // Lakukan permintaan DELETE ke API untuk menghapus item berdasarkan id
    await axios.delete(`http://localhost/daftar-asset/${id_asset}`);
    // Refresh data setelah penghapusan berhasil
    fetchData();
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};


const handlePrintQRCode = (record) => {
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
          <div class="text">${record.kode_barang}</div></center>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
    setPrinting(false);
  }, 0); // Tunggu 1 detik untuk memastikan gambar QR Code sudah dimuat
};

const columns = [
  {
    title: 'No.',
    dataIndex: 'index', // Gunakan 'index' sebagai key
    key: 'index',
    align: 'center', // Mengatur rata tengah
    render: (text, record, index) => index + 1, // Menampilkan nomor urut
  },
  {
    title: 'Nama Barang',
    dataIndex: 'nama_barang',
    key: 'nama_barang',
  },
  {
    title: 'Kode Barang',
    dataIndex: 'kode_barang',
    key: 'kode_barang',
},
{
  title: 'Status',
  dataIndex: 'status_penggunaan',
  render: (text, record) => (
    <>
    
          {record.status_penggunaan === '1' ? <Badge color='hsl(102, 53%, 61%)' text='digunakan' /> : 
           record.status_penggunaan === '0' ? <Badge color="hwb(205 6% 9%)" text="Persediaan" /> : 
           record.status_penggunaan === '3' ? <Badge color="#f50" text="Rusak" /> : 'Status Tidak Diketahui'
          }
       
  
  </>
  ),
},
  {
    title: 'Opsi', // Nama kolom "Opsi Edit"
    key: 'edit',
    align: 'left',
    render: (text, record) => (
      <>
      <div key="qrcode" style={{ display: 'none', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <QRCode value={record.kode_barang} id="qrcode-image" />
        </div>
      <DrawerDetailHistory kodeBarang={record.kode_barang} updateData={updateData}/>
      
      <Tooltip title="Print QR Code">
      <Button style={{ marginRight: '8px' }}  
        key="buy" 
        onClick={() => handlePrintQRCode(record)} disabled={printing}>
            <PrinterOutlined />
            {/* {printing ? '' : ''} */}
      </Button>
      </Tooltip>
     
      <DrawerDetailItem assetId={record.id_asset} updateData={updateData}/>
    
      {record.status_penggunaan === '0' ? (
      <Tooltip title="Hapus">
      <Popconfirm
        title="Apakah Anda yakin ingin menghapus item ini?"
        onConfirm={() => handleDelete(record.id_asset)}
        okText="Yes"
        cancelText="No"
      >
        <Button><DeleteOutlined /></Button>
      </Popconfirm>
      </Tooltip>
       ) : null }
    </>
    ),
  },
];


  const handleSearch = (value) => {
    // Menetapkan kata kunci pencarian ke state searchText
    setSearchText(value);
  };

  // Menggunakan filter untuk menampilkan data yang sesuai dengan kata kunci pencarian
  const filteredData = data.filter((item) =>
    item.nama_barang.toLowerCase().includes(searchText.toLowerCase()) ||
    item.kode_barang.toLowerCase().includes(searchText.toLowerCase()) 
    
  );

   // Konfigurasi paginasi
   const paginationConfig = {
    pageSize: 5, // Jumlah item per halaman
    total: filteredData.length, // Jumlah total data
    showSizeChanger: true, // Tampilkan pilihan untuk mengganti jumlah item per halaman
    showQuickJumper: true, // Tampilkan input untuk loncat ke halaman tertentu
  };

  return (
    <>
    
    <div style={{ float: 'right', marginRight: '20px', width: '40%' }}>
    <Search 
        placeholder="Cari data..."
        onSearch={handleSearch}
        style={{ marginBottom: '16px', marginLeft: '10px', marginTop: '10px' }}
      />
      </div>
      <Table columns={columns} dataSource={filteredData}  size="middle" pagination={paginationConfig} />
    </>
  );
};

export default App;
