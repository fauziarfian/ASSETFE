import React, { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Button, Col, Drawer, Popconfirm, Form, Input, Row, Space, message,Tooltip, Table } from 'antd';




const App = ({ updateData }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ kategori: '', id_user: null });
  const [form] = Form.useForm();
  const [data, setSatker] = useState([]);
  const [data3, setAsset] = useState([]);
  const onReset = () => {
    form.resetFields();
  };
  

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    fetchData2();
 
  }, []);


  const fetchData2 = async () => {
    try {
        const response = await Axios.get('http://localhost/daftar-pengguna/');
        // Dapatkan jumlah pengguna dari data API
         // Perbarui nilai state jumlahPengguna
         setAsset(response.data.data);
  
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
  };  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat
  

  const fetchData = async () => {
    try {
        const response = await Axios.get('http://localhost/satker/');
        // Dapatkan jumlah pengguna dari data API
         // Perbarui nilai state jumlahPengguna
         setSatker(response.data.data);
  
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
  };  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat
  

  const handleDelete = async (id_satker) => {
    try {
      // Lakukan permintaan DELETE ke API untuk menghapus item berdasarkan id
      await Axios.delete(`http://localhost/satker/${id_satker}`);
      // Refresh data setelah penghapusan berhasil
      message.success({
        type: 'success',
        content: 'Satker telah dihapus',
        duration: 2,
        style: {
          marginTop: '8vh',
        },
      });
      updateData();
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  

  const handleFormSubmit = (values: any) => {
    // Menyiapkan data yang akan dikirimkan ke server
    console.log(values);
    const postData = {
      nama_satker: formData.nama_satker,
      
      
    };


    Axios.post('http://localhost/satker/', postData)
      .then((response) => {
        console.log('Data berhasil disimpan:', response.data);
        message.success({
          type: 'success',
          content: 'Satker baru berhasil ditambah',
          duration: 2,
          style: {
            marginTop: '8vh',
          },
        });
         // Mengosongkan input field dengan mengatur formData ke objek kosong
        onClose(); // Tutup drawer setelah pengiriman berhasil
        updateData();
        fetchData();
        onReset(); // Clear the form fields
       
      
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat menyimpan data:', error);
      });
  };

  const handleInputChange = (fieldName, value) => {
    // Mengupdate state formData saat nilai formulir berubah
    if (fieldName === 'id_user') {
      value = parseInt(value, 10); // Mengonversi nilai ke integer
    }
    setFormData({ ...formData, [fieldName]: value });
  };

  const columns = [
    {
      title: 'Nomor',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Nama Satker',
      dataIndex: 'nama_satker',
      key: 'nama_satker',
    },
    {
      title: 'Opsi', // Nama kolom "Opsi Edit"
      key: 'edit',
      align: 'center',
      render: (text, record) => {
        const idSatker = record.nama_satker;
        // Temukan data yang sesuai dengan ID kategori
        const jumlah = data3.filter(item => item.id_satker === idSatker?.toString()).length;    
      
      
      return (
        
        <> 
        {/* {record.status_penggunaan === '0' ? ( */}
        {jumlah === 0 ? (
        <Tooltip title="Hapus">
        <Popconfirm
          title="Apakah Anda yakin ingin menghapus item ini?"
          onConfirm={() => handleDelete(record.id_satker)}
          okText="Yes"
          cancelText="No"
        >
          <Button><DeleteOutlined /></Button>
        </Popconfirm>
        </Tooltip>
          ) : null}
         {/* ) : null } */}
      </>
      );
    },
  }
    // Tambahkan kolom lain sesuai kebutuhan
  ];
  
  // Menggunakan filter untuk menampilkan data yang sesuai dengan kata kunci pencarian
  const data2 = data.filter((item) =>
    item.nama_satker.toLowerCase()
    
  );

  // Konfigurasi paginasi
   const paginationConfig = {
    pageSize: 5, // Jumlah item per halaman
    total: data2.length, // Jumlah total data
    showSizeChanger: true, // Tampilkan pilihan untuk mengganti jumlah item per halaman
    showQuickJumper: true, // Tampilkan input untuk loncat ke halaman tertentu
  };

  return (
    <>
      <Button
        style={{ marginLeft: '10px', marginTop: '10px' }}
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Satker
      </Button>
      <Drawer
        title="Buat kategori baru"
        width={420}
        onClose={onClose}
        open={open}
        style={{ marginTop: '55px' }}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
           
            <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
            
          </Space>
        }
      >
        <Form layout="vertical" form={form}
      name="control-hooks" hideRequiredMark onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="nama_satker"
                label="Nama Satker"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan nama',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan kategori"
                  value={formData.nama_satker}
                  onChange={(e) => handleInputChange('nama_satker', e.target.value)}
                  allowClear                
                />
              </Form.Item>
            </Col>
            </Row>

            
              
          <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
       
      </Form.Item>
        </Form>
        <Row>
            <Col span={24}>
            <Table columns={columns} dataSource={data2} pagination={paginationConfig} />
            </Col>
            </Row>
            
         

          
      </Drawer>
    
    </>
  );
};

export default App;
