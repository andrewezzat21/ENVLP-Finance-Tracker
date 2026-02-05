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
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	CreditCard,
	EllipsisVertical,
	HandCoins,
	PencilIcon,
	TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { DeleteAccountDialog, EditAccountDialog } from "./AccountDialog";
import { CreateTransactionDialog } from "./TransactionDialog";

export default function AccountCard({ account, type }) {
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const iconColor =
		type === "savings"
			? "bg-blue-700"
			: type === "checking"
				? "bg-green-700"
				: "bg-gray-700";

	const handleDelete = (account) => {
		// Handle delete here
		console.log("Account deleted:", account);
		// Add your delete logic here
	};

	return (
		<>
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center">
					<div className={`size-icon rounded-full p-2 ${iconColor}`}>
						{type === "savings" ? (
							<HandCoins size={20} />
						) : (
							<CreditCard size={20} />
						)}
					</div>
					<div className="ml-4 flex flex-col items-start">
						<div className="opacity-80 font-extralight italic">
							{account.name}
						</div>
						<div className="text-xs">
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "EGP",
								minimumFractionDigits: 0,
								maximumFractionDigits: 1,
							}).format(account.balance)}
						</div>
					</div>
				</div>
				<div className="flex gap-4 opacity-70 items-center justify-center">
					<CreateTransactionDialog
						accountId={account.id}
						accountName={account.name}
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button>
								<EllipsisVertical />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuItem
									onClick={() => setEditOpen(true)}
								>
									<PencilIcon />
									Edit
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem
									className="text-red-500"
									onClick={() => setDeleteOpen(true)}
								>
									<TrashIcon />
									Delete
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Edit Dialog */}
			{editOpen && (
				<EditAccountDialog
					account={{
						accountName: account.name,
						accountType: type,
						balance: account.balance,
					}}
					open={editOpen}
					onOpenChange={setEditOpen}
				/>
			)}

			{/* Delete Confirmation Dialog */}
			{deleteOpen && (
				<DeleteAccountDialog
					account={{
						accountName: account.name,
					}}
					onDelete={handleDelete}
					open={deleteOpen}
					onOpenChange={setDeleteOpen}
				/>
			)}
		</>
	);
}
