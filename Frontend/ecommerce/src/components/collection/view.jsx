// src/components/ProductDetail.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore, useCartStore } from "../../store";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const ProductDetail = () => {
  const { id } = useParams();

  const { currentProduct, getProductById, clearCurrentProduct, isLoading, error } = useProductStore();
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    getProductById(id);
    return () => clearCurrentProduct();
  }, [id, getProductById, clearCurrentProduct]);

  const handleAddToCart = () => {
    if (currentProduct) {
      const productToAdd = { ...currentProduct, id: currentProduct.id || currentProduct._id };
      addToCart(productToAdd);
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!currentProduct) return <div className="text-center py-20">Product not found.</div>;

  return (
    <>
      <Header />
      <section className="min-h-[80vh] py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-2">

                <h2 className="text-3xl font-semibold text-charcoal">Rs. {currentProduct.price}</h2>
                <p className="text-muted-foreground text-sm">
                  {currentProduct.description || "No description available."}
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                className="inline-block bg-charcoal text-black py-3 px-6 rounded-md hover:bg-navy transition shadow-lg"
              >
                Add to Cart
              </button>

              <p className="text-sm text-muted-foreground">
                100% Original product.<br />
                Cash on delivery is available on this product.
              </p>
            </div>
          </div>

          <div className="mt-16 border rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {currentProduct.longDescription || currentProduct.description || "No detailed description available."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-xl font-semibold mb-2">Ghar Sanskar</h4>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            We believe your home should reflect your personality, taste, and lifestyle. That’s why we’re passionate
            about curating and offering a wide range of elegant, modern, and timeless decor items that transform your
            space into something truly special.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetail;
