<script lang="ts">
  let json = {};
  let message: any;
function submit(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  json = Object.fromEntries(formData.entries());

  // Make an HTTP POST request to the API
  fetch('/api/user/createAccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  })
    .then((response) => {
      if (response.ok) {
        message = 'Created an account!';
      } else {
        // Handle errors or authentication failures
        console.error('Registration failed');
      }
    })
    .catch((error) => {
      console.error('Network error:', error);
    });
}
  </script>
  
  <form on:submit={submit}>
    <div class="mb-1">
        <label class="block text-white font-bold mb-2" for="userType">User Type</label>
        <select data-te-select-init id='userType' name='userType' class="font-['Space Grotesk'] mb-1 w-64 h-9 rounded-md">
            <option value="personnel">Personnel</option>
            <option value="Admin">Admin</option>
          </select>
    </div>
    <div class="mb-4">
        <label class="block text-white font-bold mb-2" for="username">
          Username
        </label>
        <input
          class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
          type="text"
          id="userID"
          name="userID"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white font-bold mb-2" for="firstName">
          First Name
        </label>
        <input
          class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
          type="text"
          id="firstName"
          name="firstName"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white font-bold mb-2" for="middleName">
          Middle Name
        </label>
        <input
          class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
          type="text"
          id="middleName"
          name="middleName"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white font-bold mb-2" for="lastName">
          Last Name
        </label>
        <input
          class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
          type="text"
          id="lastName"
          name="lastName"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white font-bold mb-2" for="suffix">
          Suffix
        </label>
        <input
          class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
          type="text"
          id="suffix"
          name="suffix"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-900"
          type="password"
          id="password"
          name="password"
        />
      </div>

      <button
      class="w-64 h-10  bg-red-800 hover:bg-red-900 shadow-lg text-white font-bold py-2 px-4 mb-6 border rounded"
      type="submit"
    >
      Register
    </button>
  </form>
  
  