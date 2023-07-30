import axios from "axios";

export function registerCall (data){
    const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
 return axios.post('http://localhost:3000/auth/register',data,config);
} 