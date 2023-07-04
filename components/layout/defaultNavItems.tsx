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
		href: "/dashboard",
		namePermission: "permission_dashboard",
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
		namePermission: "permission_my_shop",
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
		namePermission: "permission_order",
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
		namePermission: "permission_stock",
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
		label: "แชทร้านค้า",
		href: "/chats",
		namePermission: "permission_chats",
		icon: (
			<Image
				src="/images/menu/Chats.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
		iconcurrentpage: (
			<Image
				src="/images/menu/Chats.png"
				alt="My Image"
				width={30}
				height={30}
			/>
		),
	},
	{
		label: "รายงาน",
		href: "/report",
		namePermission: "permission_report",
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
		namePermission: "permission_admin_manage",
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
		namePermission: "permission_settings",
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
