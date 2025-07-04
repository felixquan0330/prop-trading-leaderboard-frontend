import { NextRequest, NextResponse } from 'next/server';

const FUNDEDX_API_URL = 'https://api.fundedx.com/dashboards/leaderboard/3?limit=10';
const BEARER_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleUlkIn0.eyJzZXNzaW9uIjp7ImlkIjoiNjIwZGYwMzItOTE1MS00ZGVmLTg0N2ItOTdjYmZkYjhlZDAxIiwiZW1haWwiOiJtaW5pYmVhcjk1NUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJGZWxpeCIsImxhc3ROYW1lIjoiUXVhbiIsInJvbGVzIjpbImN1c3RvbWVyIl19LCJzdWIiOiI2MjBkZjAzMi05MTUxLTRkZWYtODQ3Yi05N2NiZmRiOGVkMDEiLCJpc3MiOiJDSEFOR0VNRSIsInJlZmVycmFsQ29kZSI6IiIsImlhdCI6MTc1MTU1MTg0NywiZXhwIjoxNzUyMTU2NjQ3fQ.RpdEF10n6LNdaADv_2zINCnMF9v_lAcFdR_fjhSXKQi3DpZXdVbl0uOVgpUmtGqVYyqhCF-DADkwBcASRK8O2VSmcuf9VLAoDHbOgWtPXiYvYWbEwP3i1UrNfJVcsq4EBv_mry9YvJncfCizI-e-qoTPUsLt7oNv5-4X76yd1zMHcN2oI-3qwADl5mXrqshe122kA6nVi3STccytgUcrDhoI2CPrvCcgDSOEYRcGW5Q8a_i1P9cOsUmWMvksXvDAmnKfzMF96GhxrqOuN0LeJXjUbYc_IFAa8qPEjRhk2g2UGnnm0ra3TOwHu9wpyIfcsyUtDqzF4x1ZqMMyxrN3nKi25vk8BTHprzfcKoYfU5lyZ1Sx-aYHLD9bZt9jA7nIoaDYQK7eKJ6SKNFQ8qy4tYXuh-LQYQkYV91a6lYXGAKDMefF9Za4c5FzZ7wePUg2RbQENgVaL8RqksfyLnyx003S1f7k4_me8WwzgSXNsSQAqz4zSVUDzcpHXujph7HTP1o9clmaanHvcZyBBBAzwXRsTQeH3DgaAL4qb89Gzx0Nov7mBgxvgXEeTd8BhyS3yEIOnSDYQRGP_pYojIZn8jN5A6CES2wjeV32kliIK4sHHL8owkwl4ZxOp-POj04WC_OeZumYO4BzDzknik7mfTLEjjZZzAz7vpnt-ESr61I'
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(FUNDEDX_API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to match our frontend structure
    const transformedData = {
      global: data.data?.map((trader: any) => ({
        rank: trader.rank,
        username: trader.shortName,
        country: "Unknown", // FundedX API doesn't provide country info
        countryCode: "US", // Default to US since no country data
        pnl: `+$${trader.profit.toLocaleString()}`,
        profit: trader.profit,
        profitPercentage: trader.percReturn,
        deposit: trader.initialBalance,
        equity: trader.currentEquity,
        badges: generateBadges(trader.percReturn),
        verified: trader.rank <= 3, // Top 3 are verified
        daysTraded: trader.daysTraded,
        back: trader.back,
      })) || [],
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching FundedX leaderboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard data' },
      { status: 500 }
    );
  }
}

// Helper function to generate badges based on profit percentage
function generateBadges(profitPercentage: number): string[] {
  const badges: string[] = [];
  
  if (profitPercentage > 50) {
    badges.push('🔥 Profit Streak');
    badges.push('🏆 Top Gun');
  } else if (profitPercentage > 30) {
    badges.push('🔥 Profit Streak');
    badges.push('🎯 Sniper Entry');
  } else if (profitPercentage > 20) {
    badges.push('🔥 Profit Streak');
    badges.push('📝 Consistency King');
  } else if (profitPercentage > 10) {
    badges.push('📝 Consistency King');
  }
  
  return badges;
} 