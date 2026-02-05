import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

// Category definitions
const INCOME_CATEGORIES = [
	{ value: "salary", label: "Salary" },
	{ value: "freelance", label: "Freelance" },
	{ value: "investment", label: "Investment" },
	{ value: "business", label: "Business" },
	{ value: "gift", label: "Gift" },
	{ value: "other_income", label: "Other Income" },
];

const EXPENSE_CATEGORIES = [
	{ value: "food", label: "Food" },
	{ value: "transportation", label: "Transportation" },
	{ value: "entertainment", label: "Entertainment" },
	{ value: "utilities", label: "Utilities" },
	{ value: "shopping", label: "Shopping" },
	{ value: "health", label: "Health" },
	{ value: "insurance", label: "Insurance" },
	{ value: "groceries", label: "Groceries" },
	{ value: "pets", label: "Pets" },
	{ value: "education", label: "Education" },
	{ value: "other_expense", label: "Other Expense" },
];

// Sample accounts - replace with your actual accounts data
const ACCOUNTS = [
	{ value: "1", label: "Checking Account" },
	{ value: "2", label: "Savings Account" },
	{ value: "3", label: "Sapphire Preferred 2524" },
	{ value: "4", label: "Freedom Flex 1163" },
];

// Create Transaction Dialog
export function CreateTransactionDialog({ accountId, accountName }) {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState(new Date());
	const [formData, setFormData] = useState({
		type: "",
		amount: "",
		category: "",
		description: "",
		sourceAccount: "",
		destAccount: "",
	});

	// Reset category when transaction type changes
	useEffect(() => {
		if (formData.type) {
			setFormData((prev) => ({ ...prev, category: "" }));
		}
	}, [formData.type]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Creating transaction:", {
			...formData,
			date: format(date, "yyyy-MM-dd"),
			accountId,
		});

		// Close dialog after submission
		setOpen(false);

		// Reset form
		setFormData({
			type: "",
			amount: "",
			category: "",
			description: "",
			sourceAccount: "",
			destAccount: "",
		});
		setDate(new Date());
	};

	// Get categories based on transaction type
	const getCategories = () => {
		if (formData.type === "income") return INCOME_CATEGORIES;
		if (formData.type === "expense") return EXPENSE_CATEGORIES;
		return [];
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<button className="text-white opacity-70 ml-3 flex items-center">
							<CirclePlus size={20} />
						</button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>New Transaction</p>
				</TooltipContent>
			</Tooltip>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-white">
						Create New Transaction
					</DialogTitle>
					<DialogDescription>
						{accountName
							? `Add a transaction to ${accountName}`
							: "Add a new transaction"}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label className="text-white" htmlFor="type">
								Transaction Type *
							</Label>
							<Select
								value={formData.type}
								onValueChange={(value) =>
									setFormData({
										...formData,
										type: value,
									})
								}
								required
							>
								<SelectTrigger className="text-white" id="type">
									<SelectValue
										className="text-white"
										placeholder="Select type"
									/>
								</SelectTrigger>
								<SelectContent className="text-white">
									<SelectItem value="income">
										Income
									</SelectItem>
									<SelectItem value="expense">
										Expense
									</SelectItem>
									<SelectItem value="transfer">
										Transfer
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label className="text-white" htmlFor="amount">
								Amount *
							</Label>
							<Input
								id="amount"
								type="text"
								placeholder="EGP 500.0"
								value={formData.amount}
								onChange={(e) =>
									setFormData({
										...formData,
										amount: e.target.value,
									})
								}
								required
							/>
						</div>

						{/* Show category field for income and expense */}
						{(formData.type === "income" ||
							formData.type === "expense") && (
							<div className="grid gap-2">
								<Label
									className="text-white"
									htmlFor="category"
								>
									Category *
								</Label>
								<Select
									value={formData.category}
									onValueChange={(value) =>
										setFormData({
											...formData,
											category: value,
										})
									}
									required
								>
									<SelectTrigger
										className="text-white"
										id="category"
									>
										<SelectValue
											className="text-white"
											placeholder="Select category"
										/>
									</SelectTrigger>
									<SelectContent className="text-white">
										{getCategories().map((cat) => (
											<SelectItem
												key={cat.value}
												value={cat.value}
											>
												{cat.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{/* Show account fields for transfer */}
						{formData.type === "transfer" && (
							<>
								<div className="grid gap-2">
									<Label
										className="text-white"
										htmlFor="sourceAccount"
									>
										Source Account *
									</Label>
									<Select
										value={formData.sourceAccount}
										onValueChange={(value) =>
											setFormData({
												...formData,
												sourceAccount: value,
											})
										}
										required
									>
										<SelectTrigger
											className="text-white"
											id="sourceAccount"
										>
											<SelectValue
												className="text-white"
												placeholder="Select source account"
											/>
										</SelectTrigger>
										<SelectContent className="text-white">
											{ACCOUNTS.map((account) => (
												<SelectItem
													key={account.value}
													value={account.value}
												>
													{account.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="grid gap-2">
									<Label
										className="text-white"
										htmlFor="destAccount"
									>
										Destination Account *
									</Label>
									<Select
										value={formData.destAccount}
										onValueChange={(value) =>
											setFormData({
												...formData,
												destAccount: value,
											})
										}
										required
									>
										<SelectTrigger
											className="text-white"
											id="destAccount"
										>
											<SelectValue
												className="text-white"
												placeholder="Select destination account"
											/>
										</SelectTrigger>
										<SelectContent className="text-white">
											{ACCOUNTS.filter(
												(account) =>
													account.value !==
													formData.sourceAccount,
											).map((account) => (
												<SelectItem
													key={account.value}
													value={account.value}
												>
													{account.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</>
						)}

						<div className="grid gap-2">
							<Label className="text-white" htmlFor="date">
								Date *
							</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-full justify-start text-left font-normal",
											!date && "text-muted-foreground",
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date ? (
											format(date, "PPP")
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="grid gap-2">
							<Label className="text-white" htmlFor="description">
								Description
							</Label>
							<Textarea
								id="description"
								placeholder="Add notes about this transaction..."
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								rows={3}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit">Create Transaction</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

// Edit Transaction Dialog
export function EditTransactionDialog({ transaction, open, onOpenChange }) {
	const [date, setDate] = useState(
		transaction?.date ? new Date(transaction.date) : new Date(),
	);
	const [formData, setFormData] = useState({
		type: transaction?.type || "",
		amount: transaction?.amount || "",
		category: transaction?.category || "",
		description: transaction?.description || "",
		sourceAccount: transaction?.sourceAccount || "",
		destAccount: transaction?.destAccount || "",
	});

	// Reset category when transaction type changes
	useEffect(() => {
		if (formData.type !== transaction?.type) {
			setFormData((prev) => ({ ...prev, category: "" }));
		}
	}, [formData.type, transaction?.type]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Updating transaction:", {
			...formData,
			date: format(date, "yyyy-MM-dd"),
		});

		// Close dialog after submission
		onOpenChange(false);
	};

	// Get categories based on transaction type
	const getCategories = () => {
		if (formData.type === "income") return INCOME_CATEGORIES;
		if (formData.type === "expense") return EXPENSE_CATEGORIES;
		return [];
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-white">
						Edit Transaction
					</DialogTitle>
					<DialogDescription>
						Update your transaction details below.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label className="text-white" htmlFor="edit-type">
								Transaction Type *
							</Label>
							<Select
								value={formData.type}
								onValueChange={(value) =>
									setFormData({
										...formData,
										type: value,
									})
								}
								required
							>
								<SelectTrigger
									className="text-white"
									id="edit-type"
								>
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent className="text-white">
									<SelectItem value="income">
										Income
									</SelectItem>
									<SelectItem value="expense">
										Expense
									</SelectItem>
									<SelectItem value="transfer">
										Transfer
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label className="text-white" htmlFor="edit-amount">
								Amount *
							</Label>
							<Input
								id="edit-amount"
								type="text"
								placeholder="EGP 500.0"
								value={formData.amount}
								onChange={(e) =>
									setFormData({
										...formData,
										amount: e.target.value,
									})
								}
								required
							/>
						</div>

						{/* Show category field for income and expense */}
						{(formData.type === "income" ||
							formData.type === "expense") && (
							<div className="grid gap-2">
								<Label
									className="text-white"
									htmlFor="edit-category"
								>
									Category *
								</Label>
								<Select
									value={formData.category}
									onValueChange={(value) =>
										setFormData({
											...formData,
											category: value,
										})
									}
									required
								>
									<SelectTrigger
										className="text-white"
										id="edit-category"
									>
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent className="text-white">
										{getCategories().map((cat) => (
											<SelectItem
												key={cat.value}
												value={cat.value}
											>
												{cat.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{/* Show account fields for transfer */}
						{formData.type === "transfer" && (
							<>
								<div className="grid gap-2">
									<Label
										className="text-white"
										htmlFor="edit-sourceAccount"
									>
										Source Account *
									</Label>
									<Select
										value={formData.sourceAccount}
										onValueChange={(value) =>
											setFormData({
												...formData,
												sourceAccount: value,
											})
										}
										required
									>
										<SelectTrigger
											className="text-white"
											id="edit-sourceAccount"
										>
											<SelectValue placeholder="Select source account" />
										</SelectTrigger>
										<SelectContent className="text-white">
											{ACCOUNTS.map((account) => (
												<SelectItem
													key={account.value}
													value={account.value}
												>
													{account.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="grid gap-2">
									<Label
										className="text-white"
										htmlFor="edit-destAccount"
									>
										Destination Account *
									</Label>
									<Select
										value={formData.destAccount}
										onValueChange={(value) =>
											setFormData({
												...formData,
												destAccount: value,
											})
										}
										required
									>
										<SelectTrigger
											className="text-white"
											id="edit-destAccount"
										>
											<SelectValue placeholder="Select destination account" />
										</SelectTrigger>
										<SelectContent className="text-white">
											{ACCOUNTS.filter(
												(account) =>
													account.value !==
													formData.sourceAccount,
											).map((account) => (
												<SelectItem
													key={account.value}
													value={account.value}
												>
													{account.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</>
						)}

						<div className="grid gap-2">
							<Label className="text-white" htmlFor="edit-date">
								Date *
							</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-full justify-start text-left font-normal",
											!date && "text-muted-foreground",
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date ? (
											format(date, "PPP")
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="grid gap-2">
							<Label
								className="text-white"
								htmlFor="edit-description"
							>
								Description
							</Label>
							<Textarea
								id="edit-description"
								placeholder="Add notes about this transaction..."
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								rows={3}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit">Save Changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

// Delete Transaction Dialog (Confirmation)
export function DeleteTransactionDialog({
	transaction,
	onDelete,
	open,
	onOpenChange,
}) {
	const handleDelete = () => {
		// Handle delete here
		console.log("Deleting transaction:", transaction);
		if (onDelete) {
			onDelete(transaction);
		}
		onOpenChange(false);
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-white">
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete this transaction
						{transaction?.amount && (
							<span className="font-semibold">
								{" "}
								of {transaction.amount}
							</span>
						)}{" "}
						and remove it from your account.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-red-500 hover:bg-red-600"
					>
						Delete Transaction
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
