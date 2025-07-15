"use client"
import React, { useState } from 'react';
import { LeaderboardCard } from './card/LeaderboardCard';
import { Badge, Button, Switch, Table, TableHeader, TableBody, TableRow, Th, Td, Filter, Popular, Favourite, New, Global, Crown, Cross, Check } from '@/components';
import { leaderboardData } from '@/data/leaderboardData';

export default function Leaderboard() {
    const [selected, setSelected] = useState<'global' | 'goat'>('global');
    const [activeTabs, setActiveTabs] = useState<string[]>([]);

    const tabs = [
        { id: 'popular', label: 'Popular', icon: Popular },
        { id: 'favourite', label: 'Favourite', icon: Favourite },
        { id: 'new', label: 'New', icon: New },
    ];

    const handleSwitch = (value: 'global' | 'goat') => {
        setSelected(value)
    }

    return (
        <div className="bg-[#050B16]">
            <div className="max-w-[1440px] w-full mx-auto px-20 pt-10 pb-16 flex flex-col gap-6">
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
                                <Button variant="outline" className="text-white bg-white/20 rounded-full gap-1">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </Button>
                                <div className="h-10 w-[2px] bg-white/20"></div>
                                {tabs.map((tab) => {
                                    const isActive = activeTabs.includes(tab.id);
                                    const Icon = tab.icon;

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                if (!isActive) setActiveTabs([...activeTabs, tab.id]);
                                            }}
                                            className={`flex items-center gap-2 rounded-full px-3 py-2 transition-colors ${isActive
                                                ? 'bg-transparent border border-white'
                                                : 'bg-white/20'}
                                        `}
                                        >
                                            <Icon className="w-4 h-4" isActive={isActive} />
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

                        <div className="flex text-white/75 text-sm px-6">
                            <span className='w-[50px] text-center'>Rank</span>
                            <span className='w-[300px] text-center'>Trader</span>
                            <span className='w-[200px] text-center'>Firm</span>
                            <span className='w-[300px] text-center'>Profit</span>
                            <span className='w-[300px] text-center'>Badges</span>
                        </div>
                        {
                            leaderboardData.map((data, index) => (
                                <LeaderboardCard
                                    key={index}
                                    rank={index + 1}
                                    avatarUrl={data.avatarUrl}
                                    userid={data.userid}
                                    country={data.country}
                                    firmname={data.firm}
                                    isVerified={data.isVerified}
                                    currentProfit={data.profit.current}
                                    targetProfit={data.profit.target}
                                    subtitle={data.subtitle}
                                    badges={data.badges}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}