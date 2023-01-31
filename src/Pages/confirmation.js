import "../App.css";
import Header from "../components/header";
import Footer from "../components/footer";
import UserConfirmation from "../components/confirmation"
import "../App.css";
import { Link } from "react-router-dom";

function Confirmation() {
  return (
    <div>
      <Header />
      <UserConfirmation />
      <Link to="/">
        <h2 className={"done"}> Verifiying Email... </h2>
      </Link>
      <Footer />
    </div>
  );
}

export default Confirmation;
