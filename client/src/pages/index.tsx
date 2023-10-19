import React from 'react'

function index() {
  return (
    <div className='flex flex-auto'>
      <div className='container'>
        <img 
        src='/login.png' 
        alt="University Logo" 
        className="py-1 px-1" 
        style={{ maxWidth: '100%' }}
        />
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input type="text" name="userID" id="userID" />
            <div className="username error">Error username</div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
          <input type="password" name="password" id="password" />
          <div className="password error">Error password</div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="userType">
              User Type
            </label>
          <select name="userType" id="userType">
            <option value="admin">Admin</option>
            <option value="personnel">Personnel</option>
          </select>
          <button
            className="w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default index