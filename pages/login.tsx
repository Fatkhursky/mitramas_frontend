//@ts-nocheck
import React from 'react';
import { useEffect, useState } from 'react';
import { loginUser } from '@/src/request/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let body = JSON.stringify({
    email: email,
    password: password,
  });

  let router = useRouter();
  const toApp = () => {
    router.push('/App');
  };

  function noFeature() {
    alert('Maaf fitur belum tersedia...');
  }

  async function login() {
    try {
      const res = await loginUser(body);
      const token = res?.data.access_token;
      localStorage.setItem('Authorization', token);
      const setSession = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });
      return 'Login sucess';
    } catch (error) {
      if (error.response) {
        console.log(error.response.request.statusText);
        throw new Error(error.response.request.statusText);
      } else if (error.request) {
        console.log(error.request);
        throw new Error(error.request);
      } else {
        console.log(error);
        throw new Error(error);
      }
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.promise(
      login(),
      {
        loading: 'Loading...',
        success: (data) => {
          const token = localStorage.getItem('Bearer');
          toApp();
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
    <div className="relative flex flex-col bg-[#f0fdf4] justify-center min-h-screen overflow-hidden">
      <Toaster />

      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <button
          className="bg-slate-500 px-3 text-white rounded-md active:relative active:top-1 shadow-[0_5px_#94a3b8] active:shadow-none"
          onClick={() => {
            setEmail('akun14@mig.id'), setPassword('4A395C92');
          }}
        >
          Click me!
        </button>
        <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">
          Log in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-800 focus:outline-none focus:bg-green-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <a
            onClick={noFeature}
            href="#"
            className="font-medium text-green-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
