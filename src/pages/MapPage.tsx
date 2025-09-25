import InteractiveMap from "@/components/InteractiveMap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MapPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Interactive Map of Sikkim
        </h1>
        <InteractiveMap />
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
