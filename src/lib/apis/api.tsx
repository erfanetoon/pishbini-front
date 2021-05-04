import axios from 'axios';
import Global from './../../global';

const Api = axios.create({
  baseURL: Global.API_BASE_URL + '/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
