
import './Home.css'

function Home() {
    return (
      <div className="home">
        <h1 className="hero-title">Code. Test. Master.</h1>
        <p className="hero-sub">
          A next-generation coding platform for practice, tests, and interviews.
        </p>
  
        <div className="hero-actions">
          <a href="/ide">Try IDE</a>
          <a href="/questions">Solve Problems</a>
        </div>
      </div>
    );
  }
  
  export default Home;
  