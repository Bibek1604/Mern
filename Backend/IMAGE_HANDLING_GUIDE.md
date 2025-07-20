// 🖼️ Image Handling Guide for Frontend

// =================================
// Option 1: Static File URLs
// =================================
// Backend serves images from /uploads folder
// Frontend displays: http://localhost:5000/uploads/filename.jpg

// Example product with file URL:
{
  "id": 1,
  "title": "Modern Lamp",
  "image": "lamp.jpg",  // Just filename
  "price": 49.99
}

// Frontend usage:
const imageUrl = `http://localhost:5000/uploads/${product.image}`;
<img src={imageUrl} alt={product.title} />

// =================================
// Option 2: Base64 Images
// =================================
// Store full base64 data in database

// Example product with base64:
{
  "id": 1,
  "title": "Modern Lamp", 
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...", // Full base64
  "price": 49.99
}

// Frontend usage:
<img src={product.image} alt={product.title} />

// =================================
// Option 3: External URLs
// =================================
// Store full URLs to external images

// Example product with external URL:
{
  "id": 1,
  "title": "Modern Lamp",
  "image": "https://example.com/images/lamp.jpg", // Full URL
  "price": 49.99
}

// Frontend usage:
<img src={product.image} alt={product.title} />

// =================================
// CURRENT SETUP
// =================================
// Your backend now serves static files from /uploads
// Put images in: f:\Soft\Backend\uploads\
// Access via: http://localhost:5000/uploads/filename.jpg

// Example:
// File: f:\Soft\Backend\uploads\lamp.jpg
// URL:  http://localhost:5000/uploads/lamp.jpg

// =================================
// FRONTEND IMAGE COMPONENT
// =================================
const ProductImage = ({ product }) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    
    // If it's already a full URL, use it
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // If it's just a filename, build the URL
    return `http://localhost:5000/uploads/${imagePath}`;
  };

  return (
    <img 
      src={getImageUrl(product.image)} 
      alt={product.title}
      onError={(e) => {
        e.target.src = '/placeholder.jpg'; // Fallback image
      }}
    />
  );
};
