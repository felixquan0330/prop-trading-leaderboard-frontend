import { Button } from "@/components/component/button"

export const Header = () => {
    return (
        <header className="max-w-[1440px] w-full mx-auto h-[72px] flex items-center justify-between z-20">
            <div className="">
                <img src="/logo.jpg" alt="logo" width={64} height={64} />
            </div>
            <div className="flex items-center space-x-8">
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-white font-bold">
                        Global Leaderboard
                    </a>
                    <a href="#" className="text-white font-bold">
                        Prop Firm Reviews
                    </a>
                    <a href="#" className="text-white font-bold">
                        GOAT Club
                    </a>
                    <a href="#" className="text-white font-bold">
                        About
                    </a>
                </nav>
            </div>
            <div></div>
        </header>
    )
}