

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export async function fetchProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Fallback to localhost for development
  const response = await fetch(`${apiUrl}/api/products`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  
  return await response.json();
}
