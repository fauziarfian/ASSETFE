import React from 'react';

import {
  Grid,
} from '@mui/material';

import { Button, Form, Input, Select, DatePicker,  QRCode, Space, Switch, Upload } from 'antd';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';


const { Option } = Select;

const { TextArea } = Input;



const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// ==============================|| SELECT SEARCH ||============================== //



const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};




// ==============================|| SAMPLE PAGE ||============================== //


const SamplePage = () => (
<Grid container rowSpacing={4.5} columnSpacing={2.75}>
<Grid item xs={12} sm={6} md={4} lg={6}>

<MainCard  style={{ width: '100%' }}>
  
   <PlusOutlined /> <b>Tambah Asset</b>
   <br /><br />
   <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

    <Form.Item
      label="ID Asset"
      name="id"
    >
      <Input placeholder="AS21072301" value="AS21072301" readOnly />
      </Form.Item>

  <Form.Item name="switch" label="ID Otomatis" valuePropName="checked">
      <Switch defaultChecked />
    </Form.Item>

    
    
      <Form.Item
      label="QR Code"
      name="id"
    >
      <Space direction="vertical" align="center">
      <QRCode size={128}  value={ 'AS21072301' || '-'} 
      icon="https://inp.my.id/favicon.png"
      />
    </Space>
    </Form.Item>


    <Form.Item
      label="Nama Barang"
      name="nama_barang"
      rules={[
        {
          required: true,
          message: 'Nama barang mohon di isi !',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Tanggal Pembelian"
      name="tanggal_pembelian"
      rules={[
        {
          required: false,
          message: 'Please input !',
        },
      ]}
    >
      <DatePicker placeholder="Pilih tanggal" />
    </Form.Item>

    <Form.Item
      label="Nomer Pembelian"
      name="nomer_pembelian"
      rules={[
        {
          required: false,
          message: 'Please input !',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="upload"
      label="Lampiran"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      extra="Format yang diizinkan jpg | png | pdf"
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>

    <Form.Item
      label="SN"
      name="nomer_serial"
      rules={[
        {
          required: false,
          message: 'Please input !',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Garansi"
      name="garansi"
      rules={[
        {
          required: false,
          message: 'Please input !',
        },
      ]}
    >
      <Select
          placeholder="Pilih garansi"
          allowClear
        >
          <Option value="male">Tidak ada garansi</Option>
          <Option value="female">1 tahun</Option>
          <Option value="other">2 tahun</Option>
          <Option value="other">3 tahun</Option>
          <Option value="other">lainnya</Option>
        
        </Select>
    </Form.Item>



    <Form.Item
      label="Kategori"
      name="kategori"
      rules={[
        {
          required: false,
          message: 'Please input !',
        },
      ]}
    >
      <Select
          placeholder="Pilih kategori"
          allowClear
        >
          <Option value="male">Komputer</Option>
          <Option value="female">Printer</Option>
          <Option value="other">Laptop</Option>
          <Option value="other">Router</Option>
          <Option value="other">Keyboard</Option>
          <Option value="other">Mouse</Option>
          <Option value="other">Kamera Foto</Option>
          <Option value="other">Kamera Video</Option>
          <Option value="other">Tripod</Option>
          <Option value="other">Microfon</Option>
          <Option value="other">Handsfree</Option>
          <Option value="other">Drone</Option>
        </Select>
    </Form.Item>

    <Form.Item
      label="Spesifikasi"
      name="spesifikasi"
      rules={[
        {
          required: false,
          message: 'Please input !',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Catatan"
      name="catatan"
      rules={[
        {
          required: false,
          message: 'Please input !',
        },
      ]}
    >
      <TextArea placeholder="Kode aktivasi, perlakuan khusus dll" />
    </Form.Item>

  

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >

      <Space>
      <Button htmlType="submit">
        Batal
      </Button>
      <Button htmlType="submit">
        Simpan & Tambah 
      </Button>
      <Button type="primary" htmlType="submit">
        Selanjutnya
      </Button>
      </Space>

    </Form.Item>
  </Form>

 
   
  </MainCard>
  
  </Grid>
 



  <Grid item xs={12} sm={6} md={4} lg={6}>

<MainCard  style={{ width: '100%' }}>
  
   <b>Telah ditambah</b>
   <br />
   <MainCard sx={{ mt: 2 }} >
   <Space wrap>
      0984728312 | Kamera Video Canon X41
      <a href='/tambah-asset'><Button htmlType="submit"> 
        Edit
      </Button></a>
      <Button htmlType="submit">
        Hapus
      </Button>
      </Space>    
        </MainCard>

        <MainCard sx={{ mt: 2 }} >
   <Space wrap>
      0984728312 | Kamera Video Canon X41
      <a href='/tambah-asset'><Button htmlType="submit"> 
        Edit
      </Button></a>
      <Button htmlType="submit">
        Hapus
      </Button>
      </Space>    
        </MainCard>

        <MainCard sx={{ mt: 2 }} >
   <Space wrap>
      0984728312 | Kamera Video Canon X41
      <a href='/tambah-asset'><Button htmlType="submit"> 
        Edit
      </Button></a>
      <Button htmlType="submit">
        Hapus
      </Button>
      </Space>    
        </MainCard>
 
   
  </MainCard>
  
  </Grid>




  </Grid>
 
);

export default SamplePage;
