import { useState, useEffect } from "react";
import "../styles/menu.css"

const foodItems = [
  {
    category: "Seafood",
    image: "https://via.placeholder.com/150",
    name: "Grilled Salmon",
    description: "Delicious grilled salmon with herbs.",
    price: 12.99,
  },
  {
    category: "Vegetarian",
    image: "https://via.placeholder.com/150",
    name: "Veggie Burger",
    description: "Healthy and tasty veggie burger.",
    price: 9.99,
  },
  // Add more food items here...
];

const Menu = () =>{
  const [cartCount, setCartCount] = useState(3);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div>
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%`, height: "4px", background: "#ff6b6b", position: "fixed", top: 0, left: 0 }}
      ></div>

      <header className="header">
        <nav className="nav container">
          <div className="logo">Mahadevi Ahara</div>
          <div className="cart-wrapper">
            <i className="fas fa-shopping-bag cart-icon"></i>
            <div className="cart-count">{cartCount}</div>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="categories">
          {[
            "all",
            "seafood",
            "vegetarian",
            "appetizers",
            "poultry",
            "soups",
          ].map((category) => (
            <a href={`/menu?category=${category}`} key={category}>
              <button className="category-btn">{category.toUpperCase()}</button>
            </a>
          ))}
        </div>

        <div className="menu-grid">
          {foodItems.map((item, index) => (
            <div
              className="menu-item"
              key={index}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.transform = `translateY(-10px) perspective(1000px) rotateX(${(y - rect.height / 2) / 20}deg) rotateY(${-(x - rect.width / 2) / 20}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
              }}
            >
              <div className="premium-badge">🌟 {item.category}</div>
              <img src={item.image} className="item-image" alt={item.name} />
              <div className="item-info">
                <h3 className="item-title">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <span className="item-price">${item.price.toFixed(2)}</span>
                  <button className="add-btn" onClick={addToCart}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu
