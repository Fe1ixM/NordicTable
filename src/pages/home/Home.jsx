import HeroHeader from "../../components/headers/heroHeader/HeroHeader";
import Footer from "../../components/footer/Footer";
import AboutSection from "../../components/about/About";
import SignatureDishes from "../../components/dishes/Dishes";
import ReservationSection from "../../components/reservation/Reservation";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <SignatureDishes />
      <AboutSection />
      <ReservationSection />
      <Footer />
    </div>
  );
}
