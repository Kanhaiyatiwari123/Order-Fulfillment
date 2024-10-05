"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order } from "./columns";

// Zod schema for form validation
const orderSchema = z.object({
  id: z.string().min(1, { message: "Order ID is required" }),
  customerName: z.string().min(1, { message: "Customer Name is required" }),
  orderDate: z.string().min(1, { message: "Order Date is required" }),
  product: z.string().min(1, { message: "Product is required" }),
  status: z.enum(["Pending", "Fulfilled"], { message: "Status is required" }),
});

interface FormProps {
  onSubmit: (newOrder: Order) => void;
}

export function OrderForm({ onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Order>({
    resolver: zodResolver(orderSchema), // Apply Zod schema resolver
  });

  const submitForm = (data: Order) => {
    onSubmit(data);
    reset(); // Reset the form after submission
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex gap-4 mb-6 flex-wrap border-solid border-2 p-5 sm:max-w-full"
    >
      <div>
        <input
          type="number"
          {...register("id")}
          placeholder="Order ID"
          className="input"
        />
        {errors.id && <p className="text-red-500">{errors.id.message}</p>}
      </div>

      <div>
        <input
          type="text"
          {...register("customerName")}
          placeholder="Customer Name"
          className="input"
        />
        {errors.customerName && (
          <p className="text-red-500">{errors.customerName.message}</p>
        )}
      </div>

      <div>
        <input
          type="date"
          {...register("orderDate")}
          placeholder="Order Date"
          className="input"
        />
        {errors.orderDate && (
          <p className="text-red-500">{errors.orderDate.message}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          {...register("product")}
          placeholder="Product"
          className="input"
        />
        {errors.product && (
          <p className="text-red-500">{errors.product.message}</p>
        )}
      </div>

      <div>
        <select {...register("status")} className="input">
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Fulfilled">Fulfilled</option>
        </select>
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}
      </div>

      {/* Make the button move down on small/medium screens */}
      <div className="w-full lg:w-auto"> {/* This ensures the button takes full width on small screens */}
        <button
          type="submit"
          className="bg-blue-500 text-white pr-2 pl-2 mt-4 md:mt-0" 
        >
          Add Order
        </button>
      </div>
    </form>
  );
}
