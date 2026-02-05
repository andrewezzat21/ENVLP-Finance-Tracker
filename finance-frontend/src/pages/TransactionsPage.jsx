import TransactionCard from "@/components/TransactionCard";
import { CreateTransactionDialog } from "@/components/TransactionDialog";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
	// Sample data - replace with your actual API data
	const transactions = [
		{
			id: 1,
			date: "2024-02-05",
			description: "Nin Hao Restaurant",
			account: "Sapphire Preferred 2524",
			category: "food",
			amount: 120.69,
			type: "transfer",
		},
		{
			id: 2,
			date: "2024-02-04",
			description: "Subway Monthly Pass",
			account: "Sapphire Preferred 2524",
			category: "transportation",
			amount: 127.0,
			type: "expense",
		},
		{
			id: 3,
			date: "2024-02-04",
			description: "Lyft",
			account: "Ultimate Rewards® 2390",
			category: "transportation",
			amount: 24.26,
			type: "expense",
		},
		{
			id: 4,
			date: "2024-12-11",
			description: "Health Insurance Premium",
			account: "Jack's Apple Card 1236",
			category: "insurance",
			amount: 450.0,
			type: "income",
		},
		{
			id: 5,
			date: "2024-12-11",
			description: "Warby Parker Glasses",
			account: "Freedom Flex 1163",
			category: "health",
			amount: 185.0,
			type: "expense",
		},
		{
			id: 6,
			date: "2024-12-09",
			description: "Wine & Spirits",
			account: "Sapphire Preferred 2524",
			category: "groceries",
			amount: 26.12,
			type: "expense",
		},
		{
			id: 7,
			date: "2024-12-09",
			description: "Joe's Pizza",
			account: "Freedom Flex 1163",
			category: "food",
			amount: 46.34,
			type: "expense",
		},
		{
			id: 8,
			date: "2024-12-08",
			description: "Headspace Subscription",
			account: "Jack's Apple Card 1236",
			category: "health",
			amount: 10.0,
			type: "expense",
		},
		{
			id: 9,
			date: "2024-12-08",
			description: "Mr. Melon Grocery",
			account: "Freedom Flex 1163",
			category: "groceries",
			amount: 44.57,
			type: "expense",
		},
		{
			id: 10,
			date: "2024-12-07",
			description: "Target",
			account: "Sapphire Preferred 2524",
			category: "pets",
			amount: 55.0,
			type: "expense",
		},
		{
			id: 11,
			date: "2024-12-07",
			description: "Madewell Online",
			account: "Sapphire Preferred 2524",
			category: "shopping",
			amount: 70.6,
			type: "expense",
		},
		{
			id: 12,
			date: "2024-12-07",
			description: "Monthly Salary",
			account: "Checking Account",
			category: "salary",
			amount: 5000.0,
			type: "income",
		},
		{
			id: 13,
			date: "2024-12-06",
			description: "Netflix Subscription",
			account: "Sapphire Preferred 2524",
			category: "entertainment",
			amount: 15.99,
			type: "expense",
		},
		{
			id: 14,
			date: "2024-12-06",
			description: "Electric Bill",
			account: "Checking Account",
			category: "utilities",
			amount: 85.43,
			type: "expense",
		},
		{
			id: 15,
			date: "2024-12-05",
			description: "Freelance Project Payment",
			account: "Checking Account",
			category: "salary",
			amount: 1200.0,
			type: "income",
		},
	];

	// Sort transactions by date in descending order (newest first)
	const sortedTransactions = [...transactions].sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});

	// Function to get dynamic date group label
	const getDateGroupLabel = (dateString) => {
		const date = parseISO(dateString);

		if (isToday(date)) {
			return "Today";
		} else if (isYesterday(date)) {
			return "Yesterday";
		} else {
			return format(date, "EEEE, MMMM d");
		}
	};

	// Group transactions by date with dynamic labels
	const groupedTransactions = sortedTransactions.reduce(
		(groups, transaction) => {
			const group = getDateGroupLabel(transaction.date);
			if (!groups[group]) {
				groups[group] = [];
			}
			groups[group].push(transaction);
			return groups;
		},
		{},
	);

	// State for each collapsible section
	const [openSections, setOpenSections] = useState(
		Object.keys(groupedTransactions).reduce((acc, key) => {
			acc[key] = true; // All sections open by default
			return acc;
		}, {}),
	);

	const toggleSection = (section) => {
		setOpenSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	return (
		<>
			<div className="flex min-h-screen w-full">
				<AppSidebar />

				<main className="w-full overflow-hidden">
					<div className="bg-foreground py-3 px-3 flex items-center">
						<div className="text-white font-bold ml-2">
							Transactions
						</div>
						<CreateTransactionDialog />
					</div>

					<div className="flex flex-col gap-0">
						{Object.entries(groupedTransactions).map(
							([dateGroup, groupTransactions]) => (
								<Collapsible
									key={dateGroup}
									open={openSections[dateGroup]}
									onOpenChange={() =>
										toggleSection(dateGroup)
									}
									className="text-white"
								>
									<CollapsibleTrigger
										className="hover:bg-foreground py-6 hover:rounded-none hover:text-white"
										asChild
									>
										<Button
											variant="ghost"
											className="w-full group flex justify-start"
										>
											<ChevronDown className="group-data-[state=open]:rotate-180" />
											<div>{dateGroup}</div>
										</Button>
									</CollapsibleTrigger>
									<Separator className="opacity-10" />

									<CollapsibleContent className="flex flex-col w-full">
										{groupTransactions.map(
											(transaction) => (
												<TransactionCard
													key={transaction.id}
													transaction={transaction}
												/>
											),
										)}
									</CollapsibleContent>
								</Collapsible>
							),
						)}
					</div>
				</main>
			</div>
		</>
	);
}
