import Hero from "./Hero/page";
import Leaderboard from "./Leaderboard/page";
import TopTrader from "./TopTrader/page";
import PropFirmReview from "./PropFirmReview/page";
import GOATClub from "./GOATClub/page";
import StayConnected from "./StayConnnect/page";
import { Footer } from "@/components";

export default function Home() {
    return (
        <div>
            <Hero />
            <Leaderboard />
            <TopTrader />
            <PropFirmReview />
            <GOATClub />
            <StayConnected />
            <Footer />
        </div>
    );
}
