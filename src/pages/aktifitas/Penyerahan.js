import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Divider,Tooltip, Button, Form, Input, Row, Col, message, Select, Statistic } from 'antd';

import { SwapRightOutlined, SwapOutlined, SwapLeftOutlined, HistoryOutlined   } from '@ant-design/icons';
import { UserOutlined, GoldFilled  } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import { Radio } from 'antd';









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


const App = () => {
  const [formData, setFormData] = useState('');
  const [data, setAsset] = useState([]);
  const [data2, setPengguna] = useState([]);
  // const [satker, setSatker] = useState('');
  // const [asset, setAsset1] = useState('');
  const [asset2, setAsset2] = useState('');
  const [selectedValues, setSelectedValues] = useState({ value1: '', value2: '' });
  const [radioValue, setRadioValue] = useState('');
  const router = useNavigate();

  const handleSelectChange = (value, secondValue) => {
    setSelectedValues({ value1: value, value2: secondValue });
   
  }

  const onChange = (e) => {
    setRadioValue(e.target.value); // Mengambil nilai dari radio button yang dipilih
  };

  // const combinedOnChange = (value) => {
  //   // Panggil handleInputChange dengan argumen 'kode_barang' dan value
  //   handleInputChange('kode_barang', value);
    
  //   // Panggil handleSelectChange dengan value
  //   handleSelectChange(value);
  // }

 
  const [form] = Form.useForm();
  

  const updateData = () => {
    fetchData5();
 
  };


  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    fetchData2();
    fetchData3();
    fetchData4();
    
  }, [selectedValues.value2]);

  const fetchData = async () => {
    try {
        const response = await Axios.get('http://localhost/daftar-asset/');
        // Dapatkan jumlah pengguna dari data API
         // Perbarui nilai state jumlahPengguna
         setAsset(response.data.data);
  
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
  };  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat
  
  const fetchData2 = async () => {
    try {
      const status3 = await Axios.get(`http://localhost/daftar-pengguna/1`);
      const kategoriTitle = status3.data.data;
      // console.log('hasil', kategoriTitle);
      setSatker(kategoriTitle);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const fetchData3 = async () => {
    try {
      const status3 = await Axios.get(`http://localhost/daftar-pengguna/`);
      const kategoriTitle = status3.data.data;
      // console.log('hasil', kategoriTitle);
      setPengguna(kategoriTitle);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const fetchData4 = async () => {
    try {
      const status3 = await Axios.get(`http://localhost/daftar-asset/1`);
      const kategoriTitle = status3.data.data;
      // console.log('hasil', kategoriTitle);
      setAsset1(kategoriTitle);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const fetchData5 = async () => {
    try {
      const response = await Axios.get(`http://localhost/daftar-asset/kode-barang/${selectedValues.value1}`);
    
      // console.log('hasil', response.data[response.data.length - 1]);
      setAsset2(response.data[response.data.length - 1]);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };


  const handleFormSubmitPenyerahan = (values: any) => {
    // Menyiapkan data yang akan dikirimkan ke server
    console.log(values);
  
    const postDataRiwayat = {
      kode_barang: selectedValues.value1,
      id_satker: asset2.id_satker,
      item_name: asset2.nama_barang,
      category: asset2.kategori,
      id_pengguna: parseInt(formData.id_pengguna, 10),
      catatan: formData.catatan,
      kondisi: radioValue,
      status: 'Penyerahan',
      tanda_tangan: 'TTD',
    };

    const patchDataPengguna = {
      aktif: '1',
    };
  
    const postDataDaftarAsset = {
      kode_barang: asset2.kode_barang,
      id_satker: asset2.id_satker,
      id_pengguna: parseInt(formData.id_pengguna, 10),
      nama_barang: asset2.nama_barang,
      tanggal_pembelian: asset2.tanggal_pembelian,
      nomer_pembelian: asset2.nomer_pembelian,
      merk_tipe: asset2.merk_tipe,
      sn: asset2.sn,
      garansi: asset2.garansi,
      kategori: asset2.kategori,
      status_penggunaan: '1',
    };
    
   // Lakukan permintaan POST ke 'http://localhost/riwayat-asset/'
   Axios.patch(`http://localhost/daftar-pengguna/${formData.id_pengguna}`, patchDataPengguna)
   .then((postResponse) => {
     console.log('Data Pengguna berhasil diupdate:', postResponse.data);
 

         // Lakukan permintaan POST ke 'http://localhost/riwayat-asset/'
    Axios.post('http://localhost/riwayat-asset/', postDataRiwayat)
    .then((postResponse) => {
      console.log('Data Riwayat berhasil disimpan:', postResponse.data);
      const newTgl = postResponse.data.data.tgl;
      const newId = postResponse.data.data.id_pengguna;
  
        // Lakukan permintaan PATCH ke 'http://localhost/daftar-asset/' secara bersamaan
        Axios.patch(`http://localhost/daftar-asset/${asset2.id_asset}`, postDataDaftarAsset)
          .then((patchResponse) => {
            console.log('Data Riwayat berhasil disimpan:', postResponse.data);
            console.log('Data Daftar berhasil disimpan:', patchResponse.data);
            // message.success({
            //   type: 'success',
            //   content: 'Riwayat penyerahan dan Daftar Asset telah disimpan',
            //   duration: 2,
            //   style: {
            //     marginTop: '8vh',
            //   },
            // });
            
            setTimeout(() => {
              router(`/tanda-terima-penyerahan/${newId}/${newTgl}`);
            }, 1000);
          })
          .catch((patchError) => {
            console.error('Terjadi kesalahan saat menyimpan data Daftar Asset:', patchError);
            message.error({
              type: 'error',
              content: 'Terjadi kesalahan saat menyimpan data Daftar Asset',
              duration: 2,
              style: {
                marginTop: '8vh',
              },
            });
          });
      })
      .catch((patchPenggunaError) => {
        console.error('Terjadi kesalahan saat menyimpan data Daftar Asset:', patchPenggunaError);
        message.error({
          type: 'error',
          content: 'Terjadi kesalahan saat menyimpan data Daftar Asset',
          duration: 2,
          style: {
            marginTop: '8vh',
          },
        });
      });
      })
      .catch((postError) => {
        console.error('Terjadi kesalahan saat menyimpan data Riwayat:', postError);
        message.error({
          type: 'error',
          content: 'Terjadi kesalahan saat menyimpan data Riwayat',
          duration: 2,
          style: {
            marginTop: '8vh',
          },
        });
      });
  };
  




  
  const handleFormSubmitPenerimaan = (values: any) => {
    // Menyiapkan data yang akan dikirimkan ke server
    console.log(values);
  
    const postDataRiwayat = {
      kode_barang: selectedValues.value1,
      item_name: asset2.nama_barang,
      category: asset2.kategori,
      id_satker: asset2.id_satker,
      id_pengguna: asset2.id_pengguna,
      catatan: formData.catatan,
      kondisi: radioValue,
      status: 'Pengembalian',
      tanda_tangan: 'TTD',
    };
  
    const postDataDaftarAsset = {
      kode_barang: asset2.kode_barang,
      id_satker: asset2.id_satker,
      nama_barang: asset2.nama_barang,
      id_pengguna: 0,
      tanggal_pembelian: asset2.tanggal_pembelian,
      nomer_pembelian: asset2.nomer_pembelian,
      merk_tipe: asset2.merk_tipe,
      sn: asset2.sn,
      garansi: asset2.garansi,
      kategori: asset2.kategori,
      status_penggunaan: '0',
    };
  
    // Lakukan permintaan POST ke 'http://localhost/riwayat-asset/'
    Axios.post('http://localhost/riwayat-asset/', postDataRiwayat)
      .then((postResponse) => {
        console.log('Data Riwayat berhasil disimpan:', postResponse.data);
        const newTgl = postResponse.data.data.tgl;
        const newId = postResponse.data.data.id_pengguna;
  
        // Lakukan permintaan PATCH ke 'http://localhost/daftar-asset/' secara bersamaan
        Axios.patch(`http://localhost/daftar-asset/${asset2.id_asset}`, postDataDaftarAsset)
          .then((patchResponse) => {
            console.log('Data Riwayat berhasil disimpan:', postResponse.data);
            console.log('Data Daftar berhasil disimpan:', patchResponse.data);
            // message.success({
            //   type: 'success',
            //   content: 'Riwayat penyerahan dan Daftar Asset telah disimpan',
            //   duration: 2,
            //   style: {
            //     marginTop: '8vh',
            //   },
            // });
            setTimeout(() => {
              router(`/tanda-terima-pengembalian/${newId}/${newTgl}`);
            }, 1000);
          })
          .catch((patchError) => {
            console.error('Terjadi kesalahan saat menyimpan data Daftar Asset:', patchError);
            message.error({
              type: 'error',
              content: 'Terjadi kesalahan saat menyimpan data Daftar Asset',
              duration: 2,
              style: {
                marginTop: '8vh',
              },
            });
          });
      })
      .catch((postError) => {
        console.error('Terjadi kesalahan saat menyimpan data Riwayat:', postError);
        message.error({
          type: 'error',
          content: 'Terjadi kesalahan saat menyimpan data Riwayat',
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

    // Pilih Kode Barang

  <div style={{ display: 'grid', placeItems: 'center'}}>
<Row>
<Col>

<MainCard  style={{ width: '650px' }}>
  
<h2><SwapOutlined /> Serah Terima {selectedValues.value2}</h2>
   <Divider />

   <Form layout="vertical" form={form}
      name="control-hooks" hideRequiredMark>
          {/* <Row gutter={16}>
            <Col span={12}> */}
            <Form.Item
          label="Kode Barang"
          name="kode_barang"
          rules={[
            {
              required: true,
              message: 'Kode barang harus dipilih!',
            },
          ]}
        >
  <Select
  id="kode_barang"
  style={{ textTransform: 'uppercase' }}
  value={selectedValues.value1}
  showSearch
  onChange={(value) => handleSelectChange(value, selectedValues.value2)}
  optionFilterProp="children"
  filterOption={(input, option) =>
    (option.children || '').toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
  placeholder="Pilih Kode Barang"
>
  {data.map((item) => (
    <Select.Option
      style={{ textTransform: 'uppercase' }}
      key={item.id_asset}
      value={item.kode_barang}
      secondValue={item.id_satker}
    >
      {String(item.kode_barang)}
    </Select.Option>
  ))}
</Select>




          </Form.Item>
          <Button type="primary" onClick={updateData}>
          <SwapOutlined  />
        </Button>
        </Form>
 
   
  </MainCard>
  
  
{/* Penerimaan */}

{asset2.status_penggunaan === '1' ? (

<MainCard  style={{ width: '650px', marginTop: '10px' }}>
  
<h2><SwapRightOutlined  /> Pengembalian</h2> 

<div style={{ marginTop: '-50px',float: 'right' }}>
    <Tooltip title="Lihat Riwayat Asset">
      <Button shape="circle" icon={<HistoryOutlined />} />
    </Tooltip>
  </div>

<Divider />

   <Form layout="vertical" form={form}
      name="control-hooks" hideRequiredMark onFinish={handleFormSubmitPenerimaan}>
          {/* <Row gutter={16}>
            <Col span={12}> */}
           

          <Row gutter={16} style={{ marginLeft:'0%'}}>
    <Col span={12}>
      <Statistic title="Nama Barang" value={asset2.nama_barang} prefix={<GoldFilled />} />
    </Col>
    <Col span={12}>
      <Statistic title="Pengguna" value={asset2.pengguna.nama} prefix={<UserOutlined />} />
    </Col>
  </Row>
<br></br>


              <Form.Item
                name="status"
                label="Kondisi Barang"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan pilih status',
                  },
                ]}
              >
               <Radio.Group 
               value={radioValue}
               onChange={onChange}
               optionFilterProp="children"  // Mencari berdasarkan properti 'children' dari opsi
               >
      <Radio.Button value="Normal">Normal</Radio.Button>
      <Radio.Button value="Rusak ringan">Rusak ringan</Radio.Button>
      <Radio.Button value="Rusak berat">Rusak berat</Radio.Button>
    </Radio.Group>
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
          Terima
        </Button>
        
       
      </Form.Item>
        </Form>
 
   
  </MainCard>
  ) : null}

  {/* Penerimaan */}


  {asset2.status_penggunaan === '0' ? (
<MainCard  style={{ width: '650px', marginTop: '10px' }}>
  
  <h2><SwapLeftOutlined /> Penyerahan</h2>
  <div style={{ marginTop: '-50px',float: 'right' }}>
    <Tooltip title="Lihat Riwayat Asset">
      <Button shape="circle" icon={<HistoryOutlined />} />
    </Tooltip>
  </div>

<Divider />
  
     <Form layout="vertical" form={form}
        name="control-hooks" hideRequiredMark onFinish={handleFormSubmitPenyerahan}>
            {/* <Row gutter={16}>
              <Col span={12}> */}
            
  
            <Row gutter={16} style={{ marginLeft:'0%'}}>
    <Col span={12}>
      <Statistic title="Nama Barang" value={asset2.nama_barang} prefix={<GoldFilled />} />
    </Col>
  </Row><br></br>
  
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
                  <Select
    showSearch  // Aktifkan fitur pencarian
    onChange={(value) => handleInputChange('id_pengguna', value)}
    readOnly
    optionFilterProp="children"  // Mencari berdasarkan properti 'children' dari opsi
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }  // Logika pencarian
    placeholder="Pilih pengguna"
  >
    {data2.map((item) => (
      <Select.Option key={item.id_pengguna} value={item.id_pengguna}>
        {item.nama}
      </Select.Option>
    ))}
  </Select>
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
            Serahkan
          </Button>
          
         
        </Form.Item>
          </Form>
   
     
    </MainCard>
    ) : null}
  
  </Col>
  </Row>
  </div>
 
 );
};

export default App;