import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Hero } from "../components/landingpage/Hero";
import Section1 from "../components/landingpage/Section1";
import Section2 from "../components/landingpage/Section2";
import Section3 from "../components/landingpage/Section3";
import Section4 from "../components/landingpage/Section4";

const LandingPage = () => { 

  	return (
        <div className="gradient-bg font-heading-style">
            <Navbar />
            <div className="custom-container text-white">
                <Hero />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
            </div>
            <Footer />
        </div>
    );
            
};

export default LandingPage;




                                                      																											


                                                      																											
  