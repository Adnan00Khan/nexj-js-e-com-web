"use client"
import React, { useState, useEffect } from 'react';

import { fetchProducts } from '../utils/api';
import Navbar from './components/Navbar/page';

import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  img?: string; // Optional image URL
};

type CartItem = Product & { quantity: number }; // Add quantity to CartItem

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    // Check if the product already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    let updatedCart: CartItem[];
    
    if (existingItemIndex !== -1) {
      // If it exists, update the quantity
      const updatedItem = {
        ...cart[existingItemIndex],
        quantity: cart[existingItemIndex].quantity + 1,
      };
      updatedCart = [
        ...cart.slice(0, existingItemIndex),
        updatedItem,
        ...cart.slice(existingItemIndex + 1),
      ];
    } else {
      // If it doesn't exist, add it with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-semibold mb-4">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {products.map((product) => (
    <div
      key={product.id} // Add the unique key here
      className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between hover:shadow-lg transition-shadow"
    >
      {/* Product Image */}
      {product.img && (
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-56 object-center rounded mb-2"
          aria-label={`Image of ${product.name}`}
        />
      )}
      {/* Product Information */}
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-700">{product.description || "No description available"}</p>
      <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>

      {/* Product Details Link */}
      <Link href={`/product/${product.id}`} passHref>
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`View details of ${product.name}`}
        >
          View Details
        </button>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          addToCart(product); // Add product to cart
        }}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </div>
  ))}
</div>

      </main>
    </div>
  );
}
