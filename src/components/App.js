import "./App.css";
import Weather from "./Weather";
import Search from "./Search";
import Clock from "./Clock";
import Calculator from "./Calculator";
import Modal from "./Modal";
import NewsFeed from "./NewsFeed";
import SocialFeed from "./SocialFeed";

function App() {
  return (
    <div className="app">
      <div className="app-head">
        <div className="app-nav">
          <Modal
            trigger="fas fa-cog"
            className=""
            triggerStyle="app-nav-icon"
            icon
          />
          <Modal
            trigger="Group Tab 1"
            className=""
            triggerStyle="app-nav-btn"
          />
          <Modal
            trigger="Group Tab 2"
            className=""
            triggerStyle="app-nav-btn"
          />
          <Modal
            trigger="Group Tab 3"
            className=""
            triggerStyle="app-nav-btn"
          />
          <Calculator className="" triggerStyle="app-nav-btn" />
        </div>
        <Clock className="app-clock" />
        <Weather className="app-weather" />
      </div>
      <div className="app-main">
        <div className="app-center">
          <h1>Hey Anmol!</h1>
          <Search className="app-search" />
        </div>
        <div className="app-feed">
          <NewsFeed />
          <SocialFeed />
        </div>
      </div>
    </div>
  );
}

export default App;
