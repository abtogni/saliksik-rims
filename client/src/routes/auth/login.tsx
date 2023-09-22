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
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-1321 h-86 bg-red-600 border-black border-0.5 text-white text-5xl font-bold break-words text-center">
        UNIVERSITY RESEARCH OFFICE
      </div>

      <div className="flex justify-center items-center">
        

        <form className="p-4 ml-8" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              type="text"
              id="userID"
              name="userID"
              onChange={(e) => setUserID(e.target.value)}
            />
          </div>
          <div className="username error">{userIDError}</div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password error">{passwordError}</div>
          <button
            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>


      <img src='/login.png' alt="University Logo" className="w-[233px] h-[236px]" />

      <div className="bg-red-500 text-white text-center p-4">
        {/* Add any additional content here */}
      </div>
    </div>
  );
}

export default Login;
