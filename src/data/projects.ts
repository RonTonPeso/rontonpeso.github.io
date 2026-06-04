export type Project = {
	slug: string;
	title: string;
	kind: string;
	logo?: string;
	description: string;
	details: string[];
	tags: string[];
	featured: boolean;
	repoUrl?: string;
	demoUrl?: string;
	embedUrl?: string;
};

export const projects: Project[] = [
	{
		slug: "materials-informatics",
		title: "Materials Informatics",
		kind: "Research · AI/ML",
		description:
			"Predicting the Vickers microhardness of metal-ceramic nanocomposites with XGBoost and physics-informed features (Hall-Petch, Orowan, CTE mismatch), plus group-aware validation, ensemble uncertainty, and SHAP interpretability.",
		details: [
			"Research with the Li Group at the University of Pennsylvania on predicting the Vickers microhardness of metal-ceramic nanocomposites from composition and processing descriptors.",
			"The model is an XGBoost regressor built on physics-informed features grounded in materials theory, including Hall-Petch grain-size strengthening, Orowan dispersion strengthening, and coefficient-of-thermal-expansion (CTE) mismatch.",
			"To keep the results trustworthy on small, clustered materials data, it uses group-aware validation to avoid leakage across related samples, ensemble-based uncertainty estimates, and SHAP analysis to interpret which physical features drive each prediction."
		],
		tags: ["Python", "XGBoost", "SHAP", "Machine Learning", "Materials Science"],
		featured: true,
		repoUrl: "https://github.com/RonTonPeso/nanocomposite-hv-pipeline"
	},
	{
		slug: "spotify-billboard-analytics",
		title: "Spotify Billboard Analytics",
		kind: "Databases/Web Dev",
		description:
			"A project pairing Spotify audio features with Billboard Hot 100 chart data, backed by PostgreSQL 16 on AWS RDS with a Node/Express API, a React + Recharts frontend, and a Python/pandas cleaning pipeline.",
		details: [
			"A music analytics application built as a database systems course project, joining Spotify audio features with Billboard Hot 100 chart history to explore how a song's characteristics relate to its chart performance.",
			"The backend runs PostgreSQL 16 on AWS RDS with a Node/Express API, and a Python and pandas pipeline cleans and loads the raw data. The schema normalizes four core tables to 3NF and uses GiST/GIN indexes, pg_trgm for fuzzy text search, materialized views for heavy aggregates, and a k-NN similarity query for finding songs with similar audio profiles.",
			"The frontend is built in React with Recharts. I owned the Trends and Analytics visualizations, turning the query results into interactive charts.",
			"As a graded course assignment, the source code cannot be shared publicly under course policy."
		],
		tags: ["PostgreSQL", "AWS RDS", "Node", "Express", "React", "Recharts", "Python", "pandas"],
		featured: true
	},
	{
		slug: "nba-player-props",
		title: "NBA Player Props",
		kind: "AI/ML",
		description:
			"A forecasting system that compares live Kalshi player prop prices against probabilistic NBA player projections, surfacing the largest gaps between market and model.",
		details: [
			"Pulls live player prop prices from Kalshi and projects points, rebounds, and assists for each player using a hierarchical Bayesian model wrapped around an XGBoost feature predictor, producing full distributions with uncertainty rather than single-point predictions.",
			"Ingests injury news from official NBA reports and beat-writer feeds, uses an LLM to classify severity and expected games missed, and routes that signal through a lineup-redistribution layer so projections shift toward the players who actually absorb the minutes.",
			"Backtests are point-in-time correct, meaning every prediction is evaluated using only data that was available before the game, with calibration tracked over a full season of out-of-sample bets.",
			"Surfaces the props where the model and market disagree most, ranked by the size of the disagreement and the model's confidence, so the most inspectable opportunities are easy to find."
		],
		tags: ["Python", "PyMC", "XGBoost", "FastAPI", "PostgreSQL", "LLM"],
		featured: true,
		repoUrl: "https://github.com/RonTonPeso/nba_alpha_prop"
	},
	{
		slug: "forest-bush",
		title: "Forest Bush",
		kind: "Infrastructure/DevOps",
		logo: "forest_bush_logo.png",
		description:
			"A self-hosted feature flag service with an Express API, PostgreSQL persistence, Redis-backed evaluation caching, a React admin dashboard, and a small JavaScript SDK.",
		details: [
			"Forest Bush despite its funky name is a service managing and evaluating feature flags across applications. It includes a Node/Express API, PostgreSQL persistence through Prisma, Redis-backed evaluation caching, a React admin dashboard, and a small JavaScript SDK.",
			"The service is built around a simple loop: create and manage flags from the dashboard or admin API, evaluate flags from client applications through the public API or SDK, and use sticky percentage rollout rules for user-based releases.",
			"The repository also includes Fly.io deployment files, Terraform configuration, and a GitHub Actions deploy workflow for the API."
		],
		tags: ["Node", "Express", "PostgreSQL", "Prisma", "Redis", "React"],
		featured: true,
		repoUrl: "https://github.com/RonTonPeso/Forest-Bush"
	},
	{
		slug: "laundry-notifications",
		title: "Laundry Notifications",
		kind: "Mobile Dev - Penn Labs",
		description:
			"An end-to-end laundry notifications feature for the Penn Mobile Android app: a UI toggle, a reboot-safe background polling architecture, push notifications, state persistence across reboots, and rate-limited API polling.",
		details: [
			"Built for Penn Labs, this is a full end-to-end laundry notifications feature in the Penn Mobile Android app. A user toggles notifications for a laundry machine and the app reliably tells them when their load is done.",
			"The core challenge was reliability on Android. The feature uses a reboot-safe background polling architecture so scheduled checks survive device restarts, persists its state across reboots, and rate-limits API polling to stay within backend limits.",
			"It ties together a settings UI toggle, background work scheduling, push notifications, and persistent state so the experience holds up even when the app is closed or the phone restarts."
		],
		tags: ["Android", "Push Notifications", "Background Services", "Penn Labs"],
		featured: true,
		repoUrl: "https://github.com/pennlabs/penn-mobile-android"
	},
	{
		slug: "pennos",
		title: "PennOS",
		kind: "Systems",
		description:
			"A single-process, multi-threaded operating system with a priority scheduler, process lifecycle, interactive shell, PennFAT filesystem, and syscall abstraction.",
		details: [
			"PennOS is a single-process, multi-threaded operating system. Due to course policy, I can't share the code lest future students be tempted to forgo the arduous process of buliding their own OS from scratch.",
			"It implements a credit-based preemptive priority scheduler with three priority levels, round-robin scheduling within each level, and proportional CPU allocation without starvation.",
			"The system includes process creation, blocking waits, signals, voluntary exit, orphan reparenting, zombie reaping, an interactive POSIX-like shell, foreground and background jobs, I/O redirection, shell script execution, and terminal signal forwarding.",
			"PennOS also includes PennFAT, a FAT-based filesystem with kernel-level file operations, permission checking, single-writer enforcement, and a clean separation between kernel APIs and user-facing system calls."
		],
		tags: ["C", "Operating Systems", "Schedulers", "Filesystems", "Shell"],
		featured: true
	}
	
];

export const featuredProjects = projects.filter((project) => project.featured);
