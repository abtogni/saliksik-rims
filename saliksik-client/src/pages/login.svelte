<script lang="ts">
    import { onMount } from 'svelte';
    import UNCLogo from '/saliksiklogo.png';
    import { goto } from '@roxi/routify';
  
    onMount(async () => {
      try {
        const response = await fetch('/api/checkAuth');
        console.log('Response status:', response.status);
  
        if (response.status === 401) {
          $goto('/login');
        } else if (response.status === 200) {
          $goto('/main');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    });
  
    let showError = false;
    let errorMessage = "Change a few things up and try submitting again";
  
    function handleError(err: any) {
      showError = true;
      errorMessage = err.error;
    }
  
    function clearError() {
      setTimeout(function () {
        showError = false;
      }, 2000);
    }
  
    function submit(e: Event) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const loginData = Object.fromEntries(formData.entries());
  
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then(async (response) => {
          if (response.ok) {
            $goto('/main');
          } else {
            const errorData = await response.json();
            handleError(errorData);
            clearError();
          }
        })
        .catch((error) => {
          console.error('Network error:', error);
        });
    }
  </script>
  

<main>
    <div> 
      {#if showError}
        <div class="fixed inset-0 overflow-y-auto w-full max-w-2xl max-h-full translate-x-1/2 z-10 mt-10">
          <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">{errorMessage}</span> Please check and try again.
            </div>
          </div>
        </div>
        {/if}
        <!-- Updated class -->
        <div class="min-h-screen flex flex-col justify-between">
           <!-- Flex Container -->
          <div class="flex justify-between mt-36 ml-36 mr-36"> 
          
          <!--  Logo  -->
          <div class="hidden lg:block w-[300px] h-[300px] mt-20">
          <img 
          src={UNCLogo}
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