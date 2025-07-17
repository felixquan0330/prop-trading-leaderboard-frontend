"use client"
import { useState, useEffect } from 'react';
import { Badge, Switch, List, Grid } from '@/components';
import { Table, TableHeader, TableBody, TableRow, Th, Td } from '@/components';
import { Discount, Check, SortUp, SortDown } from '@/components';
import { getCountryFlag } from '@/lib/countryFlags';
import { getApiUrl } from '@/lib/config';

export default function TopTrader() {
    const [selected, setSelected] = useState<'list' | 'grid'>('list');
    const [ftmoData, setFtmoData] = useState<any>(null);
    const [fundedxData, setFundedxData] = useState<any>(null);
    const [fundingpipsData, setFundingpipsData] = useState<any>(null);
    const [breakoutpropData, setBreakoutpropData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sorting states for each firm
    const [ftmoSort, setFtmoSort] = useState<'asc' | 'desc'>('desc');
    const [fundedxSort, setFundedxSort] = useState<'asc' | 'desc'>('desc');
    const [fundingpipsSort, setFundingpipsSort] = useState<'asc' | 'desc'>('desc');
    const [breakoutpropSort, setBreakoutpropSort] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [ftmoResponse, fundedxResponse] = await Promise.all([
                    fetch(
                        getApiUrl('/ftmo/leaderboard'),
                        {
                            headers: { 'Content-Type': 'application/json' },
                            // DO NOT use this in production
                            mode: 'cors'
                        }
                    ),
                    fetch(
                        getApiUrl('/funded-x/leaderboard'),
                        {
                            headers: { 'Content-Type': 'application/json' },
                            // DO NOT use this in production
                            mode: 'cors'
                        }
                    ),
                    // fetch(
                    //     getApiUrl('/funding-pips/leaderboard'),
                    //     {
                    //         headers: { 'Content-Type': 'application/json' },
                    //         // DO NOT use this in production
                    //         mode: 'cors'
                    //     }
                    // ),
                    // fetch(
                    //     getApiUrl('/breakoutprop/leaderboard'),
                    //     {
                    //         headers: { 'Content-Type': 'application/json' },
                    //         // DO NOT use this in production
                    //         mode: 'cors'
                    //     }
                    // ),
                ]);

                const [ftmoData, fundedxData] = await Promise.all([
                    ftmoResponse.json(),
                    fundedxResponse.json(),
                    // fundingpipsResponse.json(),
                    // breakoutpropResponse.json()
                ]);

                setFtmoData(ftmoData);
                setFundedxData(fundedxData);
                // setFundingpipsData(fundingpipsData);
                // setBreakoutpropData(breakoutpropData);
            } catch (err) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, [])



    const handleSwitch = (value: 'list' | 'grid') => {
        setSelected(value)
    }

    // Sorting functions for each firm
    const handleFtmoSort = () => {
        setFtmoSort(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    const handleFundedxSort = () => {
        setFundedxSort(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    const handleFundingpipsSort = () => {
        setFundingpipsSort(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    const handleBreakoutpropSort = () => {
        setBreakoutpropSort(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    // Helper function to sort data by profit
    const sortDataByProfit = (data: any[], sortDirection: 'asc' | 'desc') => {
        if (!data) return [];
        return [...data].sort((a, b) => {
            const profitA = typeof a.profit === 'string' ? parseFloat(a.profit.replace(/[$,]/g, '')) : a.profit;
            const profitB = typeof b.profit === 'string' ? parseFloat(b.profit.replace(/[$,]/g, '')) : b.profit;
            return sortDirection === 'desc' ? profitB - profitA : profitA - profitB;
        }).map((trader, index) => ({
            ...trader,
            rank: index + 1,
            verified: index < 3
        }));
    };

    return (
        <div className="max-w-[1440px] w-full mx-auto px-20 pt-24 pb-16 flex flex-col gap-6">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <h6 className="text-white text-2xl font-bold text-center">Top Traders by Firm</h6>
                    <p className="text-white opacity-70 text-center text-md font-medium">
                        See who's leading the pack at each prop firm this week.
                    </p>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-end items-center">
                        <div>
                            <Switch>
                                <button
                                    onClick={() => {
                                        handleSwitch('list')
                                    }}
                                    className={`inline-flex rounded-full p-[1px] transition-colors ${selected === 'list'
                                        ? 'bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]'
                                        : 'bg-transparent'}
                                        `}
                                >
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${selected === 'list'
                                        ? 'bg-[#404040] text-white'
                                        : 'bg-transparent text-white border-none'}
                                        `}>
                                        <List className="w-4 h-4" />
                                        <span>List</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        handleSwitch('grid')
                                    }}
                                    className={`inline-flex rounded-full p-[1px] transition-colors ${selected === 'grid'
                                        ? 'bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]'
                                        : 'bg-transparent'}
                                        `}
                                >
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${selected === 'grid'
                                        ? 'bg-[#404040] text-white'
                                        : 'bg-transparent text-white border-none'}
                                        `}>
                                        <Grid className="w-4 h-4" />
                                        <span>Grid</span>
                                    </div>
                                </button>
                            </Switch>
                        </div>
                    </div>
                    <div className='flex flex-col gap-12'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-white font-semibold'>FTMO</span>
                                    <div className="
                                        p-[1px] rounded-full
                                        border-none
                                        bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]
                                    ">
                                        <button className="
                                            flex flex-row items-center gap-1 px-2 py-1 rounded-full
                                            bg-[#282828] text-white hover:bg-[#3F3F3F] transition text-sm w-full
                                            border-none
                                        ">
                                            <Discount className="w-4 h-4" />
                                            Discount Offer
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className='text-white text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th
                                            className="flex items-center justify-center gap-2 hover:cursor-pointer"
                                            onClick={handleFtmoSort}
                                        >
                                            RANK {ftmoSort === 'desc' ? <SortUp className="w-4 h-4" /> : <SortDown className="w-4 h-4" />}
                                        </Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <Td className="text-center py-8">
                                                    <div className="flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                        <span className="ml-2">Loading FTMO data...</span>
                                                    </div>
                                                </Td>
                                            </TableRow>
                                        ) : error ? (
                                            <TableRow>
                                                <Td className="text-center py-8 text-red-500">
                                                    Error: {error}
                                                </Td>
                                            </TableRow>
                                        ) : sortDataByProfit(ftmoData, ftmoSort)?.map((trader: any, index: number) => {
                                            const FlagComponent = getCountryFlag(trader.country)
                                            return (
                                                <TableRow key={index}>
                                                    <Td>{trader.rank}</Td>
                                                    <Td>
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/avatar/user-default-dark.png"
                                                                alt="top-trader"
                                                                className="w-6 h-6 rounded-full"
                                                            />
                                                            <span className="font-semibold">{trader.username}</span>
                                                            {trader.verified && <Check className="w-4 h-4" />}
                                                        </div>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex items-center justify-center gap-2">
                                                            {FlagComponent && <FlagComponent title={trader.country} className="w-4 h-4" />}
                                                            <span className="text-white opacity-70">{trader.country}</span>
                                                        </div>
                                                    </Td>
                                                    <Td className="flex justify-center">
                                                        <div className="bg-[#275130] border-none rounded-md px-2 py-1 text-sm w-fit">{trader.pnl || `+$${trader.profit?.toLocaleString() || 0}`}</div>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            <Badge>🔥 Profit Streak</Badge>
                                                            <Badge>🏆 Top Gun</Badge>
                                                        </div>
                                                    </Td>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-white font-semibold'>FundedX</span>
                                    <div className="
                                        p-[1px] rounded-full
                                        border-none
                                        bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]
                                    ">
                                        <button className="
                                            flex flex-row items-center gap-1 px-2 py-1 rounded-full
                                            bg-[#282828] text-white hover:bg-[#3F3F3F] transition text-sm w-full
                                            border-none
                                        ">
                                            <Discount className="w-4 h-4" />
                                            Discount Offer
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className='text-white text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th
                                            className="flex items-center justify-center gap-2 hover:cursor-pointer"
                                            onClick={handleFundedxSort}
                                        >
                                            RANK {fundedxSort === 'desc' ? <SortUp className="w-4 h-4" /> : <SortDown className="w-4 h-4" />}
                                        </Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <Td className="text-center py-8">
                                                    <div className="flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                        <span className="ml-2">Loading FundedX data...</span>
                                                    </div>
                                                </Td>
                                            </TableRow>
                                        ) : error ? (
                                            <TableRow>
                                                <Td className="text-center py-8 text-red-500">
                                                    Error: {error}
                                                </Td>
                                            </TableRow>
                                        ) : sortDataByProfit(fundedxData, fundedxSort)?.map((trader: any, index: number) => {
                                            const FlagComponent = getCountryFlag(trader.country)
                                            return (
                                                <TableRow key={index}>
                                                    <Td>{trader.rank}</Td>
                                                    <Td>
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/avatar/user-default-dark.png"
                                                                alt="top-trader"
                                                                className="w-6 h-6 rounded-full"
                                                            />
                                                            <span className="font-semibold">{trader.username}</span>
                                                            {trader.verified && <Check className="w-4 h-4" />}
                                                        </div>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex items-center justify-center gap-2">
                                                            {FlagComponent && <FlagComponent title={trader.country} className="w-4 h-4" />}
                                                            <span className="text-white opacity-70">{trader.country}</span>
                                                        </div>
                                                    </Td>
                                                    <Td className="flex justify-center">
                                                        <div className="bg-[#275130] border-none rounded-md px-2 py-1 text-sm w-fit">{trader.pnl || `+$${trader.profit?.toLocaleString() || 0}`}</div>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            <Badge>🔥 Profit Streak</Badge>
                                                            <Badge>🏆 Top Gun</Badge>
                                                        </div>
                                                    </Td>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        {/*<div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-white font-semibold'>FundingPips</span>
                                    <div className="
                                        p-[1px] rounded-full
                                        border-none
                                        bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]
                                    ">
                                        <button className="
                                            flex flex-row items-center gap-1 px-2 py-1 rounded-full
                                            bg-[#282828] text-white hover:bg-[#3F3F3F] transition text-sm w-full
                                            border-none
                                        ">
                                            <Discount className="w-4 h-4" />
                                            Discount Offer
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className='text-white text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th
                                            className="flex items-center justify-center gap-2 hover:cursor-pointer"
                                            onClick={handleFundingpipsSort}
                                        >
                                            RANK {fundingpipsSort === 'desc' ? <SortUp className="w-4 h-4" /> : <SortDown className="w-4 h-4" />}
                                        </Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <Td className="text-center py-8">
                                                    <div className="flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                        <span className="ml-2">Loading FundingPips data...</span>
                                                    </div>
                                                </Td>
                                            </TableRow>
                                        ) : error ? (
                                            <TableRow>
                                                <Td className="text-center py-8 text-red-500">
                                                    Error: {error}
                                                </Td>
                                            </TableRow>
                                        ) : sortDataByProfit(fundingpipsData, fundingpipsSort)?.map((trader: any, index: number) => {
                                            const FlagComponent = getCountryFlag(trader.countryCode)
                                            return (
                                                <TableRow key={index}>
                                                    <Td>{trader.rank}</Td>
                                                    <Td>
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/user-default-dark.png"
                                                                alt="top-trader"
                                                                className="w-6 h-6 rounded-full"
                                                            />
                                                            <span className="font-semibold">{trader.username}</span>
                                                            {trader.verified && <Check className="w-4 h-4" />}
                                                        </div>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex items-center justify-center gap-2">
                                                            {FlagComponent && <FlagComponent title={trader.country} className="w-4 h-4" />}
                                                            <span className="text-white opacity-70">{trader.country}</span>
                                                        </div>
                                                    </Td>
                                                    <Td className="flex justify-center">
                                                        <div className="bg-[#275130] border-none rounded-md px-2 py-1 text-sm w-fit">{trader.pnl || `+$${trader.profit?.toLocaleString() || 0}`}</div>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            {trader.badges.map((badge: string, i: number) => (
                                                                <Badge key={i}>{badge}</Badge>
                                                            ))}
                                                        </div>
                                                    </Td>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
                                    <span className='text-white font-semibold'>Breakoutprop</span>
                                    <div className="
                                        p-[1px] rounded-full
                                        border-none
                                        bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4]
                                    ">
                                        <button className="
                                            flex flex-row items-center gap-1 px-2 py-1 rounded-full
                                            bg-[#282828] text-white hover:bg-[#3F3F3F] transition text-sm w-full
                                            border-none
                                        ">
                                            <Discount className="w-4 h-4" />
                                            Discount Offer
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className='text-white text-sm font-semibold'>View Full Leaderboard</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <Table>
                                    <TableHeader >
                                        <Th
                                            className="flex items-center justify-center gap-2 hover:cursor-pointer"
                                            onClick={handleBreakoutpropSort}
                                        >
                                            RANK {breakoutpropSort === 'desc' ? <SortUp className="w-4 h-4" /> : <SortDown className="w-4 h-4" />}
                                        </Th>
                                        <Th>USERNAME</Th>
                                        <Th>COUNTRY</Th>
                                        <Th>PROFIT</Th>
                                        <Th>BADGES</Th>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <Td className="text-center py-8">
                                                    <div className="flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                        <span className="ml-2">Loading Breakoutprop One data...</span>
                                                    </div>
                                                </Td>
                                            </TableRow>
                                        ) : error ? (
                                            <TableRow>
                                                <Td className="text-center py-8 text-red-500">
                                                    Error: {error}
                                                </Td>
                                            </TableRow>
                                        ) : sortDataByProfit(breakoutpropData, breakoutpropSort)?.map((trader: any, index: number) => {
                                            const FlagComponent = getCountryFlag(trader.countryCode)
                                            return (
                                                <TableRow key={index}>
                                                    <Td>{trader.rank}</Td>
                                                    <Td>
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src="/avatar/user-default-dark.png"
                                                                alt="top-trader"
                                                                className="w-6 h-6 rounded-full"
                                                            />
                                                            <span className="font-semibold">{trader.username}</span>
                                                            {trader.verified && <Check className="w-4 h-4" />}
                                                        </div>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex items-center justify-center gap-2">
                                                            {FlagComponent && <FlagComponent title={trader.country} className="w-4 h-4" />}
                                                            <span className="text-white opacity-70">{trader.country}</span>
                                                        </div>
                                                    </Td>
                                                    <Td className="flex justify-center">
                                                        <div className="bg-[#275130] border-none rounded-md px-2 py-1 text-sm w-fit">{trader.pnl || `+$${trader.profit?.toLocaleString() || 0}`}</div>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            {trader.badges.map((badge: string, i: number) => (
                                                                <Badge key={i}>{badge}</Badge>
                                                            ))}
                                                        </div>
                                                    </Td>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}