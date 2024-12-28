// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Md {
		interface Post {
			default: Component;
			metadata: {
				title: string;
				author: string;
				description: string;
				date: string;
				published: boolean;
			};
		}

		interface ResolvedPost {
			component: Component;
			slug: string | undefined;
			title: string;
			author: string;
			description: string;
			date: string;
			published: boolean;
		}
	}
}

export {};
