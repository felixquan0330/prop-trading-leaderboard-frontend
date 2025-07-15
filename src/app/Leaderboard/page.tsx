"use client"
import React, { useState } from 'react';
import { Badge, Button, Switch, Table, TableHeader, TableBody, TableRow, Th, Td, Filter, Popular, Favourite, New, Global, Crown, Cross, Check } from '@/components';
import { US, FR, GB, JP, AU, SA, CA, IT, IN, NZ } from 'country-flag-icons/react/3x2';

export default function Leaderboard() {
    const [selected, setSelected] = useState<'global' | 'goat'>('global');
    const [activeTabs, setActiveTabs] = useState<string[]>([]);

    const tabs = [
        { id: 'popular', label: 'Popular', icon: Popular },
        { id: 'favourite', label: 'Favourite', icon: Favourite },
        { id: 'new', label: 'New', icon: New },
    ];

    const leaderboardData = [
        {
            username: "TradeMaster",
            country: "USA",
            firm: "FTMO",
            pnl: "+$45,230",
            badges: ["🏆 Top Gun", "🔥 Profit Streak"],
        },
        {
            username: "ParisTrader",
            country: "FRA",
            firm: "FundingPips",
            pnl: "+$42,150",
            badges: ["📝 Consistency King"],
        },
        {
            username: "LondonBull",
            country: "UK",
            firm: "MyFundedFX",
            pnl: "+$41,890",
            badges: ["💰 High Roller", "🔥 Profit Streak"],
        },
        {
            username: "TokyoTrader",
            country: "JAP",
            firm: "FTMO",
            pnl: "+$40,670",
            badges: ["🧊 Risk Averse"],
        },
        {
            username: "SydneyTrader",
            country: "AUS",
            firm: "FundingPips",
            pnl: "+$39,950",
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
        <div className="bg-[#050B16]">
            <div className="max-w-[1440px] w-full mx-auto px-20 pt-24 pb-16 flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <h6 className="text-white text-2xl font-bold text-center">Global Leaderboard</h6>
                        <p className="text-white text-center text-md font-medium opacity-70">
                            See how the world's top traders stack up across all supported prop firms.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                                <Button variant="outline" className="text-white opacity-70 bg-transparent rounded-full gap-1">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </Button>
                                <div className="h-10 w-px bg-[#3F3F3F]"></div>
                                {tabs.map((tab) => {
                                    const isActive = activeTabs.includes(tab.id);
                                    const Icon = tab.icon;

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                if (!isActive) setActiveTabs([...activeTabs, tab.id]);
                                            }}
                                            className={`inline-flex rounded-full p-[1px] transition-colors ${isActive
                                                ? 'bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]'
                                                : 'bg-transparent'}
                                        `}
                                        >
                                            <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${isActive
                                                ? 'bg-[#404040] text-white font-semibold'
                                                : 'bg-[#000000] border border-[#525252] text-white'}
                                        `}>
                                                <Icon className="w-4 h-4" />
                                                <span>{tab.label}</span>
                                                {isActive && (
                                                    <span
                                                        className="ml-2 cursor-pointer flex items-center"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setActiveTabs(activeTabs.filter(id => id !== tab.id));
                                                        }}
                                                    >
                                                        <Cross className="w-3 h-3" />
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <div>
                                <Switch>
                                    <Button
                                        variant="switch"
                                        onClick={() => {
                                            handleSwitch('global')
                                        }}
                                    >
                                        <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${selected === 'global'
                                            ? 'bg-[#404040] text-white'
                                            : 'bg-transparent text-white border-none'}
                                        `}>
                                            <Global className="w-4 h-4" />
                                            <span>Global</span>
                                        </div>
                                    </Button>
                                    <Button
                                        variant="switch"
                                        onClick={() => {
                                            handleSwitch('goat')
                                        }}
                                    >
                                        <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${selected === 'goat'
                                            ? 'bg-[#404040] text-white'
                                            : 'bg-transparent text-white border-none'}
                                        `}>
                                            <Crown className="w-4 h-4" />
                                            <span>GOAT Club</span>
                                        </div>
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
                                                <img
                                                    src="/user-default-dark.png"
                                                    alt="top-trader"
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                <span className="font-semibold">{trader.username}</span>
                                                {index === 0 && <Check className="w-4 h-4" />}
                                            </div>
                                        </Td>
                                        <Td>
                                            <div className="flex items-center justify-center gap-2">
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
                                                <span className="text-white opacity-70">{trader.country}</span>
                                            </div>
                                        </Td>
                                        <Td><span className="text-white opacity-70">{trader.firm}</span></Td>
                                        <Td className="flex justify-center">
                                            <div className="bg-[#275130] border-none rounded-md px-2 py-1 text-sm w-fit">{trader.pnl}</div>
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
        </div>

    )
}