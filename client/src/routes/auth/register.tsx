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

      const data = await res.json();

      console.log(data);

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
        <form className="p-6 ml-0" onSubmit={handleFormSubmit}>
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
              onChange={(e) => setUserID(e.target.value)}
            />
            <div className="username error">{userIDError}</div>
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="email error">{emailError}</div>
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password error">{passwordError}</div>
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
    </div>
    </div>
  );
}

export default Register;
