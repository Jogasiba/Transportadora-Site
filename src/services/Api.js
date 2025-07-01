import axios from "axios";
import cookie from "js-cookie";
function setTokenAxios() {
    let token = cookie.get('token');

    axios.defaults.headers.common['token'] = token;
};

export default { setTokenAxios };