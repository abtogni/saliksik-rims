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
    
    <div className="bg-gray-300"> 
    
    {/*Updated class*/}
    <div className="min-h-screen flex flex-col justify-between">
      {/* Flex Container*/}
      <div className="flex justify-between m-12 py-3 px-11"> 
      
      {/* Logo */}
      <div className="m-10 h-236px w-233px">
      <img 
      src='/login.png' 
      alt="University Logo" 
      className="py-1 px-1" 
      style={{ maxWidth: '100%' }}
      />
     </div>

      {/* Signup Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form className="p-6 ml-0" onSubmit={handleFormSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-600"
              type="text"
              id="userID"
              name="userID"
              onChange={(e) => setUserID(e.target.value)}
            />
          </div>
          <div className="username error">{userIDError}</div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-600"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password error">{passwordError}</div>
          {/*Login Button */}
          <button
            className="w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
          >
            Login
          </button>
          </form>
        <footer>
        <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a>
        <a className="text-indigo-700 hover:text-pink-700 text-sm float-right" href="/register">Create Account</a>
      </footer>  
      </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
