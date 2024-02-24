"use client";

import {
	ChevronsLeft,
	MenuIcon,
	PlusCircle,
	Search,
	Settings,
} from "lucide-react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Useritem } from "./user-item";
import { Item } from "./item";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DocumentList } from "./document-list";

export const Navigation = () => {
	const pathname = usePathname();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const create = useMutation(api.documents.create);

	const isResizingRef = useRef(false);
	const sidebarRef = useRef<ElementRef<"aside">>(null);
	const navbarRef = useRef<ElementRef<"div">>(null);
	const [isResetting, setIsResetting] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(isMobile);

	useEffect(() => {
		if (isMobile) {
			collapse();
		} else {
			resetwidth();
		}
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			collapse();
		}
	}, [pathname, isMobile]);

	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.preventDefault();
		event.stopPropagation();

		isResizingRef.current = true;
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizingRef.current) return;
		let newWidth = event.clientX;

		if (newWidth < 240) newWidth = 240;
		if (newWidth > 480) newWidth = 480;

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.setProperty("left", `${newWidth}px`);
			navbarRef.current.style.setProperty(
				"width",
				`calc(100% -${newWidth}px)`
			);
		}
	};

	const resetwidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			setIsResetting(true);
			sidebarRef.current.style.width = isMobile ? "100%" : "240px";
			navbarRef.current.style.setProperty(
				"width",
				isMobile ? "0" : "calc(100% - 240px)"
			);
			navbarRef.current.style.setProperty(
				"left",
				isMobile ? "100%" : "240px"
			);
		}
		setTimeout(() => setIsResetting(true), 300);
	};

	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true);
			setIsResetting(true);
			sidebarRef.current.style.width = "0";
			navbarRef.current.style.setProperty("width", "100%");
			navbarRef.current.style.setProperty("left", "0");
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	const handleMouseUp = () => {
		isResizingRef.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const handleCreate = async () => {
		const promise = create({ title: "Untitled" });

		toast.promise(promise, {
			loading: "Creating a new note...",
			success: "New Note created",
			error: "Failed to create a new note",
		});
	};

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					"group/sidebar h-full bg-secondary overflow-y-auto relative w-60 flex-col z-[99999] flex ",
					isResetting && "transition-all duration-300 ease-in-out",
					isMobile && "w-0"
				)}
			>
				<div
					onClick={collapse}
					role="button"
					className={cn(
						"h-6 w-6 text-muted-foreground roudned-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
						isMobile && "opacity-100"
					)}
				>
					<ChevronsLeft className="h-6 w-6" />
				</div>
				<div>
					<Useritem />
					<Item onClick={() => {}} label="search" icon={Search} isSearch />
					<Item onClick={() => {}} label="settings" icon={Settings} />
					<Item
						onClick={handleCreate}
						label="New Page"
						icon={PlusCircle}
					/>
				</div>
				<div className="mt-4">
					<DocumentList />
				</div>
				<div
					onMouseDown={handleMouseDown}
					onClick={resetwidth}
					className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute bg-primary/10 top-0 right-0 h-full w-1"
				/>
			</aside>
			<div
				ref={navbarRef}
				className={cn(
					"absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
					isResetting && "transition-all duration-300 ease-in-out",
					isMobile && "left-0 w-full"
				)}
			>
				<nav className="bg-transparent px-3 py-2 w-full">
					{isCollapsed && (
						<MenuIcon
							onClick={resetwidth}
							className="w-6 h-6 cursor-pointer text-muted-foreground"
						/>
					)}
				</nav>
			</div>
		</>
	);
};
