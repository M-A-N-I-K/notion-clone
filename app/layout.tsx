import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "../components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Notion",
	description: "Connected Workspace where everyone can collaborate.",
	icons: {
		icon: [
			{
				media: "prefers-color-scheme: light",
				url: "/logo.svg",
				href: "/logo.svg",
			},
			{
				media: "prefers-color-scheme: dark",
				url: "/logo-dark.svg",
				href: "/logo-dark.svg",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" supressHydrationWarning>
			<body className={inter.className}>
				<ConvexClientProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
						storageKey="notion-theme"
					>
						<Toaster position="bottom-center" />
						<ModalProvider />
						{children}
					</ThemeProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
