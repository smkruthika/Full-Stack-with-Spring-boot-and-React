import axios from 'axios';
import {API_URL} from '../../constants';

class HelloWorldServcie {
    executeHelloWorldService() {
        return axios.get(`${API_URL} /helloworld-bean`);
    }

    executeHelloWorldPathService(name) {
        return axios.get(`${API_URL}/hello-world/path/${name}`);
    }

}

export default new HelloWorldServcie();