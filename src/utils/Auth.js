export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(password, email) {
  // debugger
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
    })
      .then(checkResponse);
      // .then((res) => {
      //   return res.json();
      // })
      // // .then((res) => {
      // //   return res;
      // // })
      // .catch((err) => console.log(err));
}

export function authorize (password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    // .then((res) => {
    //   return res.json();
    // })
    // // .then((data) => {
    // //   if (data.user){
    // //     localStorage.setItem('jwt', data.jwt);
    // //     return data;
    // //   } else {
    // //     return;
    // //   }
    // // })
    // .catch(err => console.log(err))
      .then(checkResponse);
};

// export const getContent = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   })
//   .then(res => res.json())
//   .then(data => data)
// }

