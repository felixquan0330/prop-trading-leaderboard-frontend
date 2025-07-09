export default function StayConnected() {
    return (
        <div className="max-w-[1440px] w-full mx-auto px-20 pt-24 pb-16 flex flex-col gap-8 h-[400px] justify-center items-center">
            <div className="flex flex-col gap-3">
                <span className="text-white opacity-70 text-center text-sm">STAY CONNECTED</span>
                <h1 className="text-white text-center text-4xl font-bold">
                    Keep updated on the top traders insights,
                    <br />
                    leaderboard rankings and more
                </h1>
            </div>
            <div className="flex justify-center items-center min-h-[120px]">
                <form className="flex bg-[#282828] rounded-full shadow-sm px-2 py-2 w-[420px]">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 bg-transparent outline-none px-6 text-white placeholder-[#afafaf] text-base font-medium"
                    />
                    <button
                        type="submit"
                        className="bg-[#3F3F3F] text-white rounded-full px-7 py-2 ml-2 transition hover:bg-[#3F3F3F]
                                    text-white bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4] border-none hover:opacity-90"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    )
}