// components/layout/defaultNavItems.tsx
import React from "react";
import {
	CalendarIcon,
	FolderIcon,
	HomeIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";
import Image from "next/image";
export const defaultNavItems: NavItem[] = [
	{
		label: "Dashboard",
		href: "/dashborad",
		icon: (
			<Image
				src="/images/menu/dashboard.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
		iconcurrentpage: (
			<Image
				src="/images/menu/dashboard ขาว.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
	},

	{
		label: "ร้านค้าของฉัน",
		href: "/shop",
		icon: (
			<Image
				src="/images/menu/ร้านค้าของฉัน.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
		iconcurrentpage: (
			<Image
				src="/images/menu/ร้านค้าของฉัน ขาว.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
	},
	{
		label: "คำสั่งซื้อ",
		href: "/order",
		icon: (
			<Image
				src="/images/menu/คำสั่งซื้อ.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
		iconcurrentpage: (
			<Image
				src="/images/menu/คำสั่งซื้อ ขาว.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
	},
	{
		label: "คลังสินค้า",
		href: "/stock",
		icon: (
			<Image
				src="/images/menu/คลังสินค้า.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
		iconcurrentpage: (
			<Image
				src="/images/menu/คลังสินค้า ขาว.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
	},
	{
		label: "รายงาน",
		href: "/report",
		icon: (
			<Image
				src="/images/menu/report.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
		iconcurrentpage: (
			<Image
				src="/images/menu/รายงาน ขาว.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
	},

	{
		label: "จัดการแอดมิน",
		href: "/admin",
		icon: (
			<Image
				src="/images/menu/จัดการแอดมิน.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
		iconcurrentpage: (
			<Image
				src="/images/menu/จัดการแอดมิน ขาว.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
	},
	{
		label: "ตั้งค่า",
		href: "/setting",
		icon: (
			<Image
				src="/images/menu/ตั้งค่า.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
		iconcurrentpage: (
			<Image
				src="/images/menu/ตั้งค่า ขาว.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
	},
];
