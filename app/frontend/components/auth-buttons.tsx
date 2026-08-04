import type React from "react";
import { Button } from "@/components/wilderness/button";
import { csrfToken } from "@/lib/csrf";

type AuthButtonProps = {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "outline" | "link";
	className?: string;
};