import React, { useState } from 'react';
import axios from 'axios';

function Login({setIsLogin, setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        username,
        password,
      });
  
      // Handle successful login (e.g., redirect to a home page)
      if(response.data.success){ 
        setIsLogin(true) 
        
        setUser(response.data.user)
    }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <form className="container w-1/4 border mx-auto p-4 my-5" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Login
      </button>
    </form>
  );
}

export default Login;
