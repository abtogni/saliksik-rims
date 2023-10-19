import React from 'react'
import Footing from '../partials/Footing'

function register() {
  return (
    <div className="bg-gray-300"> {/*BACKROUND*/}{/*Updated class*/}
    <div className="min-h-screen flex flex-col justify-between">

      <div className="flex justify-between m-12 py-3 px-11">{/* Flex Container*/}
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
        <form className="p-6 ml-0">
        <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-600"//updated classes
              type="text"
              id="userID"
              name="userID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-600"//updated classes
              type="text"
              id="email"
              name="email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password 
            </label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-600"//updated classes
              type="password"
              id="password"
              name="password"
            />
          </div>
          {/*Register Button */}
          <button
            className="w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
          >
            Register
          </button>
        </form>
        <footer>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
         Already have an account? <a href="/Login" className="font-medium text-indigo-700 hover:underline dark:text-primary-500">Login here</a>
         </p>
      </footer>  
        </div>

      </div>
      <Footing />
    </div>
    </div>
  )
}

export default register