import axios from 'axios';

const fetchFromCMS = async (path) => {
  const url = `http://localhost:1337/${path}`;
  const res = await axios.get(url);
  // eslint-disable-next-line no-console
  console.log('data:', res.data);
  return res.data;
};

export default fetchFromCMS;
