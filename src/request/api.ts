//@ts-nocheck
import axios from 'axios';

//Login
export const loginUser = async (body: {}) => {
  const res = await axios.post(
    'https://mitramas-test.herokuapp.com/auth/login',
    body,
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  return res;
};
//Get customers data
export const getCust = async (token) => {
  const res = await axios.get('https://mitramas-test.herokuapp.com/customers', {
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
  });
  return res;
};

//Delete customer
export const delCust = async (token, id) => {
  const res = await axios.delete(
    'https://mitramas-test.herokuapp.com/customers',
    {
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      data: {
        id: id,
      },
    }
  );
  return res;
};

//Update Customer
export const updCust = async (token, data) => {
  const res = await axios.put(
    'https://mitramas-test.herokuapp.com/customers',
    data,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    }
  );
  return res;
};

//Add Customer
export const addCust = async (token, data) => {
  const res = await axios.post(
    'https://mitramas-test.herokuapp.com/customers',
    data,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    }
  );
  return res;
};
