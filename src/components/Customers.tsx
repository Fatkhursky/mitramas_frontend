//@ts-nocheck
import React from 'react';
import Mainmenu from './MainMenu';
import Head from 'next/head';
import { getCust, delCust, updCust, addCust } from '../request/api';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { BsExclamationTriangle } from 'react-icons/bs';
import { MdPersonAdd } from 'react-icons/md';
import { MoonLoader } from 'react-spinners';
const override: CSSProperties = {
  color: 'red',
  margin: 'auto auto',
  // position: "fixed",
};

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  //const [customStyles, setCustomStyle] = useState('');
  const [index, setIndex] = useState();
  const [activeModal, setActiveModal] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');
  const [status, setStatus] = useState('');
  const [sortName, setSortName] = useState(false);
  const [sortStatus, setSortStatus] = useState(false);
  const [search, setSearch] = useState();

  // Search data by name
  useEffect(() => {
    if (search) {
      setCustomers(
        customers.filter((e) =>
          e.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (!search) getData();
  }, [search]);

  // Sort by status
  function handleSortStatus() {
    setSortStatus((prev) => !prev);
    if (sortStatus) {
      function compare(a, b) {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        return 0;
      }
      setCustomers((prev) => prev.sort(compare));
    }
    if (!sortStatus) {
      function compare(a, b) {
        if (a.status < b.status) {
          return 1;
        }
        if (a.status > b.status) {
          return -1;
        }
        return 0;
      }
      setCustomers((prev) => prev.sort(compare));
    }
  }

  // Sort by name
  function handleSortName() {
    setSortName((prev) => !prev);
    if (sortName) {
      function compare(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      setCustomers((prev) => prev.sort(compare));
    }
    if (!sortName) {
      function compare(a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      }
      setCustomers((prev) => prev.sort(compare));
    }
  }

  //Modal
  Modal.setAppElement('*');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    overlay: { background: 'rgba(112, 110, 110, 0.65)' },
    content: {
      borderRadius: '15px',
      width: '18rem',
      top: '20%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      //border: '1px solid rgba(204, 202, 202, 0.75)'
    },
  };

  const editModalStyle = {
    overlay: { background: 'rgba(112, 110, 110, 0.65)' },
    content: {
      borderRadius: '15px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      //border: '1px solid rgba(204, 202, 202, 0.75)'
    },
  };

  // Fetch customers
  async function getData() {
    const token = localStorage.getItem('Authorization');
    try {
      const { data } = await getCust(token);
      setCustomers(data?.data);
      return data;
    } catch (error) {
      throw error.message;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //Delete Customer
  async function deleteCustomer() {
    const token = localStorage.getItem('Authorization');
    //const id = Number(customers[index]?.id);
    try {
      const res = await delCust(token, id);
      return res.data.message;
    } catch (error) {
      throw error.message;
    }
  }

  const handleDelete = (e: any) => {
    e.preventDefault();
    getData();
    setId((prev) => prev);
    setIsOpen(false);
    toast.promise(
      deleteCustomer(),
      {
        loading: 'Loading...',
        success: (data) => {
          // const token = localStorage.getItem('Bearer');
          // toApp();
          getData();
          return data;
        },
        error: (error) => `${error}`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 1000,
        },
      }
    );
  };

  // Update customer data
  async function updateCustomer(e) {
    const data = {
      id: id,
      name: name,
      address: address,
      country: country,
      phone_number: phone,
      job_title: job,
      status: status,
    };
    const token = localStorage.getItem('Authorization');
    //const id = Number(customers[index]?.id);
    try {
      const res = await updCust(token, data);
      return res.data.message;
    } catch (error) {
      throw error.message;
      // return error.data.message
    }
  }

  const handleUpdate = (e: any) => {
    e.preventDefault();
    // getData();
    setId((prev) => prev);
    setIsOpen(false);
    toast.promise(
      updateCustomer(),
      {
        loading: 'Loading...',
        success: (data) => {
          // const token = localStorage.getItem('Bearer');
          // toApp();
          getData();
          return data;
        },
        error: (error) => `${error}`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 1000,
        },
      }
    );
  };

  // Add customer data
  async function addCustomer(e) {
    // const data = {
    //   name: 'Mr Aril',
    //   address: '344 Bogor',
    //   country: 'Indonesia',
    //   phone_number: '+620885454',
    //   job_title: 'Artist',
    //   status: false,
    // };
    const data = {
      name: name,
      address: address,
      country: country,
      phone_number: phone,
      job_title: job,
      status: status,
    };
    const token = localStorage.getItem('Authorization');
    try {
      const res = await addCust(token, data);
      return res.data.message;
    } catch (error) {
      throw error.message;
    }
  }

  const handleAdd = (e: any) => {
    e.preventDefault();
    // getData();
    setId((prev) => prev);
    setIsOpen(false);
    toast.promise(
      addCustomer(),
      // getData(),
      {
        loading: 'Loading...',
        success: (data) => {
          // const token = localStorage.getItem('Bearer');
          // toApp();
          getData();
          return data;
        },
        error: (error) => `${error}`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 1000,
        },
      }
    );
  };

  return (
    <div className="">
      {/* <button onClick={updateCustomer}>UPD CUST</button> */}
      {/* <button onClick={getData}>GETDATA</button> */}
      <Head>
        <title>Customers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App mx-auto max-w-screen-2xl">
        <div className="wrapper bg-[#f0fdf4] flex gap-7 h-screen">
          <div>
            <Mainmenu />
          </div>

          {!customers ? (
            <MoonLoader
              color={'#991b1b'}
              loading={!customers}
              cssOverride={override}
            />
          ) : (
            <div className="section2">
              <div className="py-3 pl-2 flex justify-between items-center">
                <div className="relative max-w-xs">
                  <label htmlFor="hs-table-search" className="sr-only">
                    Search
                  </label>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full p-3 pl-10 text-sm outline-green-400 rounded-md focus:outline-blue-500"
                    placeholder="Search..."
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="h-3.5 w-3.5 text-slate-900"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    onClick={() => {
                      //setIndex(i);
                      setId('');
                      setName('');
                      setAddress('');
                      setCountry('');
                      setPhone('');
                      setJob('');
                      setStatus('');
                      setIsOpen(true);
                      setActiveModal('addModal');
                    }}
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white flex gap-1 font-medium text-xs leading-tight uppercase items-center rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <span>
                      <MdPersonAdd />
                    </span>
                    Add Customer
                  </button>
                </div>
              </div>

              <div className="border rounded-lg max-h-[48rem] overflow-x-scroll flex flex-row">
                <table className="">
                  <thead className="bg-green-600 sticky top-0">
                    <tr className="">
                      <th
                        scope="col"
                        className="flex items-center px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        NO
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span
                          onClick={handleSortName}
                          className="inline-flex items-center text-white cursor-pointer"
                        >
                          Name
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={
                                sortName
                                  ? 'M7 11l5-5m0 0l5 5m-5-5v12'
                                  : 'M17 13l-5 5m0 0l-5-5m5 5V6'
                              }
                            />
                          </svg>
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span className="inline-flex items-center text-white">
                          Adress
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span className="inline-flex items-center text-white">
                          Country
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span className="inline-flex items-center text-white">
                          Phone
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span className="inline-flex items-center text-white">
                          Job
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        <span
                          onClick={handleSortStatus}
                          className="inline-flex items-center text-white cursor-pointer"
                        >
                          Status
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={
                                sortStatus
                                  ? 'M7 11l5-5m0 0l5 5m-5-5v12'
                                  : 'M17 13l-5 5m0 0l-5-5m5 5V6'
                              }
                            />
                          </svg>
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right  uppercase text-white"
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right  uppercase text-white"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers
                      ? customers.map((e, i) => (
                          <tr
                            key={i}
                            className={clsx(
                              ' transition-all hover:bg-zinc-200',
                              i % 2 === 0 ? 'bg-zinc-50' : 'bg-zinc-100'
                            )}
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {i + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {e.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {e.address.split(' ')[1]} ...
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {e.country.split(' ')[0]}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {e.phone_number}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {e.job_title.split(' ')[0]} ...
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex flex-row items-center gap-1">
                              <RiCheckboxBlankCircleFill
                                className={clsx(
                                  e.status ? 'fill-green-400' : 'fill-red-400'
                                )}
                              />
                              {e.status ? 'Active' : 'Inactive'}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                onClick={() => {
                                  //setIndex(i);
                                  setId(customers[i]?.id);
                                  setName(customers[i]?.name);
                                  setAddress(customers[i]?.address);
                                  setCountry(customers[i]?.country);
                                  setPhone(customers[i]?.phone_number);
                                  setJob(customers[i]?.job_title);
                                  setStatus(customers[i]?.status);
                                  setIsOpen(true);
                                  setActiveModal('editModal');
                                }}
                                className="text-green-500 hover:text-green-700"
                                href="#"
                              >
                                Edit
                              </a>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                onClick={() => {
                                  setId(customers[i]?.id);
                                  setName(customers[i]?.name);
                                  setIsOpen(true);
                                  setActiveModal('deleteModal');
                                  // setIndex(i);
                                }}
                                className="text-red-500 hover:text-red-700"
                                href="#"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>

                <Modal
                  isOpen={isOpen && activeModal === 'deleteModal'}
                  //onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Modal Delete"
                >
                  <div className="flex flex-col gap-5 items-center text-center">
                    <div>
                      <svg
                        onClick={closeModal}
                        aria-hidden="true"
                        className="cursor-pointer hover:rounded-md hover:bg-slate-300 w-5 float-right h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p>Are you sure you want to delete this user?</p>
                    </div>
                    <BsExclamationTriangle className="h-12 w-12 fill-red-500" />
                    <div>
                      <p>{name}</p>
                      <p>ID:{id}</p>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-7">
                      <button
                        onClick={handleDelete}
                        className="p-2 bg-red-500 rounded-md text-white"
                      >
                        Yes, Im sure
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 bg-slate-200 rounded-md "
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </Modal>

                <Modal
                  isOpen={isOpen && activeModal === 'editModal'}
                  //onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={editModalStyle}
                  contentLabel="Modal Edit"
                >
                  <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                    <div>
                      <svg
                        onClick={closeModal}
                        aria-hidden="true"
                        className="cursor-pointer hover:rounded-md hover:bg-slate-300 w-5 float-right h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p>Edit Form</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={id || ''}
                          onChange={(e) => setId(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          ID
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={name || ''}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={address || ''}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Address
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={country || ''}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Country
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={phone || ''}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Phone
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={job || ''}
                          onChange={(e) => setJob(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Job
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={status || ''}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Active : true / false
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-7">
                      <button
                        type="submit"
                        className="p-2 bg-red-500 rounded-md text-white"
                      >
                        Save change
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 bg-slate-200 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Modal>

                <Modal
                  isOpen={isOpen && activeModal === 'addModal'}
                  //onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={editModalStyle}
                  contentLabel="Modal Edit"
                >
                  <form onSubmit={handleAdd} className="flex flex-col gap-5">
                    <div>
                      <svg
                        onClick={closeModal}
                        aria-hidden="true"
                        className="cursor-pointer hover:rounded-md hover:bg-slate-300 w-5 float-right h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>

                      <p>Customer Data</p>
                    </div>
                    <div className="flex flex-col gap-7">
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={name || ''}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={address || ''}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Address
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={country || ''}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Country
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={phone || ''}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Phone
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={job || ''}
                          onChange={(e) => setJob(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Job
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="floating_filled"
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={status || ''}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                        <label
                          htmlFor="floating_filled"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Active : true / false
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-7">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-green-700 rounded-md text-white"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 bg-slate-200 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
          )}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Customers;

// <div className="section2 w-4/5">
//             <div className="py-3 pl-2 flex justify-between items-center">
//               <div className="relative max-w-xs">
//                 <label htmlFor="hs-table-search" className="sr-only">
//                   Search
//                 </label>
//                 <input
//                   onChange={(e) =>  setSearch(e.target.value)}
//                   type="text"
//                   name="hs-table-search"
//                   id="hs-table-search"
//                   className="block w-full p-3 pl-10 text-sm outline-green-400 rounded-md focus:outline-blue-500"
//                   placeholder="Search..."
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
//                   <svg
//                     className="h-3.5 w-3.5 text-slate-900"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fill="currentColor"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="flex space-x-2 justify-center">
//                 <button
//                   onClick={() => {
//                     //setIndex(i);
//                     setId('');
//                     setName('');
//                     setAddress('');
//                     setCountry('');
//                     setPhone('');
//                     setJob('');
//                     setStatus('');
//                     setIsOpen(true);
//                     setActiveModal('addModal');
//                   }}
//                   type="button"
//                   data-mdb-ripple="true"
//                   data-mdb-ripple-color="light"
//                   className="inline-block px-6 py-2.5 bg-blue-600 text-white flex gap-1 font-medium text-xs leading-tight uppercase items-center rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
//                 >
//                   <span>
//                     <MdPersonAdd />
//                   </span>
//                   Add Customer
//                 </button>
//               </div>
//             </div>

//             <div className="border rounded-lg max-h-[48rem] overflow-x-scroll flex flex-row">
//               <table className="">
//                 <thead className="bg-green-600 sticky top-0">
//                   <tr className="">
//                     <th
//                       scope="col"
//                       className="flex items-center px-6 py-3 text-xs font-bold text-left text-white uppercase "
//                     >
//                       NO
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//                     >
//                       <span
//                         onClick={handleSortName}
//                         className="inline-flex items-center text-white cursor-pointer"
//                       >
//                         Name
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d={
//                               sortName
//                                 ? 'M7 11l5-5m0 0l5 5m-5-5v12'
//                                 : 'M17 13l-5 5m0 0l-5-5m5 5V6'
//                             }
//                           />
//                         </svg>
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//                     >
//                       <span className="inline-flex items-center text-white">
//                         Adress
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//                     >
//                       <span className="inline-flex items-center text-white">
//                         Country
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//                     >
//                       <span className="inline-flex items-center text-white">
//                         Phone
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//                     >
//                       <span className="inline-flex items-center text-white">
//                         Job
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
//                     >
//                       <span
//                         onClick={handleSortStatus}
//                         className="inline-flex items-center text-white cursor-pointer"
//                       >
//                         Status
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d={
//                               sortStatus
//                                 ? 'M7 11l5-5m0 0l5 5m-5-5v12'
//                                 : 'M17 13l-5 5m0 0l-5-5m5 5V6'
//                             }
//                           />
//                         </svg>
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-right  uppercase text-white"
//                     >
//                       Edit
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-right  uppercase text-white"
//                     >
//                       Delete
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {customers
//                     ? customers.map((e, i) => (
//                         <tr
//                           key={i}
//                           className={clsx(
//                             ' transition-all hover:bg-zinc-200',
//                             i % 2 === 0 ? 'bg-zinc-50' : 'bg-zinc-100'
//                           )}
//                         >
//                           <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
//                             {i + 1}
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                             {e.name}
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                             {e.address.split(' ')[1]} ...
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                             {e.country.split(' ')[0]}
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                             {e.phone_number}
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                             {e.job_title.split(' ')[0]} ...
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex flex-row items-center gap-1">
//                             <RiCheckboxBlankCircleFill
//                               className={clsx(
//                                 e.status ? 'fill-green-400' : 'fill-red-400'
//                               )}
//                             />
//                             {e.status ? 'Active' : 'Inactive'}
//                           </td>
//                           <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
//                             <a
//                               onClick={() => {
//                                 //setIndex(i);
//                                 setId(customers[i]?.id);
//                                 setName(customers[i]?.name);
//                                 setAddress(customers[i]?.address);
//                                 setCountry(customers[i]?.country);
//                                 setPhone(customers[i]?.phone_number);
//                                 setJob(customers[i]?.job_title);
//                                 setStatus(customers[i]?.status);
//                                 setIsOpen(true);
//                                 setActiveModal('editModal');
//                               }}
//                               className="text-green-500 hover:text-green-700"
//                               href="#"
//                             >
//                               Edit
//                             </a>
//                           </td>
//                           <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
//                             <a
//                               onClick={() => {
//                                 setId(customers[i]?.id);
//                                 setName(customers[i]?.name);
//                                 setIsOpen(true);
//                                 setActiveModal('deleteModal');
//                                 // setIndex(i);
//                               }}
//                               className="text-red-500 hover:text-red-700"
//                               href="#"
//                             >
//                               Delete
//                             </a>
//                           </td>
//                         </tr>
//                       ))
//                     : null}
//                 </tbody>
//               </table>

//               <Modal
//                 isOpen={isOpen && activeModal === 'deleteModal'}
//                 //onAfterOpen={afterOpenModal}
//                 onRequestClose={closeModal}
//                 style={customStyles}
//                 contentLabel="Modal Delete"
//               >
//                 <div className="flex flex-col gap-5 items-center text-center">
//                   <div>
//                     <svg
//                       onClick={closeModal}
//                       aria-hidden="true"
//                       className="cursor-pointer hover:rounded-md hover:bg-slate-300 w-5 float-right h-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       ></path>
//                     </svg>
//                     <p>Are you sure you want to delete this user?</p>
//                   </div>
//                   <BsExclamationTriangle className="h-12 w-12 fill-red-500" />
//                   <div>
//                     <p>{name}</p>
//                     <p>ID:{id}</p>
//                   </div>
//                   <div className="flex flex-row items-center justify-center gap-7">
//                     <button
//                       onClick={handleDelete}
//                       className="p-2 bg-red-500 rounded-md text-white"
//                     >
//                       Yes, Im sure
//                     </button>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="p-2 bg-slate-200 rounded-md "
//                     >
//                       No, cancel
//                     </button>
//                   </div>
//                 </div>
//               </Modal>

//               <Modal
//                 isOpen={isOpen && activeModal === 'editModal'}
//                 //onAfterOpen={afterOpenModal}
//                 onRequestClose={closeModal}
//                 style={editModalStyle}
//                 contentLabel="Modal Edit"
//               >
//                 <form onSubmit={handleUpdate} className="flex flex-col gap-5">
//                   <div>
//                     <svg
//                       onClick={closeModal}
//                       aria-hidden="true"
//                       className="cursor-pointer hover:rounded-md hover:bg-slate-300 w-5 float-right h-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       ></path>
//                     </svg>
//                     <p>Edit Form</p>
//                   </div>
//                   <div className="flex flex-col gap-7">
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={id || ''}
//                         onChange={(e) => setId(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         ID
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={name || ''}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Name
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={address || ''}
//                         onChange={(e) => setAddress(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Address
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={country || ''}
//                         onChange={(e) => setCountry(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Country
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={phone || ''}
//                         onChange={(e) => setPhone(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Phone
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={job || ''}
//                         onChange={(e) => setJob(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Job
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={status || ''}
//                         onChange={(e) => setStatus(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Active : true / false
//                       </label>
//                     </div>
//                   </div>
//                   <div className="flex flex-row items-center justify-center gap-7">
//                     <button
//                       type="submit"
//                       className="p-2 bg-red-500 rounded-md text-white"
//                     >
//                       Save change
//                     </button>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="p-2 bg-slate-200 rounded-md"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </Modal>

//               <Modal
//                 isOpen={isOpen && activeModal === 'addModal'}
//                 //onAfterOpen={afterOpenModal}
//                 onRequestClose={closeModal}
//                 style={editModalStyle}
//                 contentLabel="Modal Edit"
//               >
//                 <form onSubmit={handleAdd} className="flex flex-col gap-5">
//                   <div>
//                     <svg
//                       onClick={closeModal}
//                       aria-hidden="true"
//                       className="cursor-pointer hover:rounded-md hover:bg-slate-300 w-5 float-right h-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       ></path>
//                     </svg>

//                     <p>Customer Data</p>
//                   </div>
//                   <div className="flex flex-col gap-7">
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={name || ''}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Name
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={address || ''}
//                         onChange={(e) => setAddress(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Address
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={country || ''}
//                         onChange={(e) => setCountry(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Country
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={phone || ''}
//                         onChange={(e) => setPhone(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Phone
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={job || ''}
//                         onChange={(e) => setJob(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Job
//                       </label>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="floating_filled"
//                         className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         value={status || ''}
//                         onChange={(e) => setStatus(e.target.value)}
//                       />
//                       <label
//                         htmlFor="floating_filled"
//                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
//                       >
//                         Active : true / false
//                       </label>
//                     </div>
//                   </div>
//                   <div className="flex flex-row items-center justify-center gap-7">
//                     <button
//                       type="submit"
//                       className="px-5 py-2 bg-green-700 rounded-md text-white"
//                     >
//                       Add
//                     </button>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="p-2 bg-slate-200 rounded-md"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </Modal>
//             </div>
//           </div>
