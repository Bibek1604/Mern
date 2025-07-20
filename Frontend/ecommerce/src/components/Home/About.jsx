import Header from "./Header";
import { Heart, Award, Users, Truck } from "lucide-react";
import React from "react";
import Footer from "./Footer";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Passion for Design",
      description: "Every piece is carefully curated with love and attention to detail"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest materials and work with skilled artisans"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority with personalized service"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and secure shipping to bring your vision to life"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-charcoal mb-6 animate-fade-in">
              About Gina Sanchez
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up">
              We're passionate about transforming spaces with carefully curated home decor 
              that reflects your unique style and personality. Our journey began with a simple 
              belief that every home should be a sanctuary of beauty and comfort.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-3xl lg:text-4xl font-bold text-charcoal">
                  Our Story
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2020, Gina Sanchez started as a small passion project to bring 
                  beautiful, affordable home decor to everyone. What began in a small studio 
                  has grown into a trusted brand that serves thousands of customers worldwide.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that great design should be accessible to all. That's why we work 
                  directly with artisans and manufacturers to offer premium quality pieces at 
                  fair prices, ensuring that beautiful design is within everyone's reach.
                </p>
                <button className="inline-flex items-center justify-center h-12 px-8 rounded-md text-sm font-medium bg-charcoal text-warm-white hover:bg-navy transition-all duration-300 shadow-elegant">
                  Shop Our Collection
                </button>
              </div>
              
              <div className="relative animate-scale-in">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80"
                    alt="Modern home decor interior design"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay for better text contrast if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-4">
                Why Choose Us
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We're committed to providing exceptional quality and service in everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="text-center space-y-4 animate-fade-in bg-gradient-card p-6 rounded-lg shadow-card hover:shadow-elegant transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-charcoal text-warm-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Our Mission
              </h2>
              <p className="text-lg text-warm-white/80 leading-relaxed">
                To inspire and empower people to create beautiful, functional spaces that reflect 
                their unique personality and lifestyle. We believe that good design has the power 
                to transform not just spaces, but lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button className="inline-flex items-center justify-center h-12 px-8 rounded-md text-sm font-medium bg-accent text-warm-white hover:bg-accent/90 transition-all duration-300 shadow-elegant">
                  Start Your Journey
                </button>
                <button className="inline-flex items-center justify-center h-12 px-8 rounded-md text-sm font-medium border border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;