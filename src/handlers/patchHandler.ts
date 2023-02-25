import axios from "axios";
import Cookies from "js-cookie";
import res from "@/types/res";

const patchHandler = async (URL:string, formData:object, protect:boolean, type:string='application/json') => {
    const headers = {
        'Content-Type': type,
        Authorization: '',
    };
  if (protect) headers.Authorization = `Bearer ${Cookies.get("token")}`;
  const response:any = {
    status: 0,
    data:{},
  };

  await axios
    .patch(URL, formData, { headers })
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

export default patchHandler;