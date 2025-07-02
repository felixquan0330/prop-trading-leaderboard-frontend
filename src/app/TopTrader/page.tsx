"use client"
import { useState } from 'react'
import { Button, Switch, Badge } from '@/components'
import { List, Grid, Discount, Check } from '@/components'
import { Table, TableHeader, TableBody, TableRow, Th, Td } from '@/components'

export default function TopTrader() {

    const [selected, setSelected] = useState<'global' | 'goat'>('global')
    const FTMOTraders = [
        {
            username: "PipHunterX",
            country: "🇺🇸 USA",
            pnl: "+$52,340",
            badges: ["🔥 Profit Streak", "🏆 Top Gun"],
        },
        {
            username: "SniperWolfFX",
            country: "🇬🇧 UK",
            pnl: "+$48,900",
            badges: ["🎯 Sniper Entry", "🔥 Profit Streak"],
        },
        {
            username: "ChartSurfer",
            country: "🇫🇷 FRA",
            pnl: "+$45,120",
            badges: ["🔥 Profit Streak", "📝 Consistency King"],
        },
    ];

    const myFundedFXTraders = [
        {
            username: "PipHunterX",
            country: "🇺🇸 USA",
            pnl: "+$52,340",
            badges: ["🔥 Profit Streak", "🏆 Top Gun"],
        },
        {
            username: "SniperWolfFX",
            country: "🇬🇧 UK",
            pnl: "+$48,900",
            badges: ["🎯 Sniper Entry", "🔥 Profit Streak"],
        },
        {
            username: "ChartSurfer",
            country: "🇫🇷 FRA",
            pnl: "+$45,120",
            badges: ["🔥 Profit Streak", "📝 Consistency King"],
        },
    ];

    const e8FundingTraders = [
        {
            username: "PipHunterX",
            country: "🇺🇸 USA",
            pnl: "+$52,340",
            badges: ["🔥 Profit Streak", "🏆 Top Gun"],
        },
        {
            username: "SniperWolfFX",
            country: "🇬🇧 UK",
            pnl: "+$48,900",
            badges: ["🎯 Sniper Entry", "🔥 Profit Streak"],
        },
        {
            username: "ChartSurfer",
            country: "🇫🇷 FRA",
            pnl: "+$45,120",
            badges: ["🔥 Profit Streak", "📝 Consistency King"],
        },
    ];

    const apexOneTraders = [
        {
            username: "PipHunterX",
            country: "🇺🇸 USA",
            pnl: "+$52,340",
            badges: ["🔥 Profit Streak", "🏆 Top Gun"],
        },
        {
            username: "SniperWolfFX",
            country: "🇬🇧 UK",
            pnl: "+$48,900",
            badges: ["🎯 Sniper Entry", "🔥 Profit Streak"],
        },
        {
            username: "ChartSurfer",
            country: "🇫🇷 FRA",
            pnl: "+$45,120",
            badges: ["🔥 Profit Streak", "📝 Consistency King"],
        },
    ];

    const maverickTraders = [
        {
            username: "PipHunterX",
            country: "🇺🇸 USA",
            pnl: "+$52,340",
            badges: ["🔥 Profit Streak", "🏆 Top Gun"],
        },
        {
            username: "SniperWolfFX",
            country: "🇬🇧 UK",
            pnl: "+$48,900",
            badges: ["🎯 Sniper Entry", "🔥 Profit Streak"],
        },
        {
            username: "ChartSurfer",
            country: "🇫🇷 FRA",
            pnl: "+$45,120",
            badges: ["🔥 Profit Streak", "📝 Consistency King"],
        },
    ];

    const handleSwitch = (value: 'global' | 'goat') => {
        setSelected(value)
    }

    return (
        <div className="px-20 pt-24 pb-16 flex flex-col gap-6">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <h6 className="text-[#16191d] text-2xl font-bold text-center">Top Traders by Firm</h6>
                    <p className="text-[#434a56] text-center text-sm font-medium">
                        See who’s leading the pack at each prop firm this week.
                    </p>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-end items-center">
                        <div>
                            <Switch>
                                <Button
                                    className={`${selected === 'global' ? 'text-[#181A1C] shadow bg-white' : 'text-[#7B849B]'}`}
                                    onClick={() => handleSwitch('global')}
                                    size="sm"
                                    variant="switch"
                                >
                                    <List className="w-4 h-4" />
                                    List
                                </Button>
                                <Button
                                    className={`${selected === 'goat' ? 'text-[#181A1C] shadow bg-white' : 'text-[#7B849B]'}`}
                                    onClick={() => handleSwitch('goat')}
                                    size="sm"
                                    variant="switch"
                                >
                                    <Grid className="w-4 h-4" />
                                    Grid
                                </Button>
                            </Switch>
                        </div>
                    </div>
                    <div className='flex flex-col gap-12'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-[#16191d] font-semibold'>FTMO</span>
                                    <Button variant='outline' size='sm' className='text-[#434a56] bg-transparent rounded-full gap-1'>
                                        <Discount className="w-4 h-4" />
                                        Discount Offer
                                    </Button>
                                </div>
                                <div>
                                    <span className='text-[#434a56] text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th>RANK</Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {FTMOTraders.map((trader, index) => (
                                            <TableRow key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    <div className="flex items-center gap-2">
                                                        <img src="/user-default.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                                        <span className="font-semibold">{trader.username}</span>
                                                        {index === 0 && <Check className="w-4 h-4" />}
                                                    </div>
                                                </Td>
                                                <Td>{trader.country}</Td>
                                                <Td>
                                                    <span className="font-semibold">{trader.pnl}</span>
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
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-[#16191d] font-semibold'>MyFundedFX</span>
                                </div>
                                <div>
                                    <span className='text-[#434a56] text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th>RANK</Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {myFundedFXTraders.map((trader, index) => (
                                            <TableRow key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    <div className="flex items-center gap-2">
                                                        <img src="/user-default.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                                        <span className="font-semibold">{trader.username}</span>
                                                        {index === 0 && <Check className="w-4 h-4" />}
                                                    </div>
                                                </Td>
                                                <Td>{trader.country}</Td>
                                                <Td>
                                                    <span className="font-semibold">{trader.pnl}</span>
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
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-[#16191d] font-semibold'>E8 Funding</span>
                                </div>
                                <div>
                                    <span className='text-[#434a56] text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th>RANK</Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {e8FundingTraders.map((trader, index) => (
                                            <TableRow key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    <div className="flex items-center gap-2">
                                                        <img src="/user-default.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                                        <span className="font-semibold">{trader.username}</span>
                                                        {index === 0 && <Check className="w-4 h-4" />}
                                                    </div>
                                                </Td>
                                                <Td>{trader.country}</Td>
                                                <Td>
                                                    <span className="font-semibold">{trader.pnl}</span>
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
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-[#16191d] font-semibold'>Apex One</span>
                                </div>
                                <div>
                                    <span className='text-[#434a56] text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th>RANK</Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {apexOneTraders.map((trader, index) => (
                                            <TableRow key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    <div className="flex items-center gap-2">
                                                        <img src="/user-default.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                                        <span className="font-semibold">{trader.username}</span>
                                                        {index === 0 && <Check className="w-4 h-4" />}
                                                    </div>
                                                </Td>
                                                <Td>{trader.country}</Td>
                                                <Td>
                                                    <span className="font-semibold">{trader.pnl}</span>
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
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-[#16191d] font-semibold'>Maverick Traders</span>
                                </div>
                                <div>
                                    <span className='text-[#434a56] text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th>RANK</Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {maverickTraders.map((trader, index) => (
                                            <TableRow key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    <div className="flex items-center gap-2">
                                                        <img src="/user-default.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                                        <span className="font-semibold">{trader.username}</span>
                                                        {index === 0 && <Check className="w-4 h-4" />}
                                                    </div>
                                                </Td>
                                                <Td>{trader.country}</Td>
                                                <Td>
                                                    <span className="font-semibold">{trader.pnl}</span>
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
            </div>
        </div>
    )
}