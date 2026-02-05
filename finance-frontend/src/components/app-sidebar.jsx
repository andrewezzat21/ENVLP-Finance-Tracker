import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	ArrowLeftRight,
	LayoutDashboard,
	PiggyBank,
	Tags,
	Wallet,
} from "lucide-react";

const data = {
	versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
	navMain: [
		{
			title: "",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: "/",
					icon: LayoutDashboard,
				},
				{
					title: "Accounts",
					url: "/accounts",
					icon: Wallet,
				},
				{
					title: "Transactions",
					url: "/transactions",
					icon: ArrowLeftRight,
				},
				{
					title: "Savings",
					url: "/savings",
					icon: PiggyBank,
				},
				{
					title: "Categories",
					url: "/categories",
					icon: Tags,
				},
			],
		},
	],
};

export function AppSidebar() {
	const { state } = useSidebar();

	return (
		<Sidebar
			collapsible="icon"
			className="border-solid border-r-8 border-background"
		>
			<SidebarHeader className="text-white mt-3">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<span className="font-black text-lg">
										E
									</span>
								</div>
								<div className="font-black">Enveloop</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => {
									const Icon = item.icon;
									return (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												asChild
												isActive={item.isActive}
												tooltip={item.title}
											>
												<a href={item.url}>
													<Icon />
													<span>{item.title}</span>
												</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter className="">
				<SidebarMenu>
					<SidebarMenuItem className="hover:text-black hover:bg-background">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<SidebarMenuButton
									size="lg"
									className="hover:text-black hover:bg-background"
								>
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-gray-800">
											{localStorage
												.getItem("firstName")
												?.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className="text-white text-xs">
										<div className="font-medium">
											{localStorage.getItem("firstName") +
												" " +
												localStorage.getItem(
													"lastName",
												)}
										</div>
										<div className="text-muted-foreground">
											{localStorage.getItem("email")}
										</div>
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="ml-5 mb-4 w-56"
								align="end"
							>
								<DropdownMenuGroup>
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>
										Settings
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem className="text-red-500">
										<a className="w-full" href="/login">
											Logout
										</a>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
