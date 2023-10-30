import React, { useState, useEffect } from 'react';
import { Button, Drawer, Divider, Col, Row, Tooltip } from 'antd';
import { HistoryOutlined,  CloseOutlined} from '@ant-design/icons';
import '../aktifitas/style.css';
import axios from 'axios'; // Import Axios

const App = ({ kodeBarang, updateData }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]); // Inisialisasi data dengan objek kosong

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




  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen pertama kali dimuat
    updateData();
}, []);

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost/riwayat-asset/kode-barang/${kodeBarang}`);
      setData(response.data.data); // Set data dengan respons dari API
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <>
    <Tooltip title="Lihat Riwayat">
      <Button style={{ marginRight: '8px' }} onClick={() => { showDrawer(); updateData(); }}>
      <HistoryOutlined />
      </Button>
      </Tooltip>
      <Drawer width={660} placement="right" closable={false} onClose={onClose} open={open}>
        <CloseOutlined style={{ marginTop: '50px' }} onClick={onClose} />
        <Divider />
        <p className="site-description-item-profile-p">Riwayat : <b>{kodeBarang}</b></p>
        <Divider />

        {data.map((item) => (
    <div key={item.id_riwayat}>
      <Row>
        <Col span={12}>
          <b><DescriptionItem title="Tanggal" content={item.create_at} /></b>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Kode Barang" content={item.kode_barang} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Nama Barang" content={item.item_name} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Pengguna" content={item.pengguna.nama} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Status" content={item.status} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Catatan" content={item.catatan} />
        </Col>

        
        <Col span={12}>
        {item.status === 'Pengembalian' ? (
          <DescriptionItem title="Kondisi" content={item.kondisi} />
          ) : null }
        </Col>
     

      </Row>
      <Divider />
    </div>
 
))}

        
         
      </Drawer>
    </>
  );
};

export default App;
