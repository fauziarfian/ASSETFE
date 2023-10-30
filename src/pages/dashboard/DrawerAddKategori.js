import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Button, Col, Drawer, Form, Input, Row, Space, message } from 'antd';




const App = ({ updateData }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ kategori: '', id_user: null });
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



  

  const handleFormSubmit = (values: any) => {
    // Menyiapkan data yang akan dikirimkan ke server
    console.log(values);
    const postData = {
      kategori: formData.kategori,
      
      
    };


    Axios.post('http://localhost/kategori/', postData)
      .then((response) => {
        console.log('Data berhasil disimpan:', response.data);
        message.success({
          type: 'success',
          content: 'Kategori baru berhasil ditambah',
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
      });
  };

  const handleInputChange = (fieldName, value) => {
    // Mengupdate state formData saat nilai formulir berubah
    if (fieldName === 'id_user') {
      value = parseInt(value, 10); // Mengonversi nilai ke integer
    }
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <>
      <Button
        style={{ marginLeft: '10px', marginTop: '10px' }}
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Tambah Kategori
      </Button>
      <Drawer
        title="Buat kategori baru"
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
                name="kategori"
                label="Kategori"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan nama',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan kategori"
                  value={formData.kategori}
                  onChange={(e) => handleInputChange('kategori', e.target.value)}
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
