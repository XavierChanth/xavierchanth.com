<script>
	import '../app.css';
	let { children } = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
  function closeMenu() {
    isMenuOpen = false
  }
</script>

<main class="min-h-screen bg-gray-100 flex flex-col">

	<nav class="bg-white shadow-lg sticky top-0">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between items-center h-16">
				<div class="text-xl font-bold text-gray-800">
					<a href="/">XavierChanth</a>
				</div>
        <!-- Desktop -->
				<div class="hidden md:flex space-x-4">
					<!-- TODO: highlight active -->
					<a href="/" class="text-gray-600 hover:text-gray-900">About</a>
					<a
						href="https://github.com/xavierchanth"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-600 hover:text-gray-900"
					>
						Projects
					</a>
					<a href="/posts" class="text-gray-600 hover:text-gray-900">Posts</a>
				</div>
        <!-- Mobile -->
				<div class="md:hidden">
					<button onclick={toggleMenu} class="text-gray-600 hover:text-gray-900 focus:outline-none">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{#if isMenuOpen}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							{:else}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							{/if}
						</svg>
					</button>
				</div>
			</div>
      {#if isMenuOpen}
        <div class="flex flex-col justify-items-center text-center gap-4 pb-4">
          <a onclick={closeMenu} href="/" class="text-gray-600 hover:text-blue-500 flex-col-1">About</a>
          <a
            onclick={closeMenu}
            href="https://github.com/xavierchanth"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-blue-500 flex-col-1"
          >Projects</a>
        <a onclick={closeMenu} href="/posts" class="text-gray-600 hover:text-blue-500 flex-col-1">Posts</a>
        </div>
      {/if}
		</div>
	</nav>
	<div class="flex-grow">
		{@render children()}
	</div>

	<footer class="bg-gray-800 text-white py-8">
		<div class="max-w-6xl mx-auto px-4 text-center">
			<p>&copy; 2025 Xavier Chanthavong. All rights reserved.</p>
		</div>
	</footer>
</main>
