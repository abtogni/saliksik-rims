import React from 'react';


function Login() {
  return (
    <div className="bg-gray-300">
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-1321 h-86 bg-red-600 border-black border-0.5 text-white text-5xl font-bold break-words text-center">
        UNIVERSITY RESEARCH OFFICE
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full">

  <div className="p-4 m-6">
    <img src="/login.png" alt="University Logo" className="w-233 h-236" />
  </div>
        <form className="max-w-md mx-auto bg-white p-10">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username
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
              Password
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
         

        <div className="flex flex-wrap px-10 py-10">
        <a href="/register">
          <button
            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 mt-4"
          >
            Register
          </button>
        </a>
      </div>
      </div>

    <div className="bg-red-500 text-white text-center p-4">
        {/* Add any additional content here */}
      </div>

    </div>
    </div>
  );
}

export default Login;
