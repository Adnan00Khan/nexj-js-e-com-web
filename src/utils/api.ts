

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export async function fetchProducts(): Promise<Product[]> {
  // Replace with actual API call
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
}