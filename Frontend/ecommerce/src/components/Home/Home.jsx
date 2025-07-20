import React from 'react'
import Header from './Header'
import Hero from './Hero'
import ProductCard from './ProductCard'
import Footer from './Footer'

function Home() {
  const sampleProducts = [
    {
      id: 1,
      name: "Modern Minimalist Sofa",
      price: 45000,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Furniture",
      isNew: true
    },
    {
      id: 2,
      name: "Elegant Table Lamp",
      price: 8500,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Lighting",
      isNew: false
    },
    {
      id: 3,
      name: "Decorative Wall Art",
      price: 12000,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Decor",
      isNew: true
    },
    {
      id: 4,
      name: "Premium Coffee Table",
      price: 28000,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Furniture",
      isNew: false
    }
  ];

  return (
    <div>
        <Header />
        <Hero />
        
        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-4">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our handpicked collection of premium home decor items
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
    </div>
  )
}

export default Home