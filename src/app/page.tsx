"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/page";
import Link from "next/link";

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
    // Simulating API data
    const mockProducts: Product[] = [
       { id: 1, name: 'Laptop', price: 1000, description: 'High-performance laptop', img:'https://helios-i.mashable.com/imagery/articles/05djrP5PjtVB7CcMtvrTOAP/hero-image.fill.size_1248x702.v1723100793.jpg' },
  { id: 2, name: 'Smartphone', price: 700, description: 'Latest model smartphone',img:'https://sparx.pk/cdn/shop/files/NeoxBrownPTALOGO.jpg?v=1721642419' },
  { id: 3, name: 'Headphones', price: 200, description: 'Noise-cancelling headphones',img:'https://static3.webx.pk/files/68529/Images/61kfsu-cykl.-ac-sl1500--68529-0-180124040712888.jpg' },
    ];

    setProducts(mockProducts); // Load mock data
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart: CartItem[];

    if (existingItemIndex !== -1) {
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
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
              key={product.id}
              className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              {product.img && (
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-56 object-center rounded mb-2"
                  aria-label={`Image of ${product.name}`}
                />
              )}
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-700">
                {product.description || "No description available"}
              </p>
              <p className="text-lg font-semibold mt-2">
                ${product.price.toFixed(2)}
              </p>
              <Link href={`/product/${product.id}`} passHref>
                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`View details of ${product.name}`}
                >
                  View Details
                </button>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
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
