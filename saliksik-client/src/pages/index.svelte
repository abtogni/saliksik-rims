<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    const response = await fetch('/api/checkUser'); // Replace with your backend endpoint
    const data = await response.json();
	});

  let json = {};

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());

    // Make an HTTP POST request to the API
    fetch('/api/login', {
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


<main>
    <div> 
    
        <!-- Updated class -->
        <div class="min-h-screen flex flex-col justify-between">
           <!-- Flex Container -->
          <div class="flex justify-between mt-36 ml-36 mr-36"> 
          
          <!--  Logo  -->
          <div class="hidden lg:block w-[300px] h-[300px] mt-20">
          <img 
          src='/saliksiklogo.png' 
          alt="University Logo" 
          class="py-1 px-1 logo" 
          />
         </div>
    
          <!-- Signup Form  -->
          <div class="flex-col">
          <form class="w-full" on:submit={submit}>
    
          
          <p class=" text-white text-6xl sm:text-4xl md:text-3xl lg:text-6xl text-left  font-bold font-['Space Grotesk']">Welcome back</p>
          <p class="text-white underline underline-offset-1 sm:text-4xl md:text-3xl lg:text-5xl text-[50.52px] text-left font-medium font-['Space Grotesk']">Login Your Account.</p>
          <p class="text-white sm:text-xl md:text-lg lg:text-xl text-[28.43px] text-left font-normal font-['Space Grotesk']">Enter your username and password to continue.</p>
          
          <p class="font-['Space Grotesk'] font-bold text-left text-white">Login as</p>
          
          
          <select id='userType' name='userType' data-te-select-init class="font-['Space Grotesk'] mb-1 w-64 h-9 rounded-md">
            <option value="personnel">Personnel</option>
            <option value="admin">Admin</option>
          </select>
     
              <div class="mb-1">
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
              <label class="block text-white font-bold mb-2" for="userType">
                User Type
              </label>
            


              <!-- Login Button -->
              <button
                class="w-64 h-10  bg-red-800 hover:bg-red-900 shadow-lg text-white font-bold py-2 px-4 mb-6 border rounded"
                type="submit"
              >
                Login
              </button>
              </form>
              
               <p>
            <a class="text-left text-white hover:text-blue-700 text-sm" href="/">Forgot Password?</a>
          </p>  
          </div>
          </div>
        </div>
        </div>
</main>

<style>
    img.logo{
        max-width: 100%;
    }
</style>