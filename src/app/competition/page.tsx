import Banner from "@/components/Banner";
import Description from "@/components/competitionComprof/Description";
import Testimonial from "@/components/competitionComprof/Testimonial";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShowCard from "@/components/EventCompList";

export default function page() {
    return (
        <div className="font-poppins">
            <Navbar />
            <Banner title="COMPETITION" />
            <ShowCard title="ARE YOU READY TO COMPETE?" />
            <Testimonial />
            <Description />
            <Description variant="secondary"/>
            <Description />
            <Footer />
        </div>
    );
}
