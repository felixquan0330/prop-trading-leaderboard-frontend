import { NextRequest, NextResponse } from 'next/server';

const FTMO_API_URL = 'https://gw2.ftmo.com/tapi/stats/leaderboard';
const BEARER_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzSC03TGJsaThmRktCc0IyTEd5MDFXS1FsZ0xBXzR1bVJYdWhWdEZvVVlBIn0.eyJleHAiOjE3NTE1NDk3MzIsImlhdCI6MTc1MTU0OTQzMiwiYXV0aF90aW1lIjoxNzUxNTQzMzQxLCJqdGkiOiI3YmYwNTg0ZC04NjVmLTQxNDYtODJmNS0yN2QzYTBmZDVlOWIiLCJpc3MiOiJodHRwczovL3Nzby5mdG1vLmNvbS9hdXRoL3JlYWxtcy9GVE1PLUdsb2JhbCIsImF1ZCI6WyJmdG1vLXRyYWRlciIsImFjY291bnQiXSwic3ViIjoiY2ExYTE0NmMtN2EzYi00NWI4LWEzZGItNDczNTNmNGJlZjQzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnRtby10cmFkZXIiLCJzaWQiOiI0ZDVmMmQyOS1lYTZjLTQwM2ItODkwNy1hMGE3ZmE0YjRhOTgiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWZ0bW8tZ2xvYmFsIiwiY3VzdG9tZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHBob25lIGNvbXBhbnkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlJpc2luZyBUYWxlbnQiLCJsYXN0X25hbWUiOiJUYWxlbnQiLCJsYWNhbGUiOiJlbiIsImZpcnN0X25hbWUiOiJSaXNpbmciLCJlbWFpbCI6InRzcC5maW4uZ3VydUBnbWFpbC5jb20iLCJjaWQiOjQ1OTc3NDcsImdyb3VwIjpbImZ0bW8tZXZhbC1nbG9iYWwiXX0.Mu4j9LMtOclR-Mp0IWc-krasiTvJ4JQtBQgLFcKBmCuj1CKp5YMDnwlpZgsVA7Gt0AYPErlvUz59kF2haCYurT4aBsy4naICMCT9JLuQ0HsJ_N0DUL89l9gMsikTSsTNd3XKHsHCzijkcSMsd2mwsKUWxUeRRlOvNdpgltBT8QFjwuvEZSCe2hEevN3EDV9HSz0MBgkviQkX59iRbGbbVYz2D7_za39RGOAfZYMKfm9GyiypK5p4mZkub1AkXFkZsAnREAzp2mo3En5vXQgLhY4wsjUib5JCPYLGWLC47ERFme4UHLLfJz1felTHqLJrqkU2uWON3eVkeX7iOXySig';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(FTMO_API_URL, {
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
      global: data.data.GLOBAL?.slice(0, 10).map((trader: any, index: number) => ({
        rank: index + 1,
        username: trader.clientName,
        country: trader.clientCountryName,
        countryCode: trader.clientCountry,
        pnl: `+$${trader.profit.toLocaleString()}`,
        profit: trader.profit,
        profitPercentage: trader.profitPercentage,
        deposit: trader.deposit,
        equity: trader.equity,
        badges: generateBadges(trader.profitPercentage),
        verified: index < 3, // Top 3 are verified
      })) || [],
      challenge10: data.data.CHALLENGE_10?.slice(0, 10).map((trader: any, index: number) => ({
        rank: index + 1,
        username: trader.clientName,
        country: trader.clientCountryName,
        countryCode: trader.clientCountry,
        pnl: `+$${trader.profit.toLocaleString()}`,
        profit: trader.profit,
        profitPercentage: trader.profitPercentage,
        deposit: trader.deposit,
        equity: trader.equity,
        badges: generateBadges(trader.profitPercentage),
        verified: index < 3,
      })) || [],
      challenge200: data.data.CHALLENGE_200?.slice(0, 10).map((trader: any, index: number) => ({
        rank: index + 1,
        username: trader.clientName,
        country: trader.clientCountryName,
        countryCode: trader.clientCountry,
        pnl: `+$${trader.profit.toLocaleString()}`,
        profit: trader.profit,
        profitPercentage: trader.profitPercentage,
        deposit: trader.deposit,
        equity: trader.equity,
        badges: generateBadges(trader.profitPercentage),
        verified: index < 3,
      })) || [],
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching FTMO leaderboard data:', error);
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