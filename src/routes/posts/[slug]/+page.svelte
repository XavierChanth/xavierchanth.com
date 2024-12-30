<script>
	// @ts-nocheck

	/** @type {{ data: Md.ResolvedPost }}*/
	const { data } = $props();
	const Component = data.component;
</script>

<div class="max-w-6xl mx-auto px-4 py-12">
	<div class="italic mb-2">
		<p>Written by {data.author}</p>
		<p>Posted on {data.date}</p>
	</div>

	<div class="text-center mb-8">
		<h1 class="text-4xl mb-4">{data.title}</h1>
		<p>{data.description}</p>
	</div>

	<div class="post-body max-w-4xl mx-auto">
		<Component />
	</div>
</div>

<style lang="scss">
	.post-body :global {
		h1 {
			font-size: 2.25rem; /* 36px */
			line-height: 2.5rem; /* 40px */
		}

		h2 {
			font-size: 1.875rem; /* 30px */
			line-height: 2.25rem; /* 36px */
		}

		h3 {
			font-size: 1.5rem; /* 24px */
			line-height: 2rem; /* 32px */
		}

		h4 {
			font-size: 1.25rem; /* 20px */
			line-height: 1.75rem; /* 28px */
		}

		h5,
		h6 {
			font-size: 1.125rem; /* 18px */
			line-height: 1.75rem; /* 28px */
			font-weight: 700;
		}

		h6 {
			color: rgb(100 116 139 / var(--tw-text-opacity, 1));
		}

		p {
			size: 12rem;
			margin-bottom: 0.5rem;
		}

		code {
			background-color: rgb(203 213 225 / var(--tw-bg-opacity, 1));
		}

		a {
			color: rgb(59 130 246 / var(--tw-text-opacity, 1));
		}

		pre {
			margin: 0.5rem 0;
			code {
				padding: 0.5rem;
			}
		}

		ul {
			list-style-type: disc;
			margin-left: 1rem;
		}

		ol {
			list-style-type: decimal;
			margin-left: 1rem;
		}
	}
</style>
