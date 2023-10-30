import React, { useState } from 'react';
import Axios from 'axios';
import { Button, Form, Input, Row, Col, message } from 'antd';

import { SwapRightOutlined  } from '@ant-design/icons';
import MainCard from 'components/MainCard';







// const onFinish = (values) => {
//   console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

// const onChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

// const onSearch = (value: string) => {
//   console.log('search:', value);
// };


// ==============================|| SAMPLE PAGE ||============================== //


const App = ({ updateData }) => {
  const [formData, setFormData] = useState('');
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  



  

  const handleFormSubmit = (values: any) => {
    // Menyiapkan data yang akan dikirimkan ke server
    console.log(values);
    const postData = {
      kode_barang: formData.kode_barang,
      id_satker: formData.id_satker,
      id_pengguna: formData.id_pengguna,
      catatan: formData.catatan,
      status: formData.status,
      tanda_tangan: 'tes',

      
    };


    Axios.post('http://localhost/riwayat-asset/', postData)
      .then((response) => {
        console.log('Data berhasil disimpan:', response.data);
        message.success({
          type: 'success',
          content: 'Riwayat penyerahan telah disimpan',
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
    setFormData({ ...formData, [fieldName]: value });
  };

  return (


  <div style={{ display: 'grid', placeItems: 'center'}}>
<Row>
<Col>

<MainCard  style={{ width: '450px' }}>
  
   <SwapRightOutlined  /> <b>Penerimaan Asset</b>
   <br /><br />

   <Form layout="vertical" form={form}
      name="control-hooks" hideRequiredMark onFinish={handleFormSubmit}>
          {/* <Row gutter={16}>
            <Col span={12}> */}
              <Form.Item
                name="kode_barang"
                label="Kode barang"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan kode barang',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan kode barang"
                  value={formData.kode_barang}
                  onChange={(e) => handleInputChange('kode_barang', e.target.value)}
                  allowClear                
                />
              </Form.Item>


              <Form.Item
                name="id_satker"
                label="Satker"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan satker',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan satker"
                  value={formData.id_satker}
                  onChange={(e) => handleInputChange('id_satker', e.target.value)}
                  allowClear                
                />
              </Form.Item>

              <Form.Item
                name="id_pengguna"
                label="Pengguna"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan pengguna',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan pengguna"
                  value={formData.id_pengguna}
                  onChange={(e) => handleInputChange('id_pengguna', e.target.value)}
                  allowClear                
                />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan pilih status',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan pilih status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  allowClear                
                />
              </Form.Item>


              <Form.Item
                name="catatan"
                label="Catatan"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan masukkan catatan',
                  },
                ]}
              >
                <Input
                  placeholder="Silahkan masukkan catatan"
                  value={formData.catatan}
                  onChange={(e) => handleInputChange('catatan', e.target.value)}
                  allowClear                
                />
              </Form.Item>
            {/* </Col>
            
          </Row> */}
          
          <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
       
      </Form.Item>
        </Form>
 
   
  </MainCard>
  
  </Col>
  </Row>
  </div>
 
 );
};

export default App;
