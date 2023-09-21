import React, { useState } from 'react';




const Register: React.FC = () => {
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userIDError, setuserIDError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setuserIDError('');
    setEmailError('');
    setPasswordError('');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ userID, email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        throw new Error(`Network response was not ok (${res.status})`);
      }

      const data = await res.json();

      if (data.errors) {
        setuserIDError(data.errors.userID);
        setEmailError(data.errors.email);
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
        {/* Signup Form */}
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
            <div className="username error">{userIDError}</div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              type="text"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="email error">{emailError}</div>
          </div>
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
            <div className="password error">{passwordError}</div>
          </div>
          <button
            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>

      <a href="/login" className="flex justify-center">
        <button
          className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 mt-4"
        >
          Login
        </button>
      </a>

      <img src='/login.png' alt="University Logo" className="w-[233px] h-[236px]" />

      <div className="bg-red-500 text-white text-center p-4">
        {/* Add any additional content here */}
      </div>
    </div>
  );
}

export default Register;
