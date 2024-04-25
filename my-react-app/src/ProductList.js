import React, { useState, useEffect } from 'react';

const ProductsList = ({ addToCart, isLoggedIn, navigateToLogin }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const [products] = useState([
    {
      id: 1,
      name: 'Real Madrid Adidas shirt season 2023/24',
      price: 80,
      image: 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202307/18/00132435222198____3__640x640.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      daysToShip: '5-10 days',
      additionalItems: ['Logo World Cup', 'Champions League'],
    },
    {
      id: 2,
      name: 'Napoli shirt EA7 season 2023/24',
      price: 70,
      image: 'https://trizop.com/wp-content/uploads/2023/08/napoli-segunda-23-24-2.webp',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      daysToShip: '5-10 days',
      additionalItems: ['Logo World Cup', 'Champions League'],
    },
    {
      id: 3,
      name: 'Argentina World Cup Champions Adidas Shirt season 2022/23',
      price: 100,
      image: 'https://estaticos-cdn.prensaiberica.es/clip/8d3c0b70-6e72-487b-b1f1-aa83a63b7bc8_alta-libre-aspect-ratio_default_0.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      daysToShip: '5-10 days',
      additionalItems: ['Logo World Cup', 'Champions League'],
    },
    {
      id: 4,
      name: 'Manchester City Puma shirt season 2023/24',
      price: 90,
      image: 'https://www.lars7.com/image/cache/20230309SX/camiseta-manchester-city-1-equipacion-2023-2024-01-270x270.png',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      daysToShip: '5-10 days',
      additionalItems: ['Logo World Cup', 'Champions League'],
    },
    {
      id: 5,
      name: 'FC Barcelona Nike shirt season 2023/24',
      price: 75,
      image: 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202306/15/00199455128597____3__1200x1200.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      daysToShip: '5-10 days',
      additionalItems: ['Logo World Cup', 'Champions League'],
    },
    {
      id: 6,
      name: 'France World Cup 2022 Nike shirt season 2022/23',
      price: 60,
      image: 'https://www.cuirz.com/wp-content/uploads/2022/09/fdrCPy3LUIYXyWo-370x475.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      daysToShip: '5-10 days',
      additionalItems: ['Logo World Cup', 'Champions League'],
    },
  ]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  const currentProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleAddToCart = (product, selectedSize) => {
    if (isLoggedIn) {
      const productWithSize = { ...product, selectedSize };
      addToCart(productWithSize);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } else {
      alert("You need to login first.");
      navigateToLogin();
    }
  };

  const handleViewDetails = (product) => {
    const productDetailsWindow = window.open('', '_blank');
    if (productDetailsWindow) {
      productDetailsWindow.document.write(`
        <html>
          <head>
            <title>Product Details</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              .product-details {
                padding: 20px;
              }
              .product-info {
                margin-bottom: 10px;
              }
              .product-buttons {
                margin-top: 10px;
              }
              .product-button {
                font-size: 16px;
                padding: 8px 20px;
                margin-right: 10px;
                cursor: pointer;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 5px;
                outline: none;
              }
            </style>
          </head>
          <body>
            <div class="product-details">
              <h2>${product.name}</h2>
              <img src="${product.image}" alt="${product.name}" style="max-width: 200px; margin-bottom: 10px;" />
              <p class="product-info">Price: $${product.price}</p>
              <p class="product-info">Approximate Days to Ship: ${product.daysToShip}</p>
              <p class="product-info">Sizes: ${product.sizes.join(', ')}</p>
              <p class="product-info">Additional Items: ${product.additionalItems.join(', ')}</p>
              <div class="product-buttons">
                <button class="product-button" onclick="window.close()">Back to Products</button>
              </div>
            </div>
            <script>
              function addToCart(productId, selectedSize) {
                const product = ${JSON.stringify(product)};
                product.selectedSize = selectedSize;
                window.opener.addToCart(product, selectedSize);
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      productDetailsWindow.document.close();
    } else {
      alert('Please allow pop-ups for this site to view product details.');
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2>Products</h2>
      <label style={{ marginBottom: '10px' }}>
        Sort by:
        <select
          onChange={(e) => setSortBy(e.target.value)}
          style={{ fontSize: '16px', marginLeft: '10px' }}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </label>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src="https://cdn.icon-icons.com/icons2/2066/PNG/512/search_icon_125165.png" alt="Search" className="search-icon" />
      </div>

      {showMessage && <p style={{ color: 'green' }}>+1 Product added to cart</p>}

      {currentProducts.map((product) => (
        <div
          key={product.id}
          style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}
        >
          <img src={product.image} alt={product.name} style={{ width: '100px', marginRight: '20px', float: 'left' }} />
          <div>
            <h3 style={{ margin: '0' }}>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Sizes: 
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)}>{size}</button>
              ))}
            </p>
         
            <div>
              <button onClick={() => handleViewDetails(product)} style={{ fontSize: '16px', marginBottom: '5px', marginRight: '10px' }}>View Product Page</button>
              <button onClick={() => handleAddToCart(product, selectedSize)} style={{ fontSize: '16px' }}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}

      <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={{
              fontSize: '16px',
              marginRight: '5px',
              marginBottom: '10px',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;