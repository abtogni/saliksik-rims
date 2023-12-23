<script lang="ts">
    import { userData } from '../../../components/store';
    import { Card, Avatar, Button } from 'flowbite-svelte';
   
  import { Navbar, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

  </script>
  <main class="h-screen bg-white">
   <div class="translate-x-1/4 mt-10 container">
  
    {#if $userData}
    <Card padding="sm" class="left: 200">
      <div class="flex flex-col items-center pb-4">
        <Avatar size='xl'><h1 class="text-5xl"> {$userData.firstName.charAt(0) + $userData.lastName.charAt(0)} </h1></Avatar>
        <h1 class="mb-1 text-3xl font-medium text-gray-900 dark:text-white">{`${$userData.firstName} ${$userData.lastName}`}</h1>
        <span class="text-lg text-gray-500 dark:text-gray-400">{$userData.userType}</span>
        <div class="flex mt-4 space-x-3 lg:mt-6">
          <a href={`${$userData._id}/editProfile`}><Button>Edit Profile</Button></a> 
        </div>
      </div>
    </Card>
    {/if} 
   </div>
   <Navbar class="">
    <NavHamburger />
    <NavUl class="flex">
      <NavLi class="flex-1 mr-2 text-center border border-blue-500 hover:bg-button rounded py-2 px-4" href="/">Personal Information</NavLi>
      <NavLi href="/docs/components/navbar">Research Outputs</NavLi>
      <NavLi href="/docs/components/accordion">Task and Notification Management</NavLi>
      <NavLi href="/docs/components/alert">Funding Information</NavLi>
    </NavUl>
  </Navbar>
  </main>
  