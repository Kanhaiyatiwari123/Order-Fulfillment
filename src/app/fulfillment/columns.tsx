"use client";

import { ColumnDef } from "@tanstack/react-table";

// Yeh type define karta hai humare data ka structure
export type Order = {
  id: number;
  customerName: string;
  orderDate: string;
  product: string;
  status: "Fulfilled" | "Pending";
};

// Columns ke liye definitions
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  
];
