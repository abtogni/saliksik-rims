<script lang="ts">
    import { userData } from '../../../components/store';
    import { Card, Avatar, Button } from 'flowbite-svelte';
  import {navOptions} from '../profile/Nav.svelte'	
let selected = navOptions[0];	// keep track of the selected 'page' object 
let intSelected = 0;	// selected page index

// change the selected component
function changeComponent(event) {
	selected = navOptions[event.srcElement.id];
	intSelected = event.srcElement.id;
}
  </script>
  <main>
   <div class="container">
  
    {#if $userData}
    <div class="ml-9">
      <div class="flex flex-row gap-5 items-center pb-4">
        <Avatar size='xl'><h1 class="text-5xl"> {$userData.firstName.charAt(0) + $userData.lastName.charAt(0)} </h1></Avatar>
       <div class="flex flex-col"> 
        <h1 class="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{`${$userData.firstName} ${$userData.lastName}`}</h1>
        <span class="text-lg text-gray-500 dark:text-gray-400">{$userData.userType}</span>
      </div>
        <div class="flex mt-4 space-x-3 lg:mt-6">
          <a href={`${$userData._id}/editProfile`}><Button>Edit Profile</Button></a> 
        </div>
      </div>
    </div>
    {/if} 
   <div>
<!-- Include Bootstrap CSS-->
<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'>
<div class="container">
	<!-- navigation -->
	<ul class="nav nav-tabs">
		{#each navOptions as option, i}
		<li class="nav-item">
			<button class={intSelected==i ? "nav-link active p-2 ml-1" : "p-2 ml-1 nav-link hover:bg-button hover:text-white"} on:click={changeComponent} id={i} role="tab">{option.page}</button>
		</li>
		{/each}
	</ul>
	<!-- content wrapper -->
	<div class="row">
		<div class="col-sm-12">
			<div class="p-2">
				<h1>{selected.page}</h1>
				<!-- this is where our main content is placed -->
				<svelte:component this={selected.component}/>
			</div>
		</div>
	</div>
</div>
</div>
  </main>