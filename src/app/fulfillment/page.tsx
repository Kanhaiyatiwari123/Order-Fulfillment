"use client";

import { useState, useEffect } from "react";
import { OrderForm } from "./form";
import { DataTable } from "./data-table";
import { columns, Order } from "./columns";

export default function FulfillmentPage() {
  const [data, setData] = useState<Order[]>([]);       //this data is getting rendered below in the <DataTable> Component

  // Load data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("orders");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // Add new order and save to local storage
  const addNewOrder = (newOrder: Order) => {
    const updatedData = [...data, newOrder];
    setData(updatedData);
    localStorage.setItem("orders", JSON.stringify(updatedData));
  };


  // Delete order and update local storage
  const deleteOrder = (orderId: number) => {
    const updatedData = data.filter(order => order.id !== orderId);
    setData(updatedData);
    localStorage.setItem("orders", JSON.stringify(updatedData));
  };

  // Pass deleteOrder function to each row, in the column who's id is "actions"
  const rowsWithDelete = columns.map(column => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }: { row: { original: Order } }) => (
          <button
            className="text-red-500 hover:underline"
            onClick={() => deleteOrder(row.original.id)}
          >
            Delete
          </button>
        ),
      };
    }
    return column;
  });


  return (
    <div className="container mx-auto py-10">
      <OrderForm onSubmit={addNewOrder} />
      <DataTable columns={rowsWithDelete} data={data} />    {/*this simple columns and data are predefined and curly braces one {} are defined by us*/}
    </div>
  );
}
