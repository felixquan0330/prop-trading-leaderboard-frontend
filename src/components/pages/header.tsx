import { Button } from "@/components/component/button"

export const Header = () => {
    return (
        <header className="h-[72px] flex items-center justify-between">
            <div className="">
                <img src="/logo.png" alt="logo" width={48} height={48} />
            </div>
            <div className="flex items-center space-x-8">
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-[#434a56] dark:text-white font-bold">
                        Global Leaderboard
                    </a>
                    <a href="#" className="text-[#434a56] dark:text-white font-bold">
                        Prop Firm Reviews
                    </a>
                    <a href="#" className="text-[#434a56] dark:text-white font-bold">
                        GOAT Club
                    </a>
                    <a href="#" className="text-[#434a56] dark:text-white font-bold">
                        About
                    </a>
                </nav>
            </div>
            <Button
                className="border-[#434a56] bg-transparent hover:bg-[#434a56] dark:text-white dark:border-[#3F3F3F] dark:hover:bg-[#3F3F3F] rounded-md
                            dark:text-white dark:bg-gradient-to-b dark:from-[#9CECFB] dark:via-[#65C7F7] dark:to-[#0052D4] dark:border-none dark:hover:opacity-90"
                variant="outline">
                Login
            </Button>
        </header>
    )
}