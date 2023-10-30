// assets
import { OrderedListOutlined } from '@ant-design/icons';
import { FieldTimeOutlined } from '@ant-design/icons';
import { UsergroupDeleteOutlined } from '@ant-design/icons';



// icons
const icons = {
  OrderedListOutlined,
  FieldTimeOutlined,
  UsergroupDeleteOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //


const dashboard = {
  id: 'group-dashboard',
  title: 'Navigasi',
  type: 'group',
  children: [
    {
      id: 'daftar-asset',
      title: 'Daftar Asset',
      type: 'item',
      url: '/daftar-asset',
      icon: icons.OrderedListOutlined,
      breadcrumbs: false
    },
    // {
    //   id: 'riwayat-asset',
    //   title: 'Riwayat Asset',
    //   type: 'item',
    //   url: '/riwayat-asset',
    //   icon: icons.FieldTimeOutlined,
    //   breadcrumbs: false
    // },
    {
      id: 'pengguna',
      title: 'Pengguna',
      type: 'item',
      url: '/pengguna',
      icon: icons.UsergroupDeleteOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
