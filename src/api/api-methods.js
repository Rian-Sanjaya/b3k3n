import axios from "axios";

export function getAPI(url) {
  return new Promise(async (resolve, reject) => {
    try {
      // to fix Cross-Origin Resource Sharing 
      // to prevent CORS the api server has to add Access-Control-Allow-Origin key in response header
      const cors_api_url = 'https://riansjcorsproxy.herokuapp.com/';
      const response = await axios({
        method: 'GET',
        url: cors_api_url + url,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};