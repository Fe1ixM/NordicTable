import HeroHeader from "../../components/headers/heroHeader/HeroHeader";
import BookingSection from "./components/BookingSection";
import Footer from "../../components/footer/Footer";

export default function Booking() {
  return (
    <>
      <HeroHeader
        subtitle="Reservationer"
        title="Book dit bord"
        description="Vi glæder os til at modtage dig. Book dit bord nedenfor, og vi sørger for resten."
      />
      <BookingSection />
      <Footer />
    </>
  );
}
