<script lang="ts">
    let json = {};
  
  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());

    // Make an HTTP POST request to the API
    fetch('/api/research/createResearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful response (e.g., redirect to a new page)
          window.location.href = '/main/';
        } else {
          // Handle errors or authentication failures
          console.error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  }
    </script>
    
    <form on:submit={submit}>
      <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="researchTitle">
            Research Title
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="text"
            id="researchTitle"
            name="researchTitle"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="researchLeaders">
            Research Leaders
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="text"
            id="researchLeaders"
            name="researchLeaders"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="researchMembers">
            Research Members
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="text"
            id="researchMembers"
            name="researchMembers"
          />
        </div>
        
        <button
        class="w-64 h-10  bg-red-800 hover:bg-red-900 shadow-lg text-white font-bold py-2 px-4 mb-6 border rounded"
        type="submit"
      >
        Register
      </button>
    </form>
    
    <pre>
      
      {JSON.stringify(json, null, 2)}
    </pre>
    
    <style>
      /* Your CSS styles go here */
    </style>
    