import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow p-4"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain mb-4"
            />

            {/* Product Title */}
            <h2 className="font-semibold line-clamp-2 h-12">
              {product.title}
            </h2>

            <div className="flex justify-between mt-3 text-sm">
              <span>Price: ${product.price}</span>
              <span>{product.rating.rate}</span>
            </div>
         

            {/* Button */}
            <button className="w-full bg-purple-200 text-purple-700 font-semibold cursor-pointer py-2 rounded mt-4">
              View More
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;