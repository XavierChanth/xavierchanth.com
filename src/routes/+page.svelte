<script>
	import ProfileImage from '$lib/components/ProfileImage.svelte';
</script>

<div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
	<section class="grid gap-10 lg:grid-cols-[auto,1fr] items-center">
		<div class="relative mx-auto lg:mx-0">
			<div
				class="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-white/90 via-white/40 to-white/10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)]"
			></div>
			<ProfileImage
				class="relative max-w-56 rounded-[2rem] border border-white/70 shadow-2xl"
			/>
		</div>
		<div class="space-y-6">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1 text-sm font-medium text-slate-600 shadow-sm"
			>
				<span class="h-2 w-2 rounded-full bg-[rgb(var(--accent))]"></span>
				Software Engineer - Open Source Enthusiast
			</div>
			<h1 class="text-4xl sm:text-5xl lg:text-6xl leading-tight text-shadow-soft">
				👋 Hi, I'm Xavier.
			</h1>
			<h2 class="text-2xl sm:text-3xl lg:text-4xl text-slate-600">
				Engineer by day, explorer by heart, learner by choice.
			</h2>
			<div class="flex flex-wrap items-center gap-4">
				<a
					href="/posts"
					class="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 hover:-translate-y-0.5 transition"
				>
					Blog Posts
				</a>
				<a
					href="https://www.linkedin.com/in/xavierchanth"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:-translate-y-0.5 transition"
				>
					<svg viewBox="0 0 24 24" class="h-4 w-4" aria-hidden="true" fill="currentColor">
						<path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.11 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2h.1c.53-1 1.82-2 3.75-2C19.2 8 21 10.35 21 14.2V23h-4v-7.6c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23h-4V8z"/>
					</svg>
					LinkedIn
				</a>
			</div>
		</div>
	</section>

	<section class="mt-16 grid gap-6 md:grid-cols-3">
		<div class="rounded-2xl border border-white/80 bg-white/80 p-6 shadow-lg">
			<p class="text-xs uppercase tracking-[0.25em] text-slate-500">Growth</p>
			<h2 class="mt-3 text-2xl">Always learning</h2>
			<p class="mt-3 text-slate-600">
				I'm constantly improving my ability to write effective software through steady practice.
			</p>
		</div>
		<div class="rounded-2xl border border-white/80 bg-white/80 p-6 shadow-lg">
			<p class="text-xs uppercase tracking-[0.25em] text-slate-500">Open Source</p>
			<h2 class="mt-3 text-2xl">Build in the open</h2>
			<p class="mt-3 text-slate-600">
				I love to use, write, and contribute to open-source software whenever possible.
			</p>
		</div>
		<div class="rounded-2xl border border-white/80 bg-white/80 p-6 shadow-lg">
			<p class="text-xs uppercase tracking-[0.25em] text-slate-500">Sharing</p>
			<h2 class="mt-3 text-2xl">Sharing the journey</h2>
			<p class="mt-3 text-slate-600">
				This site shares the software I'm building and the lessons learned along the way.
			</p>
		</div>
	</section>
</div>
