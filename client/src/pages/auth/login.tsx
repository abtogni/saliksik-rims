import React, { useState } from 'react';

const Login: React.FC = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [userIDError, setuserIDError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setuserIDError('');
    setPasswordError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ userID, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      console.log(data);



      if (data.errors) {
        setuserIDError(data.errors.userID);
        setPasswordError(data.errors.password);
      } else if (data.user) {
        // Redirect or handle successful signup
        window.location.assign('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <div className="bg-backround"> {/*backround*/}
    
    {/*Updated class*/}
    <div className="min-h-screen flex flex-col justify-between">
      {/* Flex Container*/}
      <div className="flex justify-between mt-36 ml-36 mr-36"> 
      
      {/* Logo */}
      <div className="hidden lg:block w-[300px] h-[300px] mt-20">
      <img 
      src='/saliksiklogo.png' 
      alt="University Logo" 
      className="py-1 px-1" 
      style={{ maxWidth: '100%' }}
      />
     </div>

      {/* Signup Form */}
      <div className="flex-col">
      <form className="w-full" onSubmit={handleFormSubmit}>

      
      <p className=" text-white text-6xl sm:text-4xl md:text-3xl lg:text-6xl text-left  font-bold font-['Space Grotesk']">Welcome back</p>
      <p className="text-white underline underline-offset-1 sm:text-4xl md:text-3xl lg:text-5xl text-[50.52px] text-left font-medium font-['Space Grotesk']">Login Your Account.</p>
      <p className="text-white sm:text-xl md:text-lg lg:text-xl text-[28.43px] text-left font-normal font-['Space Grotesk']">Enter your username and password to continue.</p>
      
      <p className="font-['Space Grotesk'] font-bold text-left text-white">Login as</p>
      
      <select data-te-select-init className="font-['Space Grotesk'] mb-1 w-64 h-9 rounded-md">
  <option value="personnel">Personnel</option>
  <option value="Admin">Admin</option>
 </select>
 
          <div className="mb-1">
            <label className="font-['Space Grotesk'] block text-white font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
              type="text"
              id="userID"
              name="userID"
              onChange={(e) => setUserID(e.target.value)}
            />
          </div>
          <div className="username error">{userIDError}</div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-900"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password error">{passwordError}</div>
          {/*Login Button */}
          <button
            className="w-64 h-10  bg-red-800 hover:bg-red-900 shadow-lg text-white font-bold py-2 px-4 mb-6 border rounded"
            type="submit"
          >
            Login
          </button>
          </form>
          
           <p>
        <a className="text-left text-white hover:text-blue-700 text-sm" href="#">Forgot Password?</a>
      </p>  
      </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
