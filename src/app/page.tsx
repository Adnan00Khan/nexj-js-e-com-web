import PropTypes from "prop-types";
import Link from "next/link";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between hover:shadow-lg transition-shadow">
      {product.img && (
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-56 object-center rounded mb-2"
          aria-label={`Image of ${product.name}`}
        />
      )}
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-700">{product.description || "No description available"}</p>
      <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
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
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};
