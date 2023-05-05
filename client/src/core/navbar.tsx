import { IconReportSearch, IconHome, IconFileText, IconChartPie, IconAffiliate, IconWallet, IconDashboard, IconLink, IconAdjustments } from "@tabler/icons-react";
import { SpotlightAction } from "@mantine/spotlight";

export const links = [
	{ label: "Dashboard", icon: IconDashboard, color: "blue" },
	{ label: "Monetized Links", icon: IconLink, color: "green"},
	{ label: "Reports", icon: IconReportSearch, color: "green" },
	{ label: "Charts", icon: IconChartPie, color: "green" },
	{ label: "Referrals", icon: IconAffiliate, color: "cyan" },
	{ label: "Payments", icon: IconWallet, color: "cyan" },
	{ label: "Settings", icon: IconAdjustments, color: "pink" },
];


export const spootlightActions: SpotlightAction[] = [
	{
		title: "Home",
		description: "Get to home page",
		onTrigger: () => console.log("Home"),
		icon: <IconHome />,
	},
	{
		title: "Dashboard",
		description: "Get full information about current system status",
		onTrigger: () => console.log("Dashboard"),
		icon: <IconDashboard />,
	},
	{
		title: "Documentation",
		description: "Visit documentation to lean more about all features",
		onTrigger: () => console.log("Documentation"),
		icon: <IconFileText />,
	},
];