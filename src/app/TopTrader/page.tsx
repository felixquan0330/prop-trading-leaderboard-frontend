"use client"
import { useState, useEffect } from 'react';
import { Switch, List, Grid } from '@/components';
import { getApiUrl } from '@/lib/config';
import { TopTraderTable } from '@/app/TopTrader/TopTraderTable';

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

                const [ftmoResponse, fundedxResponse, fundingpipsResponse, breakoutpropResponse] = await Promise.all([
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
                    fetch(
                        getApiUrl('/funding-pips/leaderboard'),
                        {
                            headers: { 'Content-Type': 'application/json' },
                            // DO NOT use this in production
                            mode: 'cors'
                        }
                    ),
                    fetch(
                        getApiUrl('/breakoutprop/leaderboard'),
                        {
                            headers: { 'Content-Type': 'application/json' },
                            // DO NOT use this in production
                            mode: 'cors'
                        }
                    ),
                ]);

                const [ftmoData, fundedxData, fundingpipsData, breakoutpropData] = await Promise.all([
                    ftmoResponse.json(),
                    fundedxResponse.json(),
                    fundingpipsResponse.json(),
                    breakoutpropResponse.json()
                ]);

                setFtmoData(ftmoData);
                setFundedxData(fundedxData);
                setFundingpipsData(fundingpipsData);
                setBreakoutpropData(breakoutpropData);
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
                        <TopTraderTable
                            firmName="FTMO"
                            data={sortDataByProfit(ftmoData, ftmoSort)}
                            loading={loading}
                            error={error}
                            sortDirection={ftmoSort}
                            onSort={handleFtmoSort}
                            targetProfit={150000}
                            loadingLabel="Loading FTMO data..."
                        />
                        <TopTraderTable
                            firmName="FundedX"
                            data={sortDataByProfit(fundedxData, fundedxSort)}
                            loading={loading}
                            error={error}
                            sortDirection={fundedxSort}
                            onSort={handleFundedxSort}
                            targetProfit={10000}
                            loadingLabel="Loading FundedX data..."
                        />
                        <TopTraderTable
                            firmName="FundingPips"
                            data={sortDataByProfit(fundingpipsData, fundingpipsSort)}
                            loading={loading}
                            error={error}
                            sortDirection={fundingpipsSort}
                            onSort={handleFundingpipsSort}
                            targetProfit={50000}
                            loadingLabel="Loading FundingPips data..."
                        />
                        <TopTraderTable
                            firmName="Breakoutprop"
                            data={sortDataByProfit(breakoutpropData, breakoutpropSort)}
                            loading={loading}
                            error={error}
                            sortDirection={breakoutpropSort}
                            onSort={handleBreakoutpropSort}
                            targetProfit={150000}
                            loadingLabel="Loading Breakoutprop One data..."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}