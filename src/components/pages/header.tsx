import { Button } from "@/components/component/button"

export const Header = () => {
    return (
        <header className="h-[72px] flex items-center justify-between">
            <div className="w-8 h-8 bg-[#ccd0d7] rounded"></div>
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
            <Button className="border-[#434a56] bg-[#F6F7F8] hover:bg-[#434a56] dark:bg-gray-700 dark:text-white dark:border-gray-400 dark:hover:bg-gray-600" variant="outline">
                Login
            </Button>
        </header>
    )
}