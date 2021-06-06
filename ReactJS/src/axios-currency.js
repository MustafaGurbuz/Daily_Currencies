import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.exchangeratesapi.io/v1/latest?access_key=2297daa34a954efbdbab5a14bed35e4b&format=1'
});

export default instance;