<script>
	// @ts-nocheck

	import { page } from '$app/state';
</script>

<div class="text-center">
	<h1 class="text-4xl mt-8 mb-4">Error: {page.status}</h1>
	<p class="text-lg mb-8">{page.error.message}</p>
	<a href="/" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
		>Back to Homepage</a
	>
</div>
