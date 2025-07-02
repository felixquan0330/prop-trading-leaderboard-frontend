export default function StayConnected() {
    return (
        <div className="px-20 pt-24 pb-16 flex flex-col gap-8 h-[400px] justify-center items-center">
            <div className="flex flex-col gap-3">
                <span className="text-[#16191d] text-center text-md">STAY CONNECTED</span>
                <h1 className="text-[#16191d] text-center text-4xl font-bold">
                    Keep updated on the top traders insights,
                    <br />
                    leaderboard rankings and more
                </h1>
            </div>
            <div className="flex justify-center items-center min-h-[120px]">
                <form className="flex bg-[#f7f8fa] rounded-full shadow-sm px-2 py-2 w-[420px]">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 bg-transparent outline-none px-6 text-[#7B849B] placeholder-[#bfc6d1] text-base font-medium"
                    />
                    <button
                        type="submit"
                        className="bg-[#e9ebee] text-[#434a56] font-semibold rounded-full px-7 py-2 ml-2 transition hover:bg-[#e0e3e7]"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    )
}