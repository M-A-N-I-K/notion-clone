"use client";

import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export const Useritem = () => {
	const { user } = useUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					role="button"
					className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
				>
					<div className="flex items-center gap-x-2 max-w-[150px]">
						<Avatar className="w-5 h-5">
							<AvatarImage src={user?.imageUrl} />
						</Avatar>
						<span className="text-start font-medium line-clamp-1">
							{user?.fullName}&apos;s MindNote
						</span>
					</div>
					<ChevronsLeftRight className="h-4 w-4 rotate-90 ml-2 text-muted-foreground" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-80"
				align="start"
				alignOffset={11}
				forceMount
			>
				<div className="flex flex-col space-y-4 p-2">
					<p>{user?.emailAddresses[0].emailAddress}</p>
					<div className="flex items-center gap-x-2">
						<div className="rounded-md bg-secondary p-1">
							<Avatar className="w-8 h-8">
								<AvatarImage src={user?.imageUrl} />
							</Avatar>
						</div>
						<div className="space-y-1">
							<p className="text-sm line-clamp-1">
								{user?.fullName}&apos;s MindNote
							</p>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
					<SignOutButton>Log out</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
