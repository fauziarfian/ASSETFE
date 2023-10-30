import React, { useState, useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Button, Col, Tooltip, Drawer, Select, Form, Input, Row, Space, message } from 'antd';




const App = ({ updateData, idPengguna }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState('');
  const [data, setPengguna] = useState('');
  const [data2, setSatker] = useState([]);
  const [form] = Form.useForm();
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
    onReset(); // Clear the form fields
  }, []);

  const fetchData = async () => {
    try {
        const response = await Axios.get(`http://localhost/daftar-pengguna/${idPengguna}`);
        // Dapatkan jumlah pengguna dari data API
         // Perbarui nilai state jumlahPengguna
         setPengguna(response.data.data);
         onReset(); // Clear the form fields
  
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
  };  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat
  
  const fetchData2 = async () => {
    try {
        const response = await Axios.get(`http://localhost/satker/`);
        // Dapatkan jumlah pengguna dari data API
         // Perbarui nilai state jumlahPengguna
         setSatker(response.data.data);
         onReset(); // Clear the form fields
  
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
  };  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat
  

  

  const handleFormSubmit = (values: any) => {
    // Menyiapkan data yang akan dikirimkan ke server
    console.log(values);
    const postData = {
      nama: formData.nama,
      id_satker: formData.id_satker,
      jabatan: formData.jabatan,
      telepon: formData.telepon,
    };


    Axios.patch(`http://localhost/daftar-pengguna/${idPengguna}`, postData)
      .then((response) => {
        console.log('Data berhasil diperbarui:', response.data);
        message.success({
          type: 'success',
          content: 'Pengguna berhasil diperbarui',
          duration: 2,
          style: {
            marginTop: '8vh',
          },
        });
        onReset(); // Clear the form fields // Mengosongkan input field dengan mengatur formData ke objek kosong
        onClose(); // Tutup drawer setelah pengiriman berhasil
        updateData();
        fetchData();
       
       
      
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat menyimpan data:', error);
        message.error({
          content: 'Nomer telepon sudah digunakan',
          duration: 2,
          style: {
            marginTop: '8vh',
          },
        });
     
      });
  };

  const handleInputChange = (fieldName, value) => {
    // Mengupdate state formData saat nilai formulir berubah
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <>
     <Tooltip title="Edit">
      <Button
        style={{ marginLeft: '10px', marginTop: '10px' }}
        onClick={showDrawer}
        icon={<EditOutlined />}
      >
      </Button>
     
      
        </Tooltip>
      <Drawer
        title="Edit Pengguna"
        width={620}
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
            <Col span={12}>
              <Form.Item
                name="nama"
                label="Nama"
                initialValue={data.nama}
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan nama',
                  },
                ]}
              >
                <Input  
                  value={data.nama}
                  onChange={(e) => handleInputChange('nama', e.target.value)}
                  allowClear                
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="id_satker"
                label="Satker"
                initialValue={data.id_satker}
                rules={[
                  {
                    required: true,
                    message: 'Silahkan pilih satker',
                  },
                ]}
              >
                <Select
          placeholder="Pilih Satker"
          onChange={(value) => handleInputChange('id_satker', value)}
          readOnly
        >
          {data2.map((item) => (
          <Select.Option key={item.id_satker} value={item.nama_satker}>{item.nama_satker}</Select.Option>
          ))}</Select>
          {/* Anda bisa menambahkan opsi-opsi lain di sini */}
        
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="jabatan"
                label="Jabatan"
                initialValue={data.jabatan}
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan jabatan',
                  },
                ]}
              >
                <Input
                
                  onChange={(e) => handleInputChange('jabatan', e.target.value)}
                  allowClear    
               />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="telepon"
                label="Telepon"
                initialValue={data.telepon}
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan nomor telepon',
                  },
                ]}
              >
                <Input
                  value={data.telepon}
                  onChange={(e) => handleInputChange('telepon', e.target.value)}
                  allowClear    
               />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onReset}>
          Submit
        </Button>
       
      </Form.Item>
        </Form>
      </Drawer>
    
    </>
  );
};

export default App;
