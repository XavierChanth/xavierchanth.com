<script>
	import '../app.css';
	let { children } = $props();
export const prerender = true;
</script>

<main class="min-h-screen bg-gray-100 flex flex-col">
	<nav class="bg-white shadow-lg">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between items-center h-16">
				<div class="text-xl font-bold text-gray-800">
					<a href="/">XavierChanth</a>
				</div>
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
			</div>
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
