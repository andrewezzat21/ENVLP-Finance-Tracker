import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
