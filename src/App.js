import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./components/CheckoutForm";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF"
  );
  console.log(stripePromise);
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
