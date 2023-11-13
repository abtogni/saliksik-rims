<script lang="ts">
  import { onMount } from 'svelte';
  export let userID: any;
  import { Button, ButtonGroup, InputAddon, ToolbarButton } from 'flowbite-svelte';
  import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';


  let userData: any;
  let json : any;
  let message: any;
  
  
  let show = false;

  async function fetchUser() {
    try {
      const url = `/api/user/getUser?id=${userID}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
        userData = await response.json();
      } else {
        
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (e: any) {
      console.error('Error:', e.message);
    }
  }

  function submit(e: Event) {
    e.preventDefault();


const form = e.target as HTMLFormElement;
const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select');


const nonEmptyValues: Record<string, string> = {};


inputs.forEach((input) => {
  const trimmedValue = input.value.trim();
  if (trimmedValue !== '') {
    nonEmptyValues[input.name] = trimmedValue;
  }
});


if (Object.keys(nonEmptyValues).length === 0) {
  console.log('Please fill in at least one field.');
  return;
}

  console.log(nonEmptyValues);
  // // Make an HTTP POST request to the API
  fetch('/api/user/updateAccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nonEmptyValues),
  })
    .then((response) => {
      if (response.ok) {
        message = 'Account is updated!';
      } else {
        // Handle errors or authentication failures
        console.error('Registration failed');
      }
    })
    .catch((error) => {
      console.error('Network error:', error);
    });
}

  onMount(() => {
    fetchUser();
  });
</script>

<main>
{#if userData}
<form on:submit={submit}>
  <div class="mb-4">
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="text"
        id="id"
        name="id"
        value={userData._id}
        hidden
      />
      <label class="block font-bold mb-2" for="username">
        Username
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="text"
        id="userID"
        name="userID"
        placeholder={userData.userID}
      />
    </div>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="firstName">
        First Name
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="text"
        id="firstName"
        name="firstName"
        placeholder={userData.firstName}
      />
    </div>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="middleName">
        Middle Name
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="text"
        id="middleName"
        name="middleName"
        placeholder={userData.middleName}
      />
    </div>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="lastName">
        Last Name
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="text"
        id="lastName"
        name="lastName"
        placeholder={userData.lastName}
      />
    </div>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="suffix">
        Suffix
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="text"
        id="suffix"
        name="suffix"
        placeholder={userData.suffixName}
      />
    </div>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="email">
        Email
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="email"
        id="email"
        name="email"
        placeholder={userData.email}
      />
    </div>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="password">
        Confirm Password
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-red-900"
        type="password"
        id="password"
        name="password"
        required
      />
    </div>

    <Button type='submit'>Update Profile</Button>
</form>
{:else}
   <div>Error loading user data.</div>
{/if}

</main>

  