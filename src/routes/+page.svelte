<script>
	import ProfileImage from '$lib/components/ProfileImage.svelte';

	const { data } = $props();
</script>

<div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
	<section class="grid gap-10 items-end lg:grid-cols-[auto,1fr]">
		<div class="relative mx-auto lg:mx-0">
			<div
				class="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-white/90 via-white/40 to-white/10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)]"
			></div>
			<ProfileImage
				class="relative max-w-56 rounded-[2rem] border border-white/70 shadow-2xl"
			/>
		</div>
		<div class="space-y-6 text-center lg:text-left">
			<h1 class="text-4xl sm:text-5xl lg:text-6xl leading-tight text-shadow-soft">
				👋 Hi, I'm Xavier.
			</h1>
			<h2 class="text-2xl sm:text-3xl lg:text-4xl text-slate-600">
				Founder and CPO building thoughtful software from product vision to technical execution.
			</h2>
			<div class="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
				<a
					href="https://www.linkedin.com/in/xavierchanth"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:-translate-y-0.5 transition"
				>
					<svg viewBox="0 0 24 24" class="h-4 w-4" aria-hidden="true" fill="currentColor">
						<path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.11 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2h.1c.53-1 1.82-2 3.75-2C19.2 8 21 10.35 21 14.2V23h-4v-7.6c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23h-4V8z"/>
					</svg>
					Contact me on LinkedIn
				</a>
			</div>
		</div>
	</section>

	<section class="mt-16">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<h2 class="text-3xl sm:text-4xl">Latest posts</h2>
			</div>
			<a
				href="/posts"
				class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[rgb(var(--accent))]"
			>
				View all posts
			</a>
		</div>

		<ul class="mt-8 divide-y divide-slate-200/80 border-y border-slate-200/80">
			{#each data.posts as post}
				<li>
					<a
						href={`/posts/${post.slug}`}
						class="group grid gap-3 py-6 transition sm:grid-cols-[9rem,1fr] sm:items-center"
					>
						<p class="text-sm font-medium text-slate-500">{post.date}</p>
						<div>
							<h3 class="text-2xl transition group-hover:text-[rgb(var(--accent))]">
								{post.title}
							</h3>
							<p class="mt-2 text-slate-600">{post.description}</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</div>
