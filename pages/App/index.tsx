import type { NextPage } from 'next';
import Head from 'next/head';
import Popup from 'reactjs-popup';
import Mainmenu from '@/src/components/MainMenu';
import { BiSearchAlt, BiWrench } from 'react-icons/bi';
import { FiEdit2, FiMail, FiShare2 } from 'react-icons/fi';
import { BsTelephone, BsGlobe, BsBell } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TbBuildingCommunity, TbBuildingWarehouse } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import useBreakpoint from '@/src/shared-hooks/use-breakpoint';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
        <div className="wrapper bg-[#f0fdf4] flex gap-7 ">
          <div>
            <Mainmenu />
          </div>
          <div className=" maincontent w-screen">
            <div className="header flex justify-between bg-white shadow-md sticky top-0 z-30 items-center p-5">
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
                      <div className="gap-3 flex  items-center cursor-pointer">
                        <img
                          src="/assets/images/profile.jpg"
                          className="w-12 rounded-full"
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
            <div className="body lg:grid  lg:grid-flow-col gap-7 ">
              <div className="section1 shadow-lg flex flex-col xs:gap-24 sm:gap-20 md:gap-48 lg:gap-24 row-span-3 col-span-1 bg-white ...">
                <div className=" flex flex-col items-center relative ">
                  <img src="/assets/images/building.jpg" alt="" />
                  <img
                    src="/assets/images/mitra.jpeg"
                    className="absolute top-3/4 xs:w-[150px] md:w-[250px] lg:w-[120px] xl:w-[150px] shadow-md rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-5 items-center">
                  <div className="flex flex-col items-center ">
                    <p className="font-bold lg:text-2xl ">
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
                <div className="gap-5 flex flex-col my-auto h-full justify-center">
                  <div className="flex justify-between">
                    <strong>Lokasi</strong>
                    <p className="text-green-700 cursor-pointer">Lihat Semua</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-green-600 flex justify-between rounded-md p-2 grow flex items-center text-white">
                      <TbBuildingCommunity className="text-4xl  xl:text-5xl" />
                      <div>
                        <p className="font-bold xl:text-2xl">20</p>
                        <p>Induk</p>
                      </div>
                    </div>
                    <div className="bg-green-600 flex justify-between rounded-md p-2 grow flex items-center text-white">
                      <BiWrench className="text-4xl xl:text-5xl" />
                      <div className="text-right">
                        <p className="font-bold xl:text-2xl">3</p>
                        <p>Sub Lokasi Level 1</p>
                      </div>
                    </div>
                    <div className="bg-green-600 flex justify-between rounded-md  grow p-2 flex items-center text-white">
                      <TbBuildingWarehouse className="text-4xl xl:text-5xl" />

                      <div className="text-right">
                        <p className="font-bold xl:text-2xl">1</p>
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
                    <div className="flex bg-green-700 rounded-md px-5 p-2 sm:items-center text-center text-white gap-2 font-bold cursor-pointer">
                      <p>+</p>
                      <p>Tambah Akun Bank</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="credit-card pointer-events-none select-none">
                      <div className="relative h-16 w-24 flex-col rounded-xl bg-gradient-to-r from-yellow-500 to-green-400  px-2 text-white shadow-xl">
                        <div className=" top-10 absolute left-14 h-3 w-8">
                          <svg viewBox="0 0 1000 324.68">
                            <path
                              d="m651.19 0.5c-70.933 0-134.32 36.766-134.32 104.69 0 77.9 112.42 83.281 112.42 122.42 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.58-38.571 138.58-107.66 0-82.316-112.89-87.536-112.89-123.86 0-12.908 15.502-27.052 47.663-27.052 36.287 0 65.892 14.99 65.892 14.99l14.326-66.204s-32.213-13.897-77.642-13.897zm-648.97 4.9966-1.7176 9.9931s29.842 5.4615 56.719 16.356c34.607 12.493 37.072 19.765 42.9 42.354l63.511 244.83h85.137l131.16-313.53h-84.942l-84.278 213.17-34.39-180.7c-3.1539-20.681-19.129-32.478-38.684-32.478h-135.41zm411.87 0-66.634 313.53h80.999l66.4-313.53h-80.765zm451.76 0c-19.532 0-29.88 10.457-37.474 28.73l-118.67 284.8h84.942l16.434-47.467h103.48l9.9931 47.467h74.948l-65.385-313.53h-68.273zm11.047 84.707 25.178 117.65h-67.454l42.276-117.65z"
                              fill="#fff"
                            />
                          </svg>
                        </div>
                      </div>
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
                    <div className="credit-card pointer-events-none select-none">
                      <div className="relative h-16 w-24 flex-col rounded-xl bg-gradient-to-r from-yellow-500 to-green-400  px-2 text-white shadow-xl">
                        <div className=" top-10 absolute left-14 h-3 w-8">
                          <svg viewBox="0 0 1000 324.68">
                            <path
                              d="m651.19 0.5c-70.933 0-134.32 36.766-134.32 104.69 0 77.9 112.42 83.281 112.42 122.42 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.58-38.571 138.58-107.66 0-82.316-112.89-87.536-112.89-123.86 0-12.908 15.502-27.052 47.663-27.052 36.287 0 65.892 14.99 65.892 14.99l14.326-66.204s-32.213-13.897-77.642-13.897zm-648.97 4.9966-1.7176 9.9931s29.842 5.4615 56.719 16.356c34.607 12.493 37.072 19.765 42.9 42.354l63.511 244.83h85.137l131.16-313.53h-84.942l-84.278 213.17-34.39-180.7c-3.1539-20.681-19.129-32.478-38.684-32.478h-135.41zm411.87 0-66.634 313.53h80.999l66.4-313.53h-80.765zm451.76 0c-19.532 0-29.88 10.457-37.474 28.73l-118.67 284.8h84.942l16.434-47.467h103.48l9.9931 47.467h74.948l-65.385-313.53h-68.273zm11.047 84.707 25.178 117.65h-67.454l42.276-117.65z"
                              fill="#fff"
                            />
                          </svg>
                        </div>
                      </div>
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
