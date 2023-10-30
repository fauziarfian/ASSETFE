import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - sample page
const DaftarAssetItemId = Loadable(lazy(() => import('pages/dashboard/Daftar-Asset-Item/[id]')));

// render - sample page
const TambahAssetBerhasil = Loadable(lazy(() => import('pages/dashboard/Tambah-Asset/[id]')));

// render - sample page
const TandaTerimaPengembalian = Loadable(lazy(() => import('pages/dashboard/Tanda-Terima-Pengembalian/[id]')));

const TandaTerimaPenyerahan = Loadable(lazy(() => import('pages/dashboard/Tanda-Terima-Penyerahan/[id]')));
// render - sample page
const Berhasil = Loadable(lazy(() => import('pages/extra-pages/Berhasil')));

// render - DaftarAsset
const DaftarAsset = Loadable(lazy(() => import('pages/extra-pages/DaftarAsset')));

// render - DaftarAssetDetail
const DaftarAssetItem = Loadable(lazy(() => import('pages/extra-pages/DaftarAssetItem')));

// render - RiwayatAsset
const RiwayatAsset = Loadable(lazy(() => import('pages/extra-pages/RiwayatAsset')));

// render - Pengguna
const Pengguna = Loadable(lazy(() => import('pages/extra-pages/Pengguna')));


// render - Scan Asset
const ScanAsset = Loadable(lazy(() => import('pages/aktifitas/ScanAsset')));

// render - Tambah Asset
const TambahAsset = Loadable(lazy(() => import('pages/aktifitas/TambahAsset')));

// render - Tambah Asset
const Penyerahan = Loadable(lazy(() => import('pages/aktifitas/Penyerahan')));

// render - Tambah Asset
const Penerimaan = Loadable(lazy(() => import('pages/aktifitas/Penerimaan')));

// render - Tambah Asset
const TambahAssetMultiple = Loadable(lazy(() => import('pages/aktifitas/TambahAssetMultiple')));

// render - Tambah Asset
const PenyerahanMultiple = Loadable(lazy(() => import('pages/aktifitas/PenyerahanMultiple')));

// render - Tambah Asset
const PenerimaanMultiple = Loadable(lazy(() => import('pages/aktifitas/PenerimaanMultiple')));


// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage/>
    },
    {
      path: 'list-asset/:id',
      element: <DaftarAssetItemId/>
    },
    {
      path: 'berhasil/:id',
      element: <TambahAssetBerhasil/>
    },
    {
      path: 'Tanda-Terima-Pengembalian/:newId/:newTgl',
      element: <TandaTerimaPengembalian/>
    },
    {
      path: 'Tanda-Terima-Penyerahan/:newId/:newTgl',
      element: <TandaTerimaPenyerahan/>
    },
    {
      path: 'berhasil',
      element: <Berhasil/>
    },
    {
      path: 'daftar-asset',
      element: <DaftarAsset />
    },
    {
      path: 'daftar-asset-item',
      element: <DaftarAssetItem />
    },
    {
      path: 'riwayat-asset',
      element: <RiwayatAsset />
    },
    {
      path: 'pengguna',
      element: <Pengguna />
    },
    {
      path: 'scan-asset',
      element: <ScanAsset />
    },
    {
      path: 'tambah-asset-multiple',
      element: <TambahAssetMultiple />
    },
    {
      path: 'penyerahan-multiple',
      element: <PenyerahanMultiple />
    },
    {
      path: 'penerimaan-multiple',
      element: <PenerimaanMultiple />
    },
    {
      path: 'tambah-asset',
      element: <TambahAsset />
    },
    {
      path: 'penerimaan',
      element: <Penerimaan />
    },
    {
      path: 'penyerahan',
      element: <Penyerahan />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
