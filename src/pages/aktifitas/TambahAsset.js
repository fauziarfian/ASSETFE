import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Space, Steps, DatePicker, Select, Divider, Upload } from 'antd';
import { PlusOutlined, QrcodeOutlined  } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import Axios from 'axios';
import '../aktifitas/style.css';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [image_file, setImage] = useState(null);
  const [data, setSatker] = useState([]);
  const [data2, setKategori] = useState([]);
  const [lastData, setLastData] = useState(null);
  const router = useNavigate();
  const [formData, setFormData] = useState({
    kode_barang: '',
    nama_barang: '',
    spesifikasi: '',
    tanggal_pembelian: '',
    nomer_pembelian:'',

    merk_tipe:'',
    sn:'',
    garansi:'',
    kategori:'',
    catatan:'',
    // kondisi:'',
    lampiran:'',

    nup:'',
    tgl_rekam_pertama: '',
    tgl_perolehan: '',
    nilai_perolehan_pertama: '',
    nilai_mutasi: '',
    nilai_perolehan: '',
    nilai_penyusutan: '',
    nilai_buku: '',
    kuantitas: '',
    jml_foto: '',
  
    no_psp: '',
    tgl_psp: '',
    
  });

  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    fetchData2();
    fetchData3();
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
  
  const fetchData2 = async () => {
    try {
        const response = await Axios.get('http://localhost/daftar-asset/');
        // Dapatkan jumlah pengguna dari data API
         if (response.data.data.length > 0) {
          setLastData(response.data.data[response.data.data.length - 1]);
        }
  
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
  };  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat

  const fetchData3 = async () => {
    try {
        const response = await Axios.get('http://localhost/kategori/');
        // Dapatkan jumlah pengguna dari data API
         // Perbarui nilai state jumlahPengguna
         setKategori(response.data.data);
  
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
  };  // Gunakan array kosong agar useEffect hanya berjalan sekali saat komponen dimuat
  

  //function "handleFileChange"
  const handleImageChange = (info) => {
    if (info.fileList.length > 0) {
      // Ambil berkas pertama dari fileList
      const gambar = info.fileList[0].originFileObj;
      setImage(gambar);
    } else {
      // Atau atur gambar menjadi null jika tidak ada berkas yang dipilih
      setImage(null);
    }
  };
  

const currentDate = new Date();
const seconds = currentDate.getSeconds().toString().padStart(2, '0');
const year = currentDate.getFullYear().toString().slice(-2);
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Perlu ditambahkan 1 karena bulan dimulai dari 0 (0 = Januari, 11 = Desember)
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDate = `${seconds}${day}${month}${year}`;

  const steps = [
    {
      title: 'Informasi Asset',
      content: (
        <><br></br>
      
         <Form.Item
            label="Satker"
            name="id_satker"
            rules={[
              {
                required: true,
                message: 'Satker harus dipilih!',
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


           <Form.Item
            label="Nama Barang"
            name="nama_barang"
            initialValue={formData.nama_barang}
            rules={[
              {
                required: true,
                message: 'Nama Barang harus diisi!',
              },
            ]}
          >
            <Input
              placeholder="Masukkan nama barang"
              value={formData.nama_barang}
              onChange={(e) => handleInputChange('nama_barang', e.target.value)}
            />
          </Form.Item>

           <Form.Item 
         label="Tanggal Pembelian" 
         name="tanggal_pembelian" 
         initialValue={formData.tanggal_pembelian}
         rules={[
          {
            required: true,
            message: 'Tanggal pembelian harus diisi!',
          },
        ]}
         >
            <DatePicker
              placeholder="Pilih tanggal"
              value={formData.tanggal_pembelian}
              onChange={(date) => handleInputChange('tanggal_pembelian', date)}
            />
          </Form.Item>

          <Form.Item
            label="Nomor Pembelian"
            name="nomor_pembelian"
            initialValue={formData.nomer_pembelian}
            rules={[
              {
                required: true,
                message: 'Nomer pembelian harus diisi!',
              },
            ]}
          >
            <Input
              placeholder="Masukkan nomer pembelian"
              value={formData.nomer_pembelian}
              onChange={(e) => handleInputChange('nomer_pembelian', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Merk Tipe"
            name="merk_tipe"
            initialValue={formData.merk_tipe}
            rules={[
              {
                required: true,
                message: 'Merk tipe harus diisi!',
              },
            ]}
          >
            <Input
              placeholder="Masukkan merk tipe"
              value={formData.merk_tipe}
              onChange={(e) => handleInputChange('merk_tipe', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="SN"
            name="sn"
            initialValue={formData.sn}
            rules={[
              {
                required: true,
                message: 'Nomer SN harus diisi!',
              },
            ]}
          >
          
            <Input
              placeholder="Masukkan nomer SN"
              value={formData.sn}
              onChange={(e) => handleInputChange('sn', e.target.value)}
            />
          </Form.Item>
          <Divider />

          <Form.Item
            label="Garansi"
            name="garansi"
            initialValue={formData.garansi}
            rules={[
              {
                required: true,
                message: 'Garansi harus diisi!',
              },
            ]}
          >
            <Select
          placeholder="Pilih Garansi"
          onChange={(value) => handleInputChange('garansi', value)}
          readOnly
        >
          
          <Select.Option  value="Selamanya">Selamanya</Select.Option>
          <Select.Option  value="5 Tahun">5 Tahun</Select.Option>
          <Select.Option  value="4 Tahun">4 Tahun</Select.Option>
          <Select.Option  value="3 Tahun">3 Tahun</Select.Option>
          <Select.Option  value="2 Tahun">2 Tahun</Select.Option>
          <Select.Option  value="1 Tahun">1 Tahun</Select.Option>
          <Select.Option  value="6 Bulan">6 Bulan</Select.Option>
          <Select.Option  value="3 Bulan">3 Bulan</Select.Option>
          <Select.Option  value="2 Minggu">2 Minggu</Select.Option>
          <Select.Option  value="1 Minggu">1 Minggu</Select.Option>
          <Select.Option  value="Tidak Ada">Tidak Ada</Select.Option>
          
          {/* Anda bisa menambahkan opsi-opsi lain di sini */}
        </Select>
          </Form.Item>

          <Form.Item
            label="Kategori"
            name="kategori"
            rules={[
              {
                required: true,
                message: 'Kategori harus dipilih!',
              },
            ]}
          >
                  <Select
          placeholder="Pilih Kategori"
          onChange={(value) => handleInputChange('kategori', value)}
          readOnly
        >
          {data2.map((item) => (
          <Select.Option key={item.id_kategori} value={item.id_kategori}>{item.kategori}</Select.Option>
          ))}
          {/* Anda bisa menambahkan opsi-opsi lain di sini */}
        </Select>
          </Form.Item>

          <Form.Item 
           label="Spesifikasi" 
           name="spesifikasi" 
           initialValue={formData.spesifikasi}
           rules={[
            {
              required: true,
              message: 'Spesifikasi harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan Spesifikasi"
                  value={formData.spesifikasi}
                  onChange={(e) =>
                    handleInputChange('spesifikasi', e.target.value)
                  }
                />
          </Form.Item>

          <Form.Item 
           label="Catatan" 
           name="catatan" 
           initialValue={formData.catatan}
           rules={[
            {
              required: true,
              message: 'Catatan harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan Catatan"
                  value={formData.catatan}
                  onChange={(e) =>
                    handleInputChange('catatan', e.target.value)
                  }
                />
          </Form.Item>

          {/* <Form.Item 
           label="Kondisi" 
           name="kondisi" 
           initialValue={formData.kondisi}
           rules={[
            {
              required: true,
              message: 'Kondisi harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan Kondisi"
                  value={formData.kondisi}
                  onChange={(e) =>
                    handleInputChange('kondisi', e.target.value)
                  }
                />
          </Form.Item> */}

                  
          <Form.Item
            label="Lampiran"
            name="lampiran"
            initialValue={formData.lampiran}
            
          >
            <Upload
              action="URL_endpoint_pengunggahan" // Gantilah dengan URL endpoint yang sesuai
              listType="picture"
              maxCount={1}
              fileList={image_file ? [{ originFileObj: image_file }] : []} // Perbarui properti fileList
              onChange={handleImageChange} // Tambahkan onChange untuk menangani perubahan berkas
            >
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Form.Item>


          
          <Divider />
          
          {/* Tambahkan field lain untuk langkah 1 */}
        </>
      ),
    },
    {
      title: 'Info Perolehan ( Optional )',
      content: (
        <><br></br>
           <Form.Item 
           label="NUP" 
           name="nup" 
           initialValue={formData.nup}
           rules={[
            {
              required: true,
              message: 'NUP harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan NUP"
                  value={formData.nup}
                  onChange={(e) =>
                    handleInputChange('nup', e.target.value)
                  }
                />
          </Form.Item>

          <Form.Item 
         label="Tgl Rekam Pertama" 
         name="tgl_rekam_pertama" 
         initialValue={formData.tgl_rekam_pertama}
         rules={[
          {
            required: true,
            message: 'Tgl rekam pertama harus diisi!',
          },
        ]}
         >
            <DatePicker
              placeholder="Pilih tanggal"
              value={formData.tgl_rekam_pertama}
              onChange={(date) => handleInputChange('tgl_rekam_pertama', date)}
            />
          </Form.Item>

          <Form.Item 
         label="Tgl Perolehan" 
         name="tgl_perolehan" 
         initialValue={formData.tgl_perolehan}
         rules={[
          {
            required: true,
            message: 'Tgl perolehan harus diisi!',
          },
        ]}
         >
            <DatePicker
              placeholder="Pilih tanggal"
              value={formData.tgl_perolehan}
              onChange={(date) => handleInputChange('tgl_perolehan', date)}
            />
          </Form.Item>

          <Form.Item 
           label="Nilai Perolehan Pertama" 
           name="nilai_perolehan_pertama" 
           initialValue={formData.nilai_perolehan_pertama}
           rules={[
            {
              required: true,
              message: 'Nilai perolehan pertama harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan nilai perolehan pertama"
                  value={formData.nilai_perolehan_pertama}
                  onChange={(e) =>
                    handleInputChange('nilai_perolehan_pertama', e.target.value)
                  }
                />
          </Form.Item>

          <Form.Item 
           label="Nilai Mutasi" 
           name="nilai_mutasi" 
           initialValue={formData.nilai_mutasi}
           rules={[
            {
              required: true,
              message: 'Nilai mutasi harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan nilai mutasi"
                  value={formData.nilai_mutasi}
                  onChange={(e) =>
                    handleInputChange('nilai_mutasi', e.target.value)
                  }
                />
          </Form.Item>

          <Form.Item 
           label="Nilai Perolehan" 
           name="nilai_perolehan" 
           initialValue={formData.nilai_perolehan}
           rules={[
            {
              required: true,
              message: 'Nilai perolehan harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan nilai perolehan"
                  value={formData.nilai_perolehan}
                  onChange={(e) =>
                    handleInputChange('nilai_perolehan', e.target.value)
                  }
                />
          </Form.Item>

          <Divider />

          <Form.Item 
           label="Nilai Penyusutan" 
           name="nilai_penyusutan" 
           initialValue={formData.nilai_penyusutan}
           rules={[
            {
              required: true,
              message: 'Nilai penyusutan harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan nilai penyusutan"
                  value={formData.nilai_penyusutan}
                  onChange={(e) =>
                    handleInputChange('nilai_penyusutan', e.target.value)
                  }
                />
          </Form.Item>

          <Form.Item 
           label="Nilai Buku" 
           name="nilai_buku" 
           initialValue={formData.nilai_buku}
           rules={[
            {
              required: true,
              message: 'Nilai buku harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan nilai buku"
                  value={formData.nilai_buku}
                  onChange={(e) =>
                    handleInputChange('nilai_buku', e.target.value)
                  }
                />
          </Form.Item>

          <Form.Item 
           label="Kuantitas" 
           name="kuantitas" 
           initialValue={formData.kuantitas}
           rules={[
            {
              required: true,
              message: 'Kuantitas harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan Kuantitas"
                  value={formData.kuantitas}
                  onChange={(e) =>
                    handleInputChange('kuantitas', e.target.value)
                  }
                />
          </Form.Item>

          <Form.Item 
           label="Jml Foto" 
           name="jml_foto" 
           initialValue={formData.jml_foto}
           rules={[
            {
              required: true,
              message: 'Jml foto harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan Jml foto"
                  value={formData.jml_foto}
                  onChange={(e) =>
                    handleInputChange('jml_foto', e.target.value)
                  }
                />
          </Form.Item>

          

          <Form.Item 
           label="No PSP" 
           name="no_psp" 
           initialValue={formData.no_psp}
           rules={[
            {
              required: true,
              message: 'No PSP harus diisi!',
            },
          ]}
           >
             <Input
                  placeholder="Masukkan No PSP"
                  value={formData.no_psp}
                  onChange={(e) =>
                    handleInputChange('no_psp', e.target.value)
                  }
                />
          </Form.Item>

          <Form.Item 
         label="Tgl PSP" 
         name="tgl_psp" 
         initialValue={formData.tgl_psp}
         rules={[
          {
            required: true,
            message: 'Tgl PSP harus diisi!',
          },
        ]}
         >
            <DatePicker
              placeholder="Pilih tanggal"
              value={formData.tgl_psp}
              onChange={(date) => handleInputChange('tgl_psp', date)}
            />
          </Form.Item>

          <Divider />
         
          {/* Tambahkan field lain untuk langkah 2 */}
        </>
      ),
    },
   
    // Tambahkan langkah-langkah lain sesuai kebutuhan
  ];

  const handleFormSubmit = () => {


    let body = new FormData();

    const lastID = lastData ? lastData.id_asset : 1;
    const kodeBarangValue = `${formattedDate}-${lastID}`;
    const id = `${formData.id_satker}-${kodeBarangValue}`;

    body.append('kode_barang', `${formData.id_satker}-${kodeBarangValue}`);
    body.append('id_satker', formData.id_satker);
    body.append('nama_barang', formData.nama_barang);
    body.append('tanggal_pembelian', formData.tanggal_pembelian);
    body.append('nomer_pembelian', formData.nomer_pembelian);

    body.append('merk_tipe', formData.merk_tipe);
    body.append('sn', formData.sn);
    body.append('garansi', formData.garansi);
    body.append('kategori', formData.kategori);
    body.append('spesifikasi', formData.spesifikasi);
    body.append('catatan', formData.catatan);
    // body.append('kondisi', formData.kondisi);
    body.append('lampiran', image_file);

    body.append('nup', formData.nup);
    body.append('tgl_rekam_pertama', formData.tgl_rekam_pertama);
    body.append('tgl_perolehan', formData.tgl_perolehan);
    body.append('nilai_perolehan_pertama', formData.nilai_perolehan_pertama);
    body.append('nilai_mutasi', formData.nilai_mutasi);
    body.append('nilai_perolehan', formData.nilai_perolehan);
    body.append('nilai_penyusutan', formData.nilai_penyusutan);
    body.append('nilai_buku', formData.nilai_buku);
    body.append('kuantitas', formData.kuantitas);
    body.append('jml_foto', formData.jml_foto);
    body.append('status_penggunaan', '0');
    body.append('no_psp', formData.no_psp);
    body.append('tgl_psp', formData.tgl_psp);

    // const postData = {
    //   kode_barang: formData.kode_barang,
    //   id_pengguna: 'tes',
    //   id_satker: 'tes',
    //   nama_barang: formData.nama_barang,
    //   tanggal_pembelian: formData.tanggal_pembelian,
    //   nomer_pembelian: formData.nomer_pembelian,

    //   merk_tipe: formData.merk_tipe,
    //   sn: formData.sn,
    //   garansi: formData.garansi,
    //   kategori: formData.kategori,
    //   spesifikasi: formData.spesifikasi,
    //   catatan: formData.catatan,
    //   kondisi: formData.kondisi,
    //   lampiran: 'tes',

    //   nup: formData.nup,
    //   tgl_rekam_pertama: formData.tgl_rekam_pertama,
    //   tgl_perolehan: formData.tgl_perolehan,
    //   nilai_perolehan_pertama: formData.nilai_perolehan_pertama,
    //   nilai_mutasi: formData.nilai_mutasi,
    //   nilai_perolehan: formData.nilai_perolehan,
    //   nilai_penyusutan: formData.nilai_penyusutan,
    //   nilai_buku: formData.nilai_buku,
    //   kuantitas: formData.kuantitas,
    //   jml_foto: formData.jml_foto,
    //   status_penggunaan: formData.status_penggunaan,
    //   no_psp: formData.no_psp,
    //   tgl_psp: formData.tgl_psp,
    // };
    // // Validasi langkah saat ini
    form
      .validateFields()
      .then(() => {

        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
        // Kirim data menggunakan Axios setelah validasi berhasil
        Axios.post('http://localhost/daftar-asset/', body)
          .then((response) => {
            console.log('Data berhasil disimpan:', response.data);
            // message.success({
            //   type: 'success',
            //   content: 'Item berhasil ditambah',
            //   duration: 2,
            //   style: {
            //     marginTop: '8vh',
            //   },
            // });
            // Mengosongkan input field dengan mengatur formData ke objek kosong
            setFormData({
              kode_barang: '',
              nama_barang: '',
              spesifikasi: '',
              tanggal_pembelian: '',
              nomer_pembelian: '',

              merk_tipe:'',
              sn:'',
              garansi:'',
              kategori:'',
              catatan:'',
              // kondisi:'',
              lampiran:'',

              nup:'',
              tgl_rekam_pertama: '',
              tgl_perolehan: '',
              nilai_perolehan_pertama: '',
              nilai_mutasi: '',
              nilai_perolehan: '',
              nilai_penyusutan: '',
              nilai_buku: '',
              kuantitas: '',
              jml_foto: '',
             
              no_psp: '',
              tgl_psp: '',
            });
            setTimeout(() => {
              router (`/berhasil/${id}`);
            }, 1000);
          })
          .catch((error) => {
            console.error('Terjadi kesalahan saat menyimpan data:', error);
          });
        }
      })
      .catch((errorInfo) => {
        console.error('Terjadi kesalahan dalam validasi:', errorInfo);
      });
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const [form] = Form.useForm();

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <Row>
        <Col>

        <Steps current={currentStep}>
              {steps.map((step) => (
                <Step key={step.title} title={step.title} />
              ))}
              <Step 
              icon={<QrcodeOutlined />}
              title="Cetak QR Code" />
            </Steps><br></br>
          <MainCard style={{ width: '650px' }}>
          <h2><PlusOutlined /> Tambah Asset</h2>
          <Divider />
            <Form
              form={form}
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
              onFinish={handleFormSubmit}
              autoComplete="off"
            >
              {steps[currentStep].content}
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space wrap>
                  {currentStep > 0 && (
                    <Button onClick={() => setCurrentStep(currentStep - 1)}>Kembali</Button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <Button type="primary" onClick={handleFormSubmit}>
                      Lanjut
                    </Button>
                  ) : (
                    <Button type="primary" onClick={handleFormSubmit}>
                      Simpan
                    </Button>
                  )}
                </Space>
              </Form.Item>
            </Form>
          </MainCard>
        </Col>
      </Row>
    </div>
  );
};

export default App;
