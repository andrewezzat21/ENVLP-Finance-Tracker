import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
	DeleteTransactionDialog,
	EditTransactionDialog,
} from "./TransactionDialog";

export default function TransactionCard({ transaction }) {
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleDelete = (transaction) => {
		console.log("Transaction deleted:", transaction);
		// Add your delete logic here
	};

	// Category color mapping
	const getCategoryColor = (category) => {
		const colors = {
			food: "bg-orange-600",
			transportation: "bg-cyan-600",
			insurance: "bg-blue-600",
			health: "bg-red-500",
			groceries: "bg-green-600",
			pets: "bg-amber-600",
			entertainment: "bg-purple-500",
			utilities: "bg-yellow-600",
			shopping: "bg-pink-600",
			salary: "bg-emerald-600",
			other: "bg-gray-600",
		};
		return colors[category?.toLowerCase()] || "bg-gray-600";
	};

	// Category icon mapping
	const getCategoryIcon = (category) => {
		const icons = {
			food: "🍔",
			transportation: "🚗",
			insurance: "🏥",
			health: "❤️",
			groceries: "🥬",
			pets: "🐾",
			entertainment: "🎬",
			utilities: "💡",
			shopping: "🛍️",
			salary: "💰",
			other: "📌",
		};
		return icons[category?.toLowerCase()] || "💰";
	};

	// Transaction type icon and color
	const getTransactionTypeIcon = (type) => {
		switch (type) {
			case "income":
				return (
					<div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center">
						<ArrowDownLeft className="w-4 h-4 text-green-500" />
					</div>
				);
			case "expense":
				return (
					<div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center">
						<ArrowUpRight className="w-4 h-4 text-red-500" />
					</div>
				);
			case "transfer":
				return (
					<div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
						<ArrowLeftRight className="w-4 h-4 text-blue-500" />
					</div>
				);
			default:
				return (
					<div className="w-8 h-8 rounded-full bg-gray-600/20 flex items-center justify-center">
						<ArrowUpRight className="w-4 h-4 text-gray-500" />
					</div>
				);
		}
	};

	return (
		<>
			<div
				className="flex items-center justify-between py-4 px-10 hover:bg-gray-800/30 cursor-pointer group transition-colors w-full"
				onClick={() => setEditOpen(true)}
			>
				{/* Left section - Type icon and Transaction info */}
				<div className="flex items-center gap-3 flex-1">
					{/* Transaction Type Icon */}
					{getTransactionTypeIcon(transaction.type)}

					{/* Transaction Details */}
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<span className="text-white font-medium">
								{transaction.description}
							</span>
							{transaction.account && (
								<span className="text-gray-500 text-sm">
									{transaction.account}
								</span>
							)}
						</div>
					</div>
				</div>

				{/* Right section - Category and Amount */}
				<div className="flex items-center gap-4">
					{/* Category Badge */}
					<div
						className={`${getCategoryColor(transaction.category)} px-4 py-1 rounded-full flex items-center gap-1.5`}
					>
						<span className="text-xs">
							{getCategoryIcon(transaction.category)}
						</span>
						<span className="text-white text-[10px] font-medium uppercase tracking-wide">
							{transaction.category}
						</span>
					</div>

					{/* Amount */}
					<div className="text-white font-semibold min-w-[100px] text-right">
						<span
							className={
								transaction.type === "income"
									? "text-green-500"
									: transaction.type === "expense"
										? "text-red-500"
										: ""
							}
						>
							{transaction.type === "income"
								? "+"
								: transaction.type === "expense"
									? "-"
									: ""}
							${transaction.amount.toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			{/* Edit Dialog */}
			{editOpen && (
				<EditTransactionDialog
					transaction={{
						type: transaction.type,
						amount: transaction.amount,
						category: transaction.category,
						description: transaction.description,
						date: transaction.date,
					}}
					open={editOpen}
					onOpenChange={setEditOpen}
				/>
			)}

			{/* Delete Confirmation Dialog */}
			{deleteOpen && (
				<DeleteTransactionDialog
					transaction={{
						amount: transaction.amount,
					}}
					onDelete={handleDelete}
					open={deleteOpen}
					onOpenChange={setDeleteOpen}
				/>
			)}
		</>
	);
}
