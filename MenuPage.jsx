import { useState, useEffect } from "react";
import "../styles/menu.css";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

const foodItems = [
  {
    category: "Seafood",
    image: "https://media.istockphoto.com/id/1433809721/photo/two-salmon-fillets-baked-until-crispy-with-sesame-close-up.jpg?s=612x612&w=0&k=20&c=5rI4OFj8sSCWI2CEIqz47V_jFYhYIlPEF71zrzlmUQ4=",
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
  {
    category: "Vegetarian",
    image: "https://via.placeholder.com/150",
    name: "Veggie Burger",
    description: "Healthy and tasty veggie burger.",
    price: 9.99,
  },
  {
    category: "Vegetarian",
    image: "https://via.placeholder.com/150",
    name: "Veggie Burger",
    description: "Healthy and tasty veggie burger.",
    price: 9.99,
  },
  // Add more food items...
];

const Menu = () => {
  const [cartCount, setCartCount] = useState(3);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(foodItems);
  const [filter, setFilter] = useState('all')

  const [admin, setAdmin] = useState(localStorage.getItem('user-role'))

  const categories = ["all", "Seafood", "Vegetarian", "Appetizers", "Poultry", "Soups"];

  let navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log('Food API called: ', `http://localhost:5050/api/food?filterQuery=${filter}&searchQuery=${searchQuery}`)
    axios.get(`http://localhost:5050/api/food?filterQuery=${filter}&searchQuery=${searchQuery}`)
    .then(function(res){
      console.log(res)
      setFilteredItems(res.data)
    })
    .catch(function(error){
      console.log('Got some error while filtering data')
    })
  }, [searchQuery, filter]);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };


  const logout = ()=>{
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-email')
    localStorage.removeItem('user-role')
    navigate('/')
  }

  const deleteFoodItem = (id)=>{
    console.log('Delete this food item: ', id)
    axios.delete(`http://localhost:2323/api/food/deleteFoodItem/${id}`)
    .then(function(res){
      if(res.data.message === 'deleted data successfully'){
        window.location.reload()
        navigate('/menu')
      }
      else{
        alert('Got some error while deleting')
      }
    })
  }

  return (
    <div id="MenuPage">
      <div
        className="scroll-progress"
        style={{ 
          width: `${scrollProgress}%`, 
          height: "4px", 
          background: "#ff6b6b", 
          position: "fixed", 
          top: 0, 
          left: 0 
        }}
      ></div>

     

      <header className="header">
        <nav className="nav ">
          <div className="logo">Mahadevi Ahara</div>
          <div className="header-right">
           
            <div className="cart-wrapper">
              
            {/* <i class="fa-solid fa-plus" style={{fontSize: '25px'}}></i> */}
            <Link to="/add-food-item"><button id="btn-add-food">Add food item</button></Link>
            </div>
            <div className="profile-wrapper">
              <img 
                src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" 
                alt="Profile" 
                className="profile-pic" 
                onClick={logout}
              />
            </div>
          </div>
        </nav>
      </header>




      {/* ---------------------------- */}

      <div className="container">

      <div className="search-container">
          <div  className="search-input">
          <input
            type="text"
            placeholder="Search dishes..."
           
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
          </div>
        </div>
        

        <div className="categories">
        {categories.map((category) => (
        <button
          key={category}
          className={`category-btn ${filter === category ? "active" : ""}`}
          onClick={() => setFilter(category)}
        >
          {category.toUpperCase()}
        </button>
      ))}
        </div>

        

        <div className="menu-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                className="menu-item"
                key={index}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.transform = `translateY(-10px) perspective(1000px) rotateX(${
                    (y - rect.height / 2) / 20
                  }deg) rotateY(${-(x - rect.width / 2) / 20}deg)`;
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
                    <span className="item-price">${item.price}</span>
                    <button className="add-btn" onClick={addToCart}>
                      Order
                    </button>
                    {admin === "owner" ? <button className="del-btn" onClick={()=>{deleteFoodItem(item._id)}}>Delete</button> : null}

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-utensils-slash"></i>
              <p>No dishes found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;