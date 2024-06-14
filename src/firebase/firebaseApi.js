import axios from 'axios';
import {firebaseConfig} from './firebaseConfig';

const firebaseApi = axios.create({
  baseURL: firebaseConfig.databaseURL,
});

export default firebaseApi;
