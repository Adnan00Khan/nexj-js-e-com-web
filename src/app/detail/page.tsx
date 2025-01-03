"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar/page";


type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  img?: string; // Optional product image
};


// Simulated API function (replace with your actual API code if needed)
const getProductById = (productId: string): Product | null => {
  // Here you would return the data fetched from your local API or database
  const mockData = [
    { id: 1, name: 'Laptop', price: 1000, description: 'High-performance laptop', img:'https://helios-i.mashable.com/imagery/articles/05djrP5PjtVB7CcMtvrTOAP/hero-image.fill.size_1248x702.v1723100793.jpg' },
    { id: 2, name: 'Smartphone', price: 700, description: 'Latest model smartphone',img:'https://sparx.pk/cdn/shop/files/NeoxBrownPTALOGO.jpg?v=1721642419' },
    { id: 3, name: 'Headphones', price: 200, description: 'Noise-cancelling headphones',img:'https://static3.webx.pk/files/68529/Images/61kfsu-cykl.-ac-sl1500--68529-0-180124040712888.jpg' },
    // Add more mock products if needed
  ];

  return mockData.find((product) => product.id === parseInt(productId)) || null;
};

export default function ProductDetail() {
  const params = useParams<{ productId: string }>();
  const productId = params?.productId; // Get the productId from the URL
  const router = useRouter();
 

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const productDetails = getProductById(productId);

    if (!productDetails) {
      setLoading(false);
      alert("Product not found.");
      router.push("/"); // Redirect to home if product not found
    } else {
      setProduct(productDetails);
      setLoading(false);
    }
  }, [productId, router]);

  const addToCart = () => {
    if (!product) return;

    const storedCart = localStorage.getItem("cart");
    const updatedCart = storedCart ? JSON.parse(storedCart) : [];

    const existingItemIndex = updatedCart.findIndex((item: Product) => item.id === product.id);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-6">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <p className="text-red-500">Failed to load product details. Please try again later.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-300 px-4 py-2 rounded mt-4 hover:bg-gray-400"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="bg-white p-6 rounded shadow">
      {product.img && (
        <img
          src={product.img}
          alt={product.name}
          className="w-80 h-80 object-center rounded mb-2"
          aria-label={`Image of ${product.name}`}
        />
      )}
        <h1 className="text-3xl font-semibold mt-4">{product.name}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-lg font-semibold mt-4">${product.price}</p>
        <button
          onClick={addToCart}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
