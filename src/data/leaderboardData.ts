export interface TraderData {
    id: string;
    rank: number;
    avatarUrl: string;
    userid: string;
    country: 'US' | 'FR' | 'GB' | 'JP' | 'AU' | 'SA' | 'CA' | 'IT' | 'IN' | 'NZ';
    isVerified: boolean;
    subtitle: string;
    firm: string;
    profit: {
        current: number;
        target: number;
    };
    badges: Array<{
        name: string;
        icon: string;
        color: string;
    }>;
}

export const leaderboardData: TraderData[] = [
    {
        id: "1",
        rank: 1,
        avatarUrl: "/avatar/user1.png",
        userid: "PipHunterX",
        country: "US",
        isVerified: true,
        subtitle: "WALL ST. WIZARD",
        firm: "AlphaProp Firm",
        profit: {
            current: 52340,
            target: 75000
        },
        badges: [
            { name: "Top Gun", icon: "🏆", color: "border-orange-400" },
            { name: "Profit Streak", icon: "🔥", color: "border-orange-400" }
        ]
    },
    {
        id: "2",
        rank: 2,
        avatarUrl: "/avatar/user2.png",
        userid: "TraderPro",
        country: "GB",
        isVerified: true,
        subtitle: "LONDON LEGEND",
        firm: "Titan Trades",
        profit: {
            current: 48920,
            target: 70000
        },
        badges: [
            { name: "Sniper Entry", icon: "🎯", color: "border-blue-400" },
            { name: "Risk Averse", icon: "🛡️", color: "border-green-400" }
        ]
    },
    {
        id: "3",
        rank: 3,
        avatarUrl: "/avatar/user3.png",
        userid: "FXMaster",
        country: "AU",
        isVerified: true,
        subtitle: "SYDNEY SAGE",
        firm: "Prop Elite",
        profit: {
            current: 45680,
            target: 65000
        },
        badges: [
            { name: "Consistency King", icon: "👑", color: "border-yellow-400" }
        ]
    },
    {
        id: "4",
        rank: 4,
        avatarUrl: "/avatar/user4.png",
        userid: "CryptoKing",
        country: "CA",
        isVerified: true,
        subtitle: "TORONTO TITAN",
        firm: "Zen Prop",
        profit: {
            current: 42350,
            target: 60000
        },
        badges: [
            { name: "High Roller", icon: "💎", color: "border-purple-400" },
            { name: "Profit Streak", icon: "🔥", color: "border-orange-400" }
        ]
    },
    {
        id: "5",
        rank: 5,
        avatarUrl: "/avatar/user5.png",
        userid: "EuroTrader",
        country: "FR",
        isVerified: true,
        subtitle: "PARIS PRO",
        firm: "Apex One",
        profit: {
            current: 39870,
            target: 55000
        },
        badges: [
            { name: "Risk Averse", icon: "🛡️", color: "border-green-400" }
        ]
    },
    {
        id: "6",
        rank: 6,
        avatarUrl: "/avatar/user6.png",
        userid: "NinjaTrader",
        country: "JP",
        isVerified: true,
        subtitle: "TOKYO NINJA",
        firm: "DesertEdge",
        profit: {
            current: 37540,
            target: 50000
        },
        badges: [
            { name: "Sniper Entry", icon: "🎯", color: "border-blue-400" },
            { name: "Consistency King", icon: "👑", color: "border-yellow-400" }
        ]
    },
    {
        id: "7",
        rank: 7,
        avatarUrl: "/avatar/user7.png",
        userid: "DesertTrader",
        country: "SA",
        isVerified: true,
        subtitle: "DUBAI DYNAMO",
        firm: "Northern Trades",
        profit: {
            current: 35210,
            target: 48000
        },
        badges: [
            { name: "High Roller", icon: "💎", color: "border-purple-400" }
        ]
    },
    {
        id: "8",
        rank: 8,
        avatarUrl: "/avatar/user8.png",
        userid: "ItalyTrader",
        country: "IT",
        isVerified: true,
        subtitle: "ROME ROCKET",
        firm: "EuroProp",
        profit: {
            current: 32890,
            target: 45000
        },
        badges: [
            { name: "Top Gun", icon: "🏆", color: "border-orange-400" }
        ]
    },
    {
        id: "9",
        rank: 9,
        avatarUrl: "/avatar/user9.png",
        userid: "IndiaTrader",
        country: "IN",
        isVerified: true,
        subtitle: "MUMBAI MASTER",
        firm: "Rise Capital",
        profit: {
            current: 30560,
            target: 42000
        },
        badges: [
            { name: "Profit Streak", icon: "🔥", color: "border-orange-400" },
            { name: "Risk Averse", icon: "🛡️", color: "border-green-400" }
        ]
    },
    {
        id: "10",
        rank: 10,
        avatarUrl: "/avatar/user10.png",
        userid: "Kiwitrader",
        country: "NZ",
        isVerified: true,
        subtitle: "AUCKLAND ACE",
        firm: "Kiwi Traders",
        profit: {
            current: 28230,
            target: 40000
        },
        badges: [
            { name: "Consistency King", icon: "👑", color: "border-yellow-400" }
        ]
    }
]; 