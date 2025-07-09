export default function StayConnected() {
    return (
        <div className="max-w-[1440px] w-full mx-auto px-20 pt-24 pb-16 flex flex-col gap-8 h-[400px] justify-center items-center">
            <div className="flex flex-col gap-3">
                <span className="text-[#16191d] dark:text-white dark:opacity-70 text-center text-sm">STAY CONNECTED</span>
                <h1 className="text-[#16191d] dark:text-white text-center text-4xl font-bold">
                    Keep updated on the top traders insights,
                    <br />
                    leaderboard rankings and more
                </h1>
            </div>
            <div className="flex justify-center items-center min-h-[120px]">
                <form className="flex bg-[#f7f8fa] dark:bg-[#282828] rounded-full shadow-sm px-2 py-2 w-[420px]">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 bg-transparent outline-none px-6 text-[#7B849B] placeholder-[#bfc6d1] dark:placeholder-[#afafaf] dark:text-white text-base font-medium"
                    />
                    <button
                        type="submit"
                        className="bg-[#e9ebee] dark:bg-[#3F3F3F] text-[#434a56] dark:text-white rounded-full px-7 py-2 ml-2 transition hover:bg-[#e0e3e7] dark:hover:bg-[#3F3F3F]
                                    dark:text-white dark:bg-gradient-to-b dark:from-[#9CECFB] dark:via-[#65C7F7] dark:to-[#0052D4] dark:border-none dark:hover:opacity-90"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    )
}