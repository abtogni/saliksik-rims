<script lang="ts">
    import { userData } from '../../../components/store';
    import { Card, Avatar, Button } from 'flowbite-svelte';
  import {navOptions} from '../profile/Nav.svelte'	// import application navigation
let selected = navOptions[0];	// keep track of the selected 'page' object 
let intSelected = 0;	// selected page index

// change the selected component (the event.originalTarget.id is not accessible in Chrome so switched to event.srcElement.id)
function changeComponent(event) {
	selected = navOptions[event.srcElement.id];
	intSelected = event.srcElement.id;
}
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
   <div>
<!-- Include Bootstrap CSS-->
<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'>
<div class="container">
	<!-- navigation -->
	<ul class="nav nav-tabs">
		{#each navOptions as option, i}
		<li class="nav-item">
			<button class={intSelected==i ? "nav-link active p-2 ml-1" : "p-2 ml-1 nav-link"} on:click={changeComponent} id={i} role="tab">{option.page}</button>
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