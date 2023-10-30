import React, { useState, useEffect } from 'react';
import { Button, Drawer, Divider, Col, Row, Image, Tooltip } from 'antd';
import { FolderOpenOutlined, CloseOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import '../aktifitas/style.css';
import axios from 'axios'; // Import Axios

const App = ({ assetId, updateData }) => {
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [data, setData] = useState({}); // Inisialisasi data dengan objek kosong

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    updateData();
}, []);

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost/daftar-asset/${assetId}`);
      setData(response.data.data); // Set data dengan respons dari API
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <>
    <Tooltip title="Lihat Detail">
      <Button style={{ marginRight: '8px' }} onClick={() => { showDrawer(); updateData(); }}>
        <FolderOpenOutlined />
      </Button>
      </Tooltip>
      <Drawer width={760} placement="right" closable={false} onClose={onClose} open={open}>
        <CloseOutlined style={{ marginTop: '50px' }} onClick={onClose} />
        <Divider />
        <p className="site-description-item-profile-p">Informasi Barang : <b>{data.kode_barang}</b></p>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem title="Nama Barang" content={data.nama_barang} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Satker" content={data.id_satker} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Tanggal Pembelian" content={data.tanggal_pembelian} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Nomer Pembelian" content={data.nomer_pembelian} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Merk / Tipe" content={data.merk_tipe} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="SN" content={data.sn} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Garansi" content={data.garansi} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Kategori" content={data.kategori} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Merk / Tipe" content={data.spesifikasi} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="SN" content={data.sn} />
          </Col>
        </Row>
         <Row>
         <Col span={12}>
          <DescriptionItem title="Lampiran" />
            <Image
    width={80}
    src={`http://localhost/uploads/lampiran/${data.lampiran}`}
    preview={{
      src: `http://localhost/uploads/lampiran/${data.lampiran}`,
    }}
  />
          </Col>
         <Col span={12}>
            <DescriptionItem title="Catatan" content={data.catatan} />
          </Col>
         
        
        </Row>
        <Divider />
        <Row>
          <Col span={24}>

            <Button type="primary" onClick={showChildrenDrawer}>
              Info Perolehan <RightOutlined />
            </Button>
          </Col>
        </Row>

        

        <Drawer
          title="Two-level Drawer"
          width={760}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >

          <Button type="primary" onClick={onChildrenDrawerClose}>
            <LeftOutlined /> Informasi Barang
          </Button>
          <Divider />
          <p className="site-description-item-profile-p">Info Perolehan <b>{data.kode_barang}</b></p>
          <Divider />
          <Row>
          <Col span={12}>
            <DescriptionItem title="NUP" content={data.nup} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Tgl Rekam Pertama" content={data.tgl_rekam_pertama} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Tgl Perolehan" content={data.tgl_perolehan} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Nilai Perolehan Pertama" content={data.nilai_perolehan_pertama} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Nilai Mutasi" content={data.nilai_mutasi} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Nilai Perolehan" content={data.nilai_perolehan} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Nilai Penyusutan" content={data.nilai_penyusutan} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Nilai Buku" content={data.nilai_buku} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Kuantitas" content={data.kuantitas} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Jml Foto" content={data.jml_foto} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Tgl Perolehan" content={data.tgl_perolehan} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="No PSP" content={data.no_psp} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Tgl PSP" content={data.tgl_psp} />
          </Col>
       
        </Row>
        </Drawer>
      </Drawer>
    </>
  );
};

export default App;
