import Get from "../../components/Get/Get";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/header/Header";
import Menu from "../../components/Navbar/Navbar";
import "./home.css";

export default function Home() {
  return (
    <div>
      <Menu />
      <Header />
      <div className="home">
        <Get />
      </div>
      <Footer />
    </div>
  );
}
