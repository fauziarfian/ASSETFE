import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Button, Drawer, Form, Input, Space, message, Steps } from 'antd';

const { Step } = Steps;

const App = ({ updateData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    id_satker: '',
    email: '',
    telepon: '',
  });
  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Step 1',
      content: (
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
      ),
    },
    {
      title: 'Step 2',
      content: (
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
          <Input
            placeholder="Silahkan masukkan satker"
            value={formData.id_satker}
            onChange={(e) => handleInputChange('id_satker', e.target.value)}
            allowClear
          />
        </Form.Item>
      ),
    },
    {
      title: 'Step 3',
      content: (
        <>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Silahkan masukkan email',
              },
            ]}
          >
            <Input
              placeholder="Silahkan masukkan email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              allowClear
            />
          </Form.Item>
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
        </>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = () => {
    if (currentStep === steps.length - 1) {
      // Menyiapkan data yang akan dikirimkan ke server
      const postData = {
        nama: formData.nama,
        id_satker: formData.id_satker,
        email: formData.email,
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
          setCurrentStep(0); // Reset to the first step
        })
        .catch((error) => {
          console.error('Terjadi kesalahan saat menyimpan data:', error);
        });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInputChange = (fieldName, value) => {
    // Mengupdate state formData saat nilai formulir berubah
    setFormData({ ...formData, [fieldName]: value });
  };

  const onReset = () => {
    form.resetFields();
    setFormData({
      nama: '',
      id_satker: '',
      email: '',
      telepon: '',
    });
  };

  return (
    <>
      <Button
        style={{ marginLeft: '10px', marginTop: '10px' }}
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Tambah Asset
      </Button>
      <Drawer
        title="Tambah Asset Baru"
        width={620}
        onClose={onClose}
        open={open}
        style={{ marginTop: '55px' }}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            {currentStep > 0 && (
              <Button htmlType="button" onClick={() => setCurrentStep(currentStep - 1)}>
                Sebelumnya
              </Button>
            )}
            {/* <Button htmlType="button" onClick={onReset}>
              Reset
            </Button> */}
          </Space>
        }
      >
        <Steps current={currentStep}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>
        <Form layout="vertical" form={form} name="control-hooks" onFinish={handleFormSubmit}>
          {steps[currentStep].content}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentStep === steps.length - 1 ? 'Submit' : 'Selanjutnya'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
