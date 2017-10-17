import Cookies from 'universal-cookie';

export const PREFIX = 'foodie_';
const cookies = new Cookies();

export const set = (name, obj) => {
  cookies.set(`${PREFIX}${name}`, JSON.stringify(obj), { path: '/' });
};

export const get = (name) => {
  return cookies.get(`${PREFIX}${name}`);
};

export const remove = (name) => {
  cookies.remove(`${PREFIX}${name}`);
};

export const removeAll = () => {
  let result = cookies.getAll();
  for (let prop in result) {
    cookies.remove(prop);
  }
}

// for debugging purposes
export const print = () => {
  console.log(cookies.getAll());
}
