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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePlus } from "lucide-react";
import { useState } from "react";

export function CreateAccountDialog() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		accountName: "",
		accountType: "",
		balance: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Form submitted:", formData);

		// Close dialog after submission
		setOpen(false);

		// Reset form
		setFormData({
			accountName: "",
			accountType: "",
			balance: "",
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<button className="text-white opacity-70 ml-5 flex items-center">
							<SquarePlus size={20} />
						</button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Create New Account</p>
				</TooltipContent>
			</Tooltip>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-white">
						Create New Account
					</DialogTitle>
					<DialogDescription>
						Add a new account to track your finances. Fill in the
						details below.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label className="text-white" htmlFor="accountName">
								Account Name
							</Label>
							<Input
								id="accountName"
								placeholder="e.g., Checking Account"
								value={formData.accountName}
								onChange={(e) =>
									setFormData({
										...formData,
										accountName: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label className="text-white" htmlFor="accountType">
								Account Type
							</Label>
							<Select
								value={formData.accountType}
								onValueChange={(value) =>
									setFormData({
										...formData,
										accountType: value,
									})
								}
								required
								className="text-white"
							>
								<SelectTrigger
									className="text-white"
									id="accountType"
								>
									<SelectValue
										className="text-white"
										placeholder="Select account type"
									/>
								</SelectTrigger>
								<SelectContent className="text-white">
									<SelectItem
										className="text-white"
										value="checking"
									>
										Checking
									</SelectItem>
									<SelectItem value="savings">
										Savings
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label className="text-white" htmlFor="balance">
								Initial Balance
							</Label>
							<Input
								id="balance"
								type="text"
								step="0.01"
								placeholder="EGP 1500.0"
								value={formData.balance}
								onChange={(e) =>
									setFormData({
										...formData,
										balance: e.target.value,
									})
								}
								required
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
						<Button type="submit">Create Account</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

// Edit Account Dialog
export function EditAccountDialog({ account, open, onOpenChange }) {
	const [formData, setFormData] = useState({
		accountName: account?.accountName || "",
		accountType: account?.accountType || "",
		balance: account?.balance || "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Updating account:", formData);

		// Close dialog after submission
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-white">
						Edit Account
					</DialogTitle>
					<DialogDescription>
						Update your account details below.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label
								className="text-white"
								htmlFor="edit-accountName"
							>
								Account Name
							</Label>
							<Input
								id="edit-accountName"
								placeholder="e.g., Checking Account"
								value={formData.accountName}
								onChange={(e) =>
									setFormData({
										...formData,
										accountName: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label
								className="text-white"
								htmlFor="edit-accountType"
							>
								Account Type
							</Label>
							<Select
								value={formData.accountType}
								onValueChange={(value) =>
									setFormData({
										...formData,
										accountType: value,
									})
								}
								required
							>
								<SelectTrigger
									className="text-white"
									id="edit-accountType"
								>
									<SelectValue placeholder="Select account type" />
								</SelectTrigger>
								<SelectContent className="text-white">
									<SelectItem value="checking">
										Checking
									</SelectItem>
									<SelectItem value="savings">
										Savings
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label
								className="text-white"
								htmlFor="edit-balance"
							>
								Balance
							</Label>
							<Input
								id="edit-balance"
								type="text"
								step="0.01"
								placeholder="EGP 1500.0"
								value={formData.balance}
								onChange={(e) =>
									setFormData({
										...formData,
										balance: e.target.value,
									})
								}
								required
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

// Delete Account Dialog (Confirmation)
export function DeleteAccountDialog({ account, onDelete, open, onOpenChange }) {
	const handleDelete = () => {
		// Handle delete here
		console.log("Deleting account:", account);
		if (onDelete) {
			onDelete(account);
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
						delete the account
						<span className="font-semibold">
							{" "}
							"{account?.accountName}"
						</span>{" "}
						and remove all associated data.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-red-500 hover:bg-red-600"
					>
						Delete Account
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
