import axios from "axios";

const CAT_API_URL = "https://cat-fact.herokuapp.com/facts/";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const JSON_API_URL = "https://godbapps.com/sciPlay/backend/php-vanila/ajaxApi.php";

/**
 * get animal facts from api
 * @param String type 
 * @param Integer amount 
 */
const getFacts = (type="cat",amount=10) => {
  return axios
    .get(CAT_API_URL + "random?animal_type="+type+"&amount="+amount)
    .then((response) => {
      return response.data;
    });
};

/**
 * save json data on our server
 */
const saveJson = (json=[],action="saveJson") => {
  var bodyFormData = new FormData();
  bodyFormData.append('action', action);
  bodyFormData.append('json', json);
  return axios({
    method: 'post',
    url: CORS_PROXY+JSON_API_URL,
    data: bodyFormData
  }).then((response) => {
    return response;
  });
};


export default {
  getFacts,
  saveJson
};

