// src/app.js
import { Auth, getUser } from './auth';
import { getUserFragmentList, getUserFragments, postUserFragments, getFragmentDataById, getFragmentInfo, deleteFragment, updateFragment } from './api';

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
  const deleteBtn= document.querySelector('#deleteBtn');
  const updateBtn= document.querySelector('#updateBtn');
  const uploadBtn= document.querySelector('#uploadBtn');
  const downloadBtn= document.querySelector('#downloadBtn');
  const updateimgBtn= document.querySelector('#updateimgBtn');

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
  getBTN.onclick = async () => {
    getUserFragments(user);
  }
  getListBTN.onclick = async () => {
    getUserFragmentList(user);
  }

  getByIdBTN.onclick = async () => {
    let id = document.querySelector('#id').value;
    getFragmentDataById(user,id);
  }
  getInfoBTN.onclick = async () => {
  let id = document.querySelector('#id').value;
  getFragmentInfo(user,id);
 }
 deleteBtn.onclick = () => {
  let id = document.querySelector('#id').value;
  deleteFragment(user,id);
 }

 updateBtn.onclick = () => {
  let id = document.querySelector('#id').value;
  let data = document.querySelector('#data').value;
  let type = document.querySelector('#types').value;
  updateFragment(user,id,data,type);
 }

 
 updateimgBtn.onclick = async () => {
  let imageBtn = document.querySelector('#fragmentFile').files[0];
  let id = document.querySelector('#id').value;
  updateFragment(user,id,imageBtn,imageBtn.type);
 }

 uploadBtn.onclick = async () => {
  let image = document.querySelector('#fragmentFile').files[0];
  postUserFragments(user,image,image.type);
  };

  downloadBtn.onclick = async () => {
    let id = document.querySelector('#id').value;
    let frag = await getFragmentDataById(user,id);
    console.log(frag);
    let blob = new Blob([Buffer.from(frag.data.data)], {type: frag.type});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    // a.download = 'fragment.bin';
    a.download = `${id}.${frag.type.split('/')[1]}`;
    a.click();
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