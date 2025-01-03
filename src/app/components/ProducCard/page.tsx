import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  img?: string; // Optional product image
};

type ProductCardProps = {
  product: Product;
  addToCart: (product: Product) => void;
};

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between hover:shadow-lg transition-shadow">
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
  );
}
