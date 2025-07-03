"use client"
import { useState } from 'react'
import { Button, Switch, Filter, Badge } from '@/components'
import { Popular, Favourite, New, Global, Crown, Check } from '@/components'
import { Table, TableHeader, TableBody, TableRow, Th, Td } from '@/components'
import { US, FR, GB, JP, AU, SA, CA, IT, IN, NZ } from 'country-flag-icons/react/3x2'

export default function Leaderboard() {

    const [selected, setSelected] = useState<'global' | 'goat'>('global')
    const leaderboardData = [
        {
            username: "PipHunterX",
            country: "USA",
            firm: "Alpha Prop Firm",
            pnl: "+$52,340",
            badges: ["🔥 Profit Streak", "🏆 Top Gun"],
        },
        {
            username: "SniperWolfFX",
            country: "UK",
            firm: "Titan Trades",
            pnl: "+$48,900",
            badges: ["🎯 Sniper Entry", "🔥 Profit Streak"],
        },
        {
            username: "ChartSurfer",
            country: "FRA",
            firm: "PropElite",
            pnl: "+$45,120",
            badges: ["🔥 Profit Streak", "📝 Consistency King"],
        },
        {
            username: "TokyoDriftFX",
            country: "JAP",
            firm: "Zen Prop",
            pnl: "+$43,750",
            badges: ["🎯 Sniper Entry", "🧊 Risk Averse"],
        },
        {
            username: "BullishBeast",
            country: "AUS",
            firm: "Apex One",
            pnl: "+$41,200",
            badges: ["📝 Consistency King", "🔥 Profit Streak"],
        },
        {
            username: "DuneTrader",
            country: "KSA",
            firm: "DesertEdge",
            pnl: "+$39,810",
            badges: ["🔥 Profit Streak"],
        },
        {
            username: "NorthernPips",
            country: "CAN",
            firm: "Northern Trades",
            pnl: "+$38,450",
            badges: ["🧊 Risk Averse"],
        },
        {
            username: "RomanBull",
            country: "ITA",
            firm: "EuroProp",
            pnl: "+$37,890",
            badges: ["💰 High Roller", "🔥 Profit Streak"],
        },
        {
            username: "CandlestickGOD",
            country: "IND",
            firm: "Rise Capital",
            pnl: "+$36,520",
            badges: ["📝 Consistency King"],
        },
        {
            username: "KiwiMomentum",
            country: "NZ",
            firm: "Kiwi Traders",
            pnl: "+$35,940",
            badges: ["🏆 Top Gun"],
        },
    ];

    const handleSwitch = (value: 'global' | 'goat') => {
        setSelected(value)
    }

    return (
        <div className="px-20 pt-24 pb-16 flex flex-col gap-6">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <h6 className="text-[#16191d] dark:text-white text-2xl font-bold text-center">Global Leaderboard</h6>
                    <p className="text-[#434a56] dark:text-white text-center text-sm font-medium opacity-70">
                        See how the world’s top traders stack up across all supported prop firms.
                    </p>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <Button variant="outline" className="text-[#434a56] dark:text-white opacity-70 bg-transparent rounded-full gap-1">
                                <Filter className="w-4 h-4" />
                                Filter
                            </Button>
                            <div className="h-10 w-px bg-[#CCD0D7]"></div>
                            <Button variant="outline" className="text-[#434a56] dark:text-white opacity-70 bg-transparent rounded-full gap-1">
                                <Popular className="w-4 h-4" />
                                Popular
                            </Button>
                            <Button variant="outline" className="text-[#434a56] dark:text-white opacity-70 bg-transparent rounded-full gap-1">
                                <Favourite className="w-4 h-4" />Favourites
                            </Button>
                            <Button variant="outline" className="text-[#434a56] dark:text-white opacity-70 bg-transparent rounded-full gap-1">
                                <New className="w-4 h-4" />
                                New
                            </Button>
                        </div>
                        <div>
                            <Switch>
                                <Button
                                    className={`${selected === 'global' ? 'text-[#181A1C] shadow bg-white dark:bg-[#282828] dark:text-white' : 'text-[#7B849B] dark:text-white opacity-70'}`}
                                    onClick={() => handleSwitch('global')}
                                    variant="switch"
                                >
                                    <Global className="w-4 h-4" />
                                    Global
                                </Button>
                                <Button
                                    className={`${selected === 'goat' ? 'text-[#181A1C] shadow bg-white dark:bg-[#282828] dark:text-white' : 'text-[#7B849B] dark:text-white opacity-70'}`}
                                    onClick={() => handleSwitch('goat')}
                                    variant="switch"
                                >
                                    <Crown className="w-4 h-4" />
                                    GOAT Club
                                </Button>
                            </Switch>
                        </div>
                    </div>
                    <Table>
                        <TableHeader >
                            <Th>RANK</Th>
                            <Th>USERNAME</Th>
                            <Th>COUNTRY</Th>
                            <Th>FIRM</Th>
                            <Th>PROFIT</Th>
                            <Th>BADGES</Th>
                        </TableHeader>
                        <TableBody>
                            {leaderboardData.map((trader, index) => (
                                <TableRow key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>
                                        <div className="flex items-center gap-2">
                                            <img src="/user-default.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                            <span className="font-semibold">{trader.username}</span>
                                            {index === 0 && <Check className="w-4 h-4" />}
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex items-center gap-2">
                                            {trader.country === "USA" && <US title="United States" className="w-4 h-4" />}
                                            {trader.country === "FRA" && <FR title="France" className="w-4 h-4" />}
                                            {trader.country === "UK" && <GB title="United Kingdom" className="w-4 h-4" />}
                                            {trader.country === "JAP" && <JP title="Japan" className="w-4 h-4" />}
                                            {trader.country === "AUS" && <AU title="Australia" className="w-4 h-4" />}
                                            {trader.country === "KSA" && <SA title="Saudi Arabia" className="w-4 h-4" />}
                                            {trader.country === "CAN" && <CA title="Canada" className="w-4 h-4" />}
                                            {trader.country === "ITA" && <IT title="Italy" className="w-4 h-4" />}
                                            {trader.country === "IND" && <IN title="India" className="w-4 h-4" />}
                                            {trader.country === "NZ" && <NZ title="New Zealand" className="w-4 h-4" />}
                                            <span className="text-[#434A56] dark:text-white opacity-70">{trader.country}</span>
                                        </div>
                                    </Td>
                                    <Td><span className="text-[#434A56] dark:text-white opacity-70">{trader.firm}</span></Td>
                                    <Td>
                                        <div className="bg-[#F6F7F8] dark:bg-[#121212] border border-[#E2E5E9] dark:border-[#3F3F3F] rounded-md p-1">{trader.pnl}</div>
                                    </Td>
                                    <Td>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {trader.badges.map((badge, i) => (
                                                <Badge key={i}>{badge}</Badge>
                                            ))}
                                        </div>
                                    </Td>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}