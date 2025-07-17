import { Button } from "@/components/component/button"

export const Header = () => {
    return (
        <header className="max-w-[1440px] w-full mx-auto h-[72px] flex items-center justify-between">
            <div className="">
                <img src="/logo.jpg" alt="logo" width={48} height={48} />
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
            <Button
                className="bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#1E3A8A] text-white rounded-md px-4 py-2 border-none shadow-none hover:opacity-90 transition"
                variant="outline">
                Login
            </Button>
        </header>
    )
}