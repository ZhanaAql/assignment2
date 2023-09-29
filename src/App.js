import Container from "react-bootstrap/Container";
import "./App.css";
import Currency from "./pages/Currency.js";

function App() {
  return (
    <div>
      <Container>
        <Currency />
        <p>Rates are based from 1 USD</p>
      </Container>
    </div>
  );
}

export default App;
