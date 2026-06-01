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
		slug: "forest-bush",
		title: "Forest Bush",
		kind: "Infrastructure",
		logo: "forest_bush_logo.png",
		description:
			"A self-hosted feature flag service with an Express API, PostgreSQL persistence, Redis-backed evaluation caching, a React admin dashboard, and a small JavaScript SDK.",
		details: [
			"Forest Bush is a working MVP for managing and evaluating feature flags across applications. It includes a Node/Express API, PostgreSQL persistence through Prisma, Redis-backed evaluation caching, a React admin dashboard, and a small JavaScript SDK.",
			"The service is built around a simple product loop: create and manage flags from the dashboard or admin API, evaluate flags from client applications through the public API or SDK, and use sticky percentage rollout rules for user-based releases.",
			"The repository also includes Fly.io deployment files, Terraform configuration, and a GitHub Actions deploy workflow for the API."
		],
		tags: ["Node", "Express", "PostgreSQL", "Prisma", "Redis", "React"],
		featured: true
	},
	{
		slug: "nba-player-props",
		title: "NBA Player Props",
		kind: "Research",
		description:
			"A forecasting system that compares Kalshi NBA player prop prices against calibrated posterior distributions for points, rebounds, and assists.",
		details: [
			"NBA Player Props pulls NBA player prop prices from Kalshi and models points, rebounds, and assists with a hierarchical Bayesian layer around an XGBoost feature predictor.",
			"The system produces calibrated posterior distributions and surfaces props where the market price disagrees with the model posterior.",
			"The goal is to make disagreement between market prices and model forecasts easier to inspect and prioritize."
		],
		tags: ["Python", "XGBoost", "Bayesian Modeling", "Forecasting", "Kalshi"],
		featured: true,
		repoUrl: "https://github.com/RonTonPeso/nba_alpha_prop"
	},
	{
		slug: "pennos",
		title: "PennOS",
		kind: "Systems",
		description:
			"A single-process, multi-threaded operating system with a priority scheduler, process lifecycle, interactive shell, PennFAT filesystem, and syscall abstraction.",
		details: [
			"PennOS is a single-process, multi-threaded operating system built on top of the spthread cooperative threading library.",
			"It implements a credit-based preemptive priority scheduler with three priority levels, round-robin scheduling within each level, and proportional CPU allocation without starvation.",
			"The system includes process creation, blocking waits, signals, voluntary exit, orphan reparenting, zombie reaping, an interactive POSIX-like shell, foreground and background jobs, I/O redirection, shell script execution, and terminal signal forwarding.",
			"PennOS also includes PennFAT, a FAT-based filesystem with kernel-level file operations, permission checking, single-writer enforcement, and a clean separation between kernel APIs and user-facing system calls."
		],
		tags: ["C", "Operating Systems", "Schedulers", "Filesystems", "Shell"],
		featured: true
	}
];

export const featuredProjects = projects.filter((project) => project.featured);
