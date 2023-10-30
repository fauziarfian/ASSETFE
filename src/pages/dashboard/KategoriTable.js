import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Input, Tooltip } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DrawerDetailHistoryCategory from '../drawer/DrawerDetailHistoryCategory';

// import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';
import {
  DeleteOutlined, FolderOpenOutlined 
} from '@ant-design/icons';


//import DrawerAddPengguna from '../dashboard/DrawerAddPengguna';

const { Search } = Input;





const App = ({ updateData }) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const router = useNavigate();
 
  // Fungsi untuk mengambil data dari API
  const fetchData2 = async () => {
    try {
      const response = await axios.get('http://localhost/daftar-asset/');
      setData2(response.data.data);
      fetchData2();
      updateData();
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };
 

  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    fetchData2();
    fetchData3();
  }, []);

   // Fungsi untuk mengambil data dari API
   const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/kategori/');
      setData(response.data.data);
      fetchData();
      updateData();
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

   // Fungsi untuk mengambil data dari API
   const fetchData3 = async () => {
    try {
      const response = await axios.get('http://localhost/daftar-asset/status/0');
      setData3(response.data);
      fetchData();
      updateData();
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const handleDelete = async (id_kategori) => {
  try {
    // Lakukan permintaan DELETE ke API untuk menghapus item berdasarkan id
    await axios.delete(`http://localhost/kategori/${id_kategori}`);
    // Refresh data setelah penghapusan berhasil
    fetchData();
  } catch (error) {
    console.error('Error deleting data:', error);
  }
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
    title: 'Kategori',
    dataIndex: 'kategori',
    key: 'kategori',
  },
  {
    title: 'Jumlah',
    align: 'center',
    dataIndex: 'jumlah',
    render: (text, record) => {
      const idKategori = record.id_kategori;

            // Temukan data yang sesuai dengan ID kategori
            const jumlah = data2.filter(item => item.kategori === idKategori?.toString()).length;
           

            return jumlah;
    }
},
{
  title: 'Persediaan',
  align: 'center',
  dataIndex: 'tidak_digunakan',
  render: (text, record) => {
    const idKategori = record.id_kategori;

          // Temukan data yang sesuai dengan ID kategori
          const jumlah = data3.filter(item => item.kategori === idKategori?.toString()).length;
         

          return jumlah;
  }
},
{
  title: 'Opsi', // Nama kolom "Opsi Edit"
  key: 'edit',
  align: 'left',
  render: (text, record) => {
    const idKategori = record.id_kategori;
    // Temukan data yang sesuai dengan ID kategori
    const jumlah = data2.filter(item => item.kategori === idKategori?.toString()).length;
    
    return (
      <>
        <DrawerDetailHistoryCategory nameCategory={record.kategori} idCategory={record.id_kategori} updateData={updateData} />
        <Tooltip title="Lihat daftar barang">
        <Button
          style={{ marginRight: '8px' }}
          onClick={() => router(`/list-asset/${record.id_kategori}`)}
        >
          <FolderOpenOutlined />
        </Button>
        </Tooltip>
        {jumlah === 0 ? (
          <Tooltip title="Hapus kategori">
          <Popconfirm
            title="Apakah Anda yakin ingin menghapus kategori ini?"
            onConfirm={() => handleDelete(record.id_kategori)}
            okText="Yes"
            cancelText="No"
          >
            <Button><DeleteOutlined /></Button>
          </Popconfirm>
          </Tooltip>
        ) : null}
      </>
    );
  },
}

];


  const handleSearch = (value) => {
    // Menetapkan kata kunci pencarian ke state searchText
    setSearchText(value);
  };

  // Menggunakan filter untuk menampilkan data yang sesuai dengan kata kunci pencarian
  const filteredData = data.filter((item) =>
    item.kategori.toLowerCase().includes(searchText.toLowerCase()) 
  
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
