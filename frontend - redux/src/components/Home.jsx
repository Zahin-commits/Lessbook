import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const [user,setUser] = useState([]);
  const navigate = useNavigate();
  useEffect( () => {
    const token = localStorage.getItem('authToken');

    ( async function(){if(token){
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      console.log(token);
    const {data} = await axios.get('http://localhost:3000/private',config);

    console.log(data.user);
    if(!data.sucess){
      navigate('/login');
    }

    if(data.status == 401){
      navigate('/login');
    }

    setUser(data.user);
     }else{
    navigate('/login')
     }
    })()
   }, []);


  return (
    <div>
      <h1>hey there dear {user.username} your user info is-</h1> <br />
         {Object.keys(user).map((key, index) => {
        return (
          <div key={index}>
            <h2>
              {key}: {user[key]}
            </h2>
        {/* <Navigate to='/test' /> */}
            <hr />
          </div>
        );
      })}
    
    </div>
  )
}

