import axios from "axios";
import Cookies from "js-cookie";
import res from "@/types/res";

const postHandler = async (URL:string, formData:object, protect:boolean) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: '',
    };
  if (protect) headers.Authorization = `Bearer ${Cookies.get("token")}`;
  const response:res = {
    status: 0,
    data:{},
  };

  await axios
    .post(URL, formData, { headers })
    .then((res) => {
      response.status = 1;
      response.data = res.data;
    })
    .catch((err) => {
      response.status = 0;
      response.data = err.response.data;
    });
  return response;
};

export default postHandler;