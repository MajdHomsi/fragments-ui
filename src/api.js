// src/api.js
const apiUrl = process.env.API_URL;
export async function getUserFragments(user) {
  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log( data );

  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

export async function postUserFragments(user,frag,type) {
  console.log('Posting user fragments data...');
  try {
    if(type == 'application/json'){
      frag = JSON.parse(JSON.stringify(frag));
      console.log(frag);
    }
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
        'Content-type': type,
      },
      body: frag
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    
    console.log('Posted user fragments data', { data });
  } catch (err) {
    console.error('Unable to call POST /v1/fragment', { err });
  }
}
export async function getUserFragmentList(user) {
  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/?expand=1`, {
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log( data );

  } catch (err) {
    console.error('Unable to call GET /v1/fragment/?expand=1', { err });
  }
}

export async function getFragmentDataById(user,id) {
  try {
    if(id != ""){
    console.log(`Requesting user fragments data by id...${id}`);
    console.log(`fetching ${apiUrl}/v1/fragments/${id}`);
    const res = await fetch(`${apiUrl}/v1/fragments/${id}` , {
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const type = res.headers.get("Content-Type");
    if(type.includes("text")){
    const data = await res.text();
    
    console.log(`Got user fragment by id ${id}:` + data);
    document.getElementById("dataBack").innerHTML = data;
    }
    if(type.includes("json")){
      const data = await res.json();
      console.log(data);
    }
    }else{
      document.getElementById("dataBack").textContent = "id can not be empty";
    }
  } catch (err) {
    console.error(`Unable to call GET /v1/fragment/ ${id}`, { err });
  }

}


export async function getFragmentInfo(user,id) {
  console.log(`Requesting user fragments info by id...${id}`);
  console.log(`fetching ${apiUrl}/v1/fragments/${id}/info`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info` , {
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });


    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(`Unable to call GET /v1/fragments/${id}/info`, { err });
  }
} 