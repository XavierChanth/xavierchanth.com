<script>
	import ProfileImage from '$lib/components/ProfileImage.svelte';
</script>

<div class="max-w-6xl mx-auto px-4 py-12">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">👋 Hi, I'm Xavier!</h1>
	</div>
	<div class="flex items-end sm:gap-8 lg:gap-10">
		<ProfileImage class="max-w-48 mb-8" />
		<div>
			<p class="text-lg text-gray-600 mb-8 align-text-bottom">
				I'm a software engineer with a deep passion for learning, and I'm constantly improving my
				ability to write effective software. I'm a big fan of open-source. I love to use, write, and
				contribute to open-source software whenever possible.
			</p>
			<p class="text-lg text-gray-600 mb-8 align-text-bottom">
				This site is my dedicated space for sharing the software that I'm building, and for sharing
				my findings along the way.
			</p>
		</div>
	</div>
	<div class="text-center">
		<a href="/posts" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
			My Posts
		</a>
	</div>
</div>
