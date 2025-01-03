"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/page';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  img?: string; // Optional product image
};

type CartItem = Product & { quantity: number };

const CartItemComponent = ({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) => (
  <div className="border p-4 rounded bg-white shadow flex flex-wrap justify-between items-center">
    <div>
    {item.img && (
        <img
          src={item.img}
          alt={item.name}
          className="w-60 h-56 object-center  rounded mb-2"
          aria-label={`Image of ${item.name}`}
        />
      )}
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-gray-700">{item.description}</p>
      <p className="text-lg font-semibold">${item.price}</p>
      <p className="text-sm mt-1">Quantity: {item.quantity}</p>
    </div>
    <div className="flex items-center space-x-2 mt-4 md:mt-0">
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
      >
        -
      </button>
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
      >
        +
      </button>
      <button
        onClick={() => onRemove(item.id)}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Remove
      </button>
    </div>
  </div>
);

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar cartCount={cartItems.length} />
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-lg text-center py-10">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link
            href="/"
            className="text-blue-600 underline hover:text-blue-800 mt-4 inline-block"
          >
            Go back to shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          <div className="mt-8 p-4 border rounded bg-white shadow">
            <h2 className="text-xl font-semibold">Cart Summary</h2>
            <p className="mt-2 text-lg">Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}