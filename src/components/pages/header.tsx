import { Button } from "@/components/component/button"

export const Header = () => {
    return (
        <header className="max-w-[1440px] w-full mx-auto h-[72px] flex items-center justify-between">
            <div className="">
                <img src="/logo.png" alt="logo" width={48} height={48} />
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
                className="border-[#3F3F3F] bg-transparent hover:bg-[#3F3F3F] text-white rounded-md
                            bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4] border-none hover:opacity-90"
                variant="outline">
                Login
            </Button>
        </header>
    )
}