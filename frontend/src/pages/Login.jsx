import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';


const Login = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

 
    const navigate = useNavigate();
    useEffect(()=>{

        if(localStorage.getItem("access_token")){
           if(localStorage.getItem("user") =='admin'){
               navigate('/admin-dashboard');
           }else{
               navigate('/employee-dashboard');
           }
        }

    },[])
   

const handle_submit = async(e)=>{
    e.preventDefault();

    
    await axios.post('https://ems-backend-six.vercel.app/api/auth/login',{email,password})
    .then((resp)=>{
        
          if(resp.data.success){
            // console.log(resp.data.user.name);
            localStorage.setItem("access_token",resp.data.token);
           //localStorage.setItem("user",resp.data.user.name);
            const token = localStorage.getItem("access_token");
            
             console.log("response",resp.data.user)
             if(resp.data.user._doc.role == "employee"){
                return navigate('/employee-dashboard');
             }else{
               return navigate('/admin-dashboard');
             }
            
          }
       else{
       return console.log('login success is false in backend that get in frontend  ',resp.data)
          }
          
    })
    .catch((error)=>{
        console.log("error in catch api in login in frontend");
    })
     
   
}


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-lightblue-400 to-white">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-lightblue-400">
                    Employment Management System
                </h2>
                <form onSubmit={handle_submit}>
                    <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e)=>setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white font-bold py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { Login };
