import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css';
// import Mainmenu from '../../src/components/MainMenu';
import Popup from 'reactjs-popup';
import Mainmenu from '@/src/components/MainMenu';
import { BiSearchAlt, BiWrench } from 'react-icons/bi';
import { FiEdit2, FiMail, FiShare2 } from 'react-icons/fi';
import { BsTelephone, BsGlobe, BsBell } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TbBuildingCommunity, TbBuildingWarehouse } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import profile from '~/public/assets/images/profile.jpg';
import building from '~/public/assets/images/building.jpg';
import mitra from '~/public/assets/images/mitra.jpeg';
import useBreakpoint from '@/src/shared-hooks/use-breakpoint';
import { loginUser } from '@/src/request/api';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const breakpoint = useBreakpoint();
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<any>();
  const [didMount, setDidMount] = useState(false);

  let body = JSON.stringify({
    email: 'akun14@mig.id',
    password: '4A395C92',
  });

  useEffect(() => {
    setDidMount(true);
  }, [breakpoint]);

  function noFeature() {
    alert('Maaf fitur belum tersedia...');
  }

  let router = useRouter();
  const logOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: `/api/auth/signin`,
    });
    localStorage.removeItem('Bearer');
    router.push(data.url);
  };

  return (
    <div>
      <Head>
        <title>App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="App mx-auto max-w-screen-2xl">
        <div className="wrapper bg-[#f0fdf4] flex gap-7 h-screen">
          <div>
            <Mainmenu />
          </div>
          <div className="maincontent w-screen">
            <div className="header flex justify-between items-center p-5">
              <div className="flex gap-5 items-center">
                <p className="text-slate-400">Perusahaan</p>
                <p className="text-slate-400">{'>'}</p>
                <p className="font-bold">Mitaramas Infosys Global</p>
              </div>
              <div className="flex items-center gap-12">
                <div className="flex gap-3">
                  <BiSearchAlt onClick={noFeature} className="cursor-pointer" />
                  <BsBell onClick={noFeature} className="cursor-pointer" />
                </div>

                {didMount ? (
                  <Popup
                    trigger={
                      <div className="flex gap-3 cursor-pointer">
                        <img
                          className="w-8 rounded-full"
                          src={'/assets/images/profile.jpg'}
                          alt=""
                        />
                        <p>Mrs John Doe</p>
                      </div>
                    }
                    {...{}}
                    position="bottom left"
                    on={['hover', 'focus']}
                  >
                    <div className="flex flex-col bg-[#f0fdf4] rounded-md">
                      <div
                        onClick={noFeature}
                        className="cursor-pointer hover:bg-[#f1f5f9] p-2"
                      >
                        <p>Profile</p>
                      </div>
                      <div
                        onClick={logOut}
                        className="cursor-pointer hover:bg-[#f1f5f9] p-2 rounded-b-xl"
                      >
                        <p className="text-red-500">Log Out</p>
                      </div>
                    </div>
                  </Popup>
                ) : null}
              </div>
            </div>
            {/* grid-rows-1 */}
            <div className="body grid  grid-flow-col gap-7 ">
              <div className="section1 shadow-lg flex flex-col gap-12 row-span-3 col-span-1 bg-white ...">
                <div className=" flex flex-col items-center relative bg-red-400">
                  <img
                    className="object-covee h-32 w-full "
                    src={'/assets/images/building.jpg'}
                    alt=""
                  />
                  <img
                    className="rounded-full h-24 w-24 drop-shadow-lg absolute top-1/2"
                    src={'/assets/images/mitra.jpeg'}
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-5 items-center">
                  <div className="flex flex-col items-center ">
                    <p className="font-bold text-xl ">
                      Mitramas Infosys global
                    </p>
                    <p className="text-slate-400">Layanan IT</p>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={noFeature}
                  >
                    <FiEdit2 className="text-green-700" />
                    <p className="text-green-700">Sunting Profil</p>
                  </div>
                  <div className="flex flex-col gap-2 w-10/12">
                    <p className="text-slate-400">Status Perusahaan</p>
                    <div className="flex justify-between">
                      <p className="text-green-700">Aktif</p>
                      <div className="flex items-center justify-center w-fit">
                        <label
                          htmlFor="toggleB"
                          className="flex items-center cursor-pointer"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="toggleB"
                              className="sr-only"
                            />

                            <div className="body block bg-slate-400 w-10 h-6 rounded-full"></div>

                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <p className="text-slate-400">Singkatan</p>
                    <p>MIG</p>
                    <p className="text-slate-400">Alamat Perusahaan</p>
                    <p>Jl. Tebet Raya No.42, Jakarta Selatan</p>
                    <p className="text-slate-400">Penanggung Jawab (PIC)</p>
                    <p>John Doe</p>
                    <p className="text-slate-400">Tanggal PKP</p>
                    <p>03 Maret 2021</p>
                    <p className="text-slate-400">E-mail</p>
                    <div className="flex items-center gap-2">
                      <FiMail className="text-green-700" />
                      <p className="text-green-700 underline">
                        mig@mitrasolusi.group
                      </p>
                    </div>
                    <p className="text-slate-400">No. Telp</p>
                    <div className="flex items-center gap-2">
                      <BsTelephone className="text-green-700" />
                      <p className="text-green-700">021-5678-1234</p>
                    </div>
                    <p className="text-slate-400">Situs Web</p>
                    <div className="flex items-center gap-2">
                      <BsGlobe className="text-green-700" />
                      <a
                        className="text-green-700 underline cursor-pointer"
                        href="https://www.mitrasolusi.group/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        mitramas.com
                      </a>
                      {/* <p className="text-green-700 underline cursor-pointer">mitramas.com</p> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="section2 col-span-2 row-span-1  bg-white shadow-lg p-5 ...">
                <div className="gap-7 flex flex-col my-auto h-full justify-center">
                  <div className="flex justify-between">
                    <strong>Lokasi</strong>
                    <p className="text-green-700 cursor-pointer">Lihat Semua</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-green-600 flex justify-between rounded-md  p-3 grow flex items-center text-white">
                      <TbBuildingCommunity className="text-5xl" />
                      <div>
                        <p className="font-bold text-2xl">20</p>
                        <p>Induk</p>
                      </div>
                    </div>
                    <div className="bg-green-600 flex justify-between rounded-md p-3 grow flex items-center text-white">
                      <BiWrench className="text-5xl" />
                      <div className="text-right">
                        <p className="font-bold text-2xl">3</p>
                        <p>Sub Lokasi Level 1</p>
                      </div>
                    </div>
                    <div className="bg-green-600 flex justify-between rounded-md  grow p-3 flex items-center text-white">
                      <TbBuildingWarehouse className="text-5xl" />

                      <div className="text-right">
                        <p className="font-bold text-2xl">1</p>
                        <p>Sub Lokasi Level 1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section3 col-span-1 row-span-1  bg-white p-5 shadow-lg ...">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <strong>Akun Bank</strong>
                    <div className="flex bg-green-700 rounded-md px-5 py-1 text-white gap-2 font-bold cursor-pointer">
                      <p>+</p>
                      <p>Tambah Akun Bank</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="bg-gradient-to-r from-yellow-300 to-green-400 h-20 w-52 rounded-xl">
                      Visa
                    </div>
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between w-full">
                        <strong>Bank KB Bukopin</strong>
                        <div className="flex gap-2">
                          <FiEdit2 className="text-green-700 cursor-pointer" />
                          <RiDeleteBin5Line className="text-red-700 cursor-pointer" />
                        </div>
                      </div>
                      <div className="text-slate-400">
                        <p>**** 0876 - Yusron Taufiq</p>
                        <p>IDR</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="bg-gradient-to-r from-slate-400 to-sky-400 h-20 w-52 rounded-xl">
                      Visa
                    </div>
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between w-full">
                        <strong>Citibank, NA</strong>
                        <div className="flex gap-2">
                          <FiEdit2 className="text-green-700 cursor-pointer" />
                          <RiDeleteBin5Line className="text-red-700 cursor-pointer" />
                        </div>
                      </div>
                      <div className="text-slate-400">
                        <p>**** 5525 - Si Tampan</p>
                        <p>USD</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section4 col-span-1 flex flex-col gap-5 row-span-1 bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <strong>Relasi</strong>
                  <p className="text-green-600 cursor-pointer">Lihat Semua</p>
                </div>
                <div className="flex items-center gap-5">
                  <FiShare2 className="text-2xl" />
                  <div>
                    <strong>20</strong>
                    <p className="text-slate-400">Memiliki</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <FiShare2 className="text-2xl" />
                  <div>
                    <strong>108</strong>
                    <p className="text-slate-400">Menggunakan</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <FiShare2 className="text-2xl" />
                  <div>
                    <strong>67</strong>
                    <p className="text-slate-400">Meminjam</p>
                  </div>
                </div>
              </div>
              <div className="section5 col-span-1 flex flex-col gap-6 row-span-2 bg-white p-5 shadow-lg">
                <div>
                  <strong>Aktivitas</strong>
                </div>
                <div className="felx -flex-col text-slate-500">
                  <p>
                    Yusron Baru saja menambahkan lokasi baru Kantor Cabang
                    Jagakarsa
                  </p>
                  <p className="text-xs text-slate-400">Hari ini, 06:00</p>
                </div>
                <div className="felx -flex-col text-slate-500">
                  <p>
                    Bintang baru saja menghapus sublokasi KCP Tebet 4 dari induk
                    Kantor Cabang Tebet
                  </p>
                  <p className="text-xs text-slate-400">Kemarin, 17:32</p>
                </div>
                <div className="felx -flex-col text-slate-500">
                  <p>
                    Yusron melakukan perubahan profil pada induk Kantor Cabang
                    Bekasi
                  </p>
                  <p className="text-xs text-slate-400">Kemarin, 17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
