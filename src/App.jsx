import axios from "axios";
import "./App.css";
import { serverUrl } from "./utils/appConstants";
import { useEffect } from "react";
import Payment from "./Payment";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stripe Payment Integration</h1>
        <Payment />
      </header>
    </div>
  );
}

export default App;
