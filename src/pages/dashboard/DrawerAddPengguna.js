import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Button, Col, Drawer, Form, Input, Select, Row, Space, message } from 'antd';




const App = ({ updateData }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState('');
  const [data, setSatker] = useState([]);
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
  }, []);

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
  

  

  const handleFormSubmit = (values: any) => {
    // Menyiapkan data yang akan dikirimkan ke server
    console.log(values);
    const postData = {
      nama: formData.nama,
      id_satker: formData.id_satker,
      jabatan: formData.jabatan,
      telepon: formData.telepon,
      aktif: '0',
    };


    Axios.post('http://localhost/daftar-pengguna/', postData)
      .then((response) => {
        console.log('Data berhasil disimpan:', response.data);
        message.success({
          type: 'success',
          content: 'Pengguna berhasil ditambah',
          duration: 2,
          style: {
            marginTop: '8vh',
          },
        });
         // Mengosongkan input field dengan mengatur formData ke objek kosong
        onClose(); // Tutup drawer setelah pengiriman berhasil
        updateData();
        onReset(); // Clear the form fields
       
      
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
      <Button
        style={{ marginLeft: '10px', marginTop: '10px' }}
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Pengguna
      </Button>
      <Drawer
        title="Buat pengguna baru"
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
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan nama',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan nama"
                  value={formData.nama}
                  onChange={(e) => handleInputChange('nama', e.target.value)}
                  allowClear                
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="id_satker"
                label="Satker"
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
          {data.map((item) => (
          <Select.Option key={item.id_satker} value={item.nama_satker}>{item.nama_satker}</Select.Option>
          ))}
          {/* Anda bisa menambahkan opsi-opsi lain di sini */}
        </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="jabatan"
                label="Jabatan"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan jabatan',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan jabatan"
                  value={formData.jabatan}
                  onChange={(e) => handleInputChange('jabatan', e.target.value)}
                  allowClear    
               />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="telepon"
                label="Telepon"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan nomor telepon',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan nomor telepon"
                  value={formData.telepon}
                  onChange={(e) => handleInputChange('telepon', e.target.value)}
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
      </Drawer>
    
    </>
  );
};

export default App;
