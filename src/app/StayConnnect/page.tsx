import { Button } from "@/components";

export default function StayConnected() {
    return (
        <div className="max-w-[1440px] w-full mx-auto px-20 pt-24 pb-16 flex flex-col gap-8 justify-center items-center">
            <div
                className="w-full h-[400px] flex flex-col justify-center items-center gap-8 rounded-xl border border-white/10 bg-gradient-to-b from-[#0E1625] to-[#0B111B] backdrop-blur-lg shadow-[0_4px_30px_0_rgba(0,0,0,0.25)] [box-shadow:0_2px_6px_0_rgba(255,255,255,0.04)_inset]"
            >
                <div className="flex flex-col gap-3">
                    <span className="text-white text-center text-sm">STAY CONNECTED</span>
                    <h1 className="text-white text-center text-4xl font-semibold">
                        Keep updated on the top traders insights,
                        <br />
                        leaderboard rankings and more
                    </h1>
                </div>
                <div className="flex justify-center items-center">
                    <form className="flex bg-white/10 border border-white/20 rounded-full shadow-sm px-2 py-2 w-[420px]">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 bg-transparent outline-none px-6 text-white placeholder-[#afafaf] text-base"
                        />
                        <Button
                            className="bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#1E3A8A] text-white rounded-full px-4 py-2 border-none shadow-none hover:opacity-90 transition"
                            variant="outline">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}