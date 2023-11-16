<script lang="ts">
    import { userData } from '../../../components/store';
    import { Card, Avatar, Button } from 'flowbite-svelte';
    
  </script>
  <main>
   <div class="translate-x-1/4 mt-10 container">
  
    {#if $userData}
    <Card padding="sm">
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
  </main>
  