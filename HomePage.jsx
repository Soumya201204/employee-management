import "../styles/home.css"
const Homepage = () => {
  return (
    <div id="Homepage">
      <div class="overlay"></div>
      <div class="content">
        <h1>Delicious Delivered Fast!</h1>
        <p>Order your favorite meals from top restaurants near you.</p>
        <a href="/login" class="btn">
          Start Now
        </a>
      </div>
    </div>
  );
};

export default Homepage