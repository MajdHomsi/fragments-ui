// src/app.js
import { Auth, getUser } from './auth';
import { getUserFragmentList, getUserFragments, postUserFragments, getFragmentDataById, getFragmentInfo } from './api';

async function init() {
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  const postSection = document.querySelector('#post');
  const postBTN = document.querySelector('#postBtn');
  const getBTN = document.querySelector('#getBtn');
  const getListBTN = document.querySelector('#getListBtn');
  const getByIdBTN = document.querySelector('#getByIdBtn');
  const getInfoBTN = document.querySelector('#getInfoBtn');

  loginBtn.onclick = () => {
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    Auth.signOut();
  };

  const user = await getUser();
  if (!user) {
    logoutBtn.disabled = true;
    return;
  }

  postBTN.onclick = () => {
    let data = document.querySelector('#data').value;
    let type = document.querySelector('#types').value;
    console.log(type);
    postUserFragments(user,data,type);

  }
  getBTN.onclick = () => {
    getUserFragments(user);
  }
  getListBTN.onclick = () => {
    getUserFragmentList(user);
  }

  getByIdBTN.onclick = () => {
    let id = document.querySelector('#id').value
    getFragmentDataById(user,id);
  }
  getInfoBTN.onclick = () => {
  let id = document.querySelector('#id').value
  getFragmentInfo(user,id);
 }
  console.log({ user });
  userSection.hidden = false;
  userSection.querySelector('.username').innerHTML = user.username;

  loginBtn.disabled = true;
  if(loginBtn.disabled = true){
    postSection.hidden = false;
  }
  

}
addEventListener('DOMContentLoaded', init);