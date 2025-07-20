import React from "react";
const Hero = () => {
  return (
    <section className="relative min-h-[70vh] bg-gradient-hero flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm uppercase tracking-wide">
                Discover Premium Collection
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Latest Arrivals
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Transform your space with our curated collection of premium home decor, 
              furniture, and accessories designed for the modern lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-lg">
                Shop Collection
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-white border border-gray-300 text-gray-900 hover:scale-105 shadow-sm">
                View Catalog
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-product">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80"
                alt="Modern living room interior"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-warm-white/90 backdrop-blur-sm rounded-lg p-4 shadow-elegant animate-scale-in">
                <p className="text-xs text-muted-foreground mb-1">Featured Room</p>
                <p className="font-semibold text-charcoal">Modern Living</p>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-warm-white/90 backdrop-blur-sm rounded-lg p-4 shadow-elegant animate-scale-in" style={{animationDelay: "0.2s"}}>
                <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                <p className="raphic-bold text-accent text-lg">Rs. 15,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;