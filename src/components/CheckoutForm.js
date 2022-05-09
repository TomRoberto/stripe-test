import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  const [message, setMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();
    try {
      // Récupérer les données du fromulaire
      const cardElement = elements.getElement(CardElement);
      // Envoyer à l'API stripe les codes du client
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // Envoyer mon token à mon serveur
      const response = await axios.post("http://localhost:4000/payment", {
        stripeToken,
      });
      if (response.status === 200) {
        setMessage("Paiement validé");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return !message ? (
    <>
      <form onSubmit={handlePayment}>
        <CardElement />
        <input type="submit" value="Payer" />
      </form>
    </>
  ) : (
    <p>{message}</p>
  );
};

export default CheckoutForm;
