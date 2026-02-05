import AccountCard from "@/components/AccountCard";
import { CreateAccountDialog } from "@/components/AccountDialog";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, CirclePlus, SquarePlus } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function AccountsPage() {
	const [events, setEvents] = useState([]);
	const [search, setSearch] = useState("");
	const [visibleCount, setVisibleCount] = useState(7);
	const [priceFilter, setPriceFilter] = useState("all");
	const [searchParams] = useSearchParams();
	const initialCategoryId = Number(searchParams.get("category")) || 0;
	const [categoryId, setCategoryId] = useState(initialCategoryId);

	const ITEMS_PER_LOAD = 7;

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/v1/events/details",
				);
				const data = await response.json();
				setEvents(data.data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};
		fetchEvents();
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/v1/categories",
				);
				const data = await response.json();
				setCategories(data.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		setVisibleCount(ITEMS_PER_LOAD);
	}, [search, categoryId]);

	const filteredEvents = events.filter((event) => {
		const matchesSearch =
			search === "" ||
			event.event.name.toLowerCase().includes(search.toLowerCase());

		const matchesCategory =
			categoryId === 0 || event.event.category.id == categoryId;

		const matchesPrice =
			priceFilter === "all" ||
			(priceFilter === "free" && event.event.price === 0) ||
			(priceFilter === "paid" && event.event.price > 0);

		return matchesSearch && matchesCategory && matchesPrice;
	});

	const visibleFilteredEvents = filteredEvents.slice(0, visibleCount);

	const handleLoadMore = () => {
		setVisibleCount((prev) =>
			Math.min(prev + ITEMS_PER_LOAD, filteredEvents.length),
		);
	};

	const account = {
		name: "Main Account",
		balance: 19535,
	};
	const [openCheckeing, setOpenCheckeing] = React.useState(true);
	const [openSavings, setOpenSavings] = React.useState(true);

	return (
		<>
			<div className="flex min-h-screen w-full">
				<AppSidebar />

				<main className="w-full overflow-hidden">
					<div className="bg-foreground py-3 px-3 flex items-center">
						{/* <SidebarTrigger className="text-stone-300" /> */}
						<div className="text-white font-bold ml-2">
							Accounts
						</div>
						<CreateAccountDialog />
					</div>

					<div className="flex flex-col gap-0">
						<Collapsible
							open={openCheckeing}
							onOpenChange={setOpenCheckeing}
							className="text-white  mt-5"
						>
							<CollapsibleTrigger
								className=" hover:bg-foreground py-6 hover:rounded-none hover:text-white"
								asChild
							>
								<Button
									variant="ghost"
									className="w-full group flex justify-start "
								>
									<ChevronDown className=" group-data-[state=open]:rotate-180" />
									<div>Checking Accounts</div>
								</Button>
							</CollapsibleTrigger>
							<Separator className="opacity-10" />

							<CollapsibleContent className="flex flex-col items-start px-10 gap-5 py-5 text-sm">
								<AccountCard
									account={account}
									type={"checking"}
								/>
								<AccountCard
									account={account}
									type={"checking"}
								/>
								<AccountCard
									account={account}
									type={"checking"}
								/>
							</CollapsibleContent>
						</Collapsible>

						<Collapsible
							open={openSavings}
							onOpenChange={setOpenSavings}
							className="text-white "
						>
							<CollapsibleTrigger
								className=" hover:bg-foreground py-6 hover:rounded-none hover:text-white"
								asChild
							>
								<Button
									variant="ghost"
									className="w-full group flex justify-start "
								>
									<ChevronDown className=" group-data-[state=open]:rotate-180" />
									<div>Savings Accounts</div>
								</Button>
							</CollapsibleTrigger>
							<Separator className="opacity-10" />

							<CollapsibleContent className="flex flex-col items-start px-10 gap-5 py-5 text-sm">
								<AccountCard
									account={account}
									type={"savings"}
								/>
								<AccountCard
									account={account}
									type={"savings"}
								/>
							</CollapsibleContent>
						</Collapsible>
					</div>
				</main>
			</div>
		</>
	);
}
