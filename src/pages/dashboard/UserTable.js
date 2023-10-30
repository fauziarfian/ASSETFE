import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Input, Tooltip } from 'antd';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
//import DrawerAddPengguna from '../dashboard/DrawerAddPengguna';
import DrawerEditPengguna from '../dashboard/DrawerEditPengguna';

const { Search } = Input;




const App = ({ updateData }) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
 

  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
  }, []);

   // Fungsi untuk mengambil data dari API
   const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/daftar-pengguna/');
      setData(response.data.data);
      fetchData();
      updateData();
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const handleDelete = async (id_pengguna) => {
  try {
    // Lakukan permintaan DELETE ke API untuk menghapus item berdasarkan id
    await axios.delete(`http://localhost/daftar-pengguna/${id_pengguna}`);
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
    title: 'Nama',
    dataIndex: 'nama',
    key: 'nama',
  },
  {
    title: 'Satker',
    dataIndex: 'id_satker',
    key: 'id_satker',
  },
  {
    title: 'Jabatan',
    dataIndex: 'jabatan',
    key: 'jabatan',
  },
  {
    title: 'Telepon',
    dataIndex: 'telepon',
    key: 'telepon',
  },
  {
    title: 'Opsi', // Nama kolom "Opsi Edit"
    key: 'edit',
    align: 'left',
    render: (text, record) => (
      <>
    
    <DrawerEditPengguna updateData={updateData} idPengguna={record.id_pengguna}/> 

      {record.aktif === '0' ? (
        <Tooltip title="Hapus Pengguna">
      <Popconfirm
        title="Apakah Anda yakin ingin menghapus item ini?"
        onConfirm={() => handleDelete(record.id_pengguna)}
        okText="Yes"
        cancelText="No"
      >
        <Button><DeleteOutlined /></Button>
      </Popconfirm>
      </Tooltip>
      ) : null}
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
    item.nama.toLowerCase().includes(searchText.toLowerCase()) ||
    item.id_satker.toLowerCase().includes(searchText.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchText.toLowerCase()) ||
    item.telepon.toLowerCase().includes(searchText.toLowerCase())
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
