<script>
	import axios from 'axios';
	//import Global CSS from the svelte boilerplate
	//contains Figma color vars, spacing vars, utility classes and more
	import { GlobalCSS } from 'figma-plugin-ds-svelte';

	//import some Svelte Figma UI components
	import { Button, Input, Label, SelectMenu } from 'figma-plugin-ds-svelte';

	// function createShapes() {
	// 	parent.postMessage({ pluginMessage: { 
	// 		'type': 'create-shapes', 
	// 		'count': count,
	// 		'shape': selectedShape.value
	// 	} }, '*');
	// }

	// function cancel() {
	// 	parent.postMessage({ pluginMessage: { 'type': 'cancel' } }, '*')
	// }
	let githubPAT = '';

	async function trigger() {
		console.log('triggering');
		const { data } = await axios.post('http://localhost:3000/trigger', {
			pat: githubPAT
		})
		console.log(data);
	}

</script>


<div class="wrapper p-xxsmall">
	<Label>
		Github PAT
	</Label>
	<input bind:value={githubPAT} class="mb-xxsmall" type="password" />
	<Button on:click={trigger}>Trigger</Button>

</div>


<style>

/* Add additional global or scoped styles here */

</style>