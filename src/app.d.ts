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
				series?: string;
			};
		}

		interface SeriesReference {
			title: string;
			slug: string;
			index: number;
			date: string;
		}

		interface Series {
			label: string;
			slug: string;
			index: number;
			total: number;
			first: SeriesReference;
			previous?: SeriesReference;
			next?: SeriesReference;
			latest: SeriesReference;
		}

		interface SeriesSummary {
			label: string;
			slug: string;
			total: number;
		}

		interface ResolvedPost {
			component: Component;
			slug: string;
			title: string;
			author: string;
			description: string;
			date: string;
			published: boolean;
			series?: Series;
			seriesSlug?: string;
		}
	}
}

export {};
