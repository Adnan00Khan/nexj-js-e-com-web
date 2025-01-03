"use client"
import React, { useState, useEffect } from 'react';

import { fetchProducts } from '../utils/api';
import Navbar from './components/Navbar/page';
import ProductCard from './components/ProducCard/page';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
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
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <main className="p-6">
        <h1 className="text-3xl font-semibold mb-4">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </main>
    </div>
  );
}
