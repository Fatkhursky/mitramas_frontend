import React, { useState } from 'react';
import { BiHomeCircle, BiGroup } from 'react-icons/bi';
import { TbTicket } from 'react-icons/tb';
import { BsBuilding } from 'react-icons/bs';
import { GrCube } from 'react-icons/gr';
import { FaSearchDollar } from 'react-icons/fa';
import { MdOutlineTask } from 'react-icons/md';
import { IoIosApps } from 'react-icons/io';
import { IoPrintOutline } from 'react-icons/io5';
import { RiAppsLine } from 'react-icons/ri';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const menuArr = [
  { name : '/App', comp : <BiHomeCircle />},
  { name : 'dummy', comp : <TbTicket />},
  { name : 'dummy', comp : <MdOutlineTask />},
  { name : 'dummy', comp : <IoPrintOutline />},
  { name : 'dummy', comp : <BsBuilding />},
  { name : '/Customers', comp : <BiGroup />},
  { name : 'dummy', comp :<IoIosApps />},
  { name : 'dummy', comp : <GrCube />},
  { name : 'dummy', comp : <RiAppsLine />},
  { name : 'dummy', comp : <FaSearchDollar />},
  { name : 'dummy', comp : <IoDocumentTextOutline />},
    // <BiHomeCircle />, 
    // <TbTicket />,
    // <MdOutlineTask />,
    // <IoPrintOutline />,
    // <BsBuilding />,
    // <BiGroup />,
    // <IoIosApps />,
    // <GrCube />,
    // <RiAppsLine />,
    // <FaSearchDollar />,
    // <IoDocumentTextOutline />,
]


const Mainmenu = () => {
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState('')
  function onHome () {
    router.push('/')
  }
  return (
    <div className="flex flex-col bg-white shadow-lg h-full text-3xl text-slate-600 cursor-pointer">
    {menuArr.map((e, i) => (
         <div key={i} onClick={ () =>  router.push(e.name)} className={clsx('border-l-4 border-transparent p-4', router.pathname === e.name ? 'bg-[#f0fdf4] border-l-4 border-[#059669]' : null)}>
        {e.comp}
       </div>
    ))}
    </div>
  );
};

export default Mainmenu;

//hover:bg-[#f0fdf4] hover:border-l-4 hover:border-[#059669]
