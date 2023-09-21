import React from 'react';
import UncLogo from '../../assets/login.png';

function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-1321 h-86 bg-red-600 border-black border-0.5 text-white text-5xl font-bold break-words text-center">
        UNIVERSITY RESEARCH OFFICE
      </div>

      <div className="flex justify-center items-center">
        

        <form className="p-4 ml-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              type="text"
              id="username"
              name="username"
              required
            />
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
              required
            />
          </div>
          <button
            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>

      <a href="/register" className="flex justify-center">
        <button
          className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 mt-4"
        >
          Register
        </button>
      </a>

      <img src={UncLogo} alt="University Logo" className="w-[233px] h-[236px]" />

      <div className="bg-red-500 text-white text-center p-4">
        {/* Add any additional content here */}
      </div>
    </div>
  );
}

export default Login;
