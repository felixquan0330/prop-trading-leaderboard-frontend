import { NextRequest, NextResponse } from 'next/server';

const FUNDINGPIPS_API_URL = 'https://backend.fundingpips.com/api/leaderboard/highest_profit_accounts?account_size=null';
const FUNDINGPIPS_COOKIE = '_fundingpips_session=YHcM8Vw7LvnyVWs7aCdPMc%2FcYrhq8QKV%2BbkPLIXtX7jJRwnD3m0zGR%2Fcc97hNiWLwTiCrHFKdaA6R1p5lbhCOeGIrsaSZkWt5W01djZhH5EQYJt8gbbd%2B3hwqZyWcCO1W54zhzgL03UvcQFmrPUnu386kMVWfjn1e0OSKKFYPUpVdX%2BZhwNdlx0Kg5LLQWW2ISDhNah1YyOURXbIpAPgltL2UCTPzc2%2BZLO6ENG93sqzmQ3re7BeHZukvPQCrXW7KjEWNxEMGgfJJn3YTL0ACYqENlkcpYB%2BjIWW%2FB3ZBmyXhK1v1XLYgzAil89X41h69T7K48LnUEHJKuoD4AphDl5KeXG7pA09upH7WY8Ulf2%2F6NT%2FT473yDlOwBbfc9CTDAeJIY29F6siGd1Tc8XobjLkwbkQ0HiMnmV7V4rybXJ5YiVnXQtVIMXqzUoFIO1eiFz%2BZdP6WLb2lfsD%2BnJh2Ztu%2Fkt7bo0ZxhhZFiZy%2B1upvnBeyOl1NCSUyUrR%2FYF6--ri1mWWeibYhQalcR--%2FqpkXpxptFKU%2FbFCK0nK8A%3D%3D; domain=fundingpips.com; path=/; secure; httponly; samesite=lax';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(FUNDINGPIPS_API_URL, {
      method: 'GET',
      headers: {
        'Cookie': FUNDINGPIPS_COOKIE,
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data)
    
    // Transform the data to match our frontend structure
    const transformedData = {
      bestTrades: data?.slice(0, 10).map((trader: any, index: number) => ({
        rank: index + 1,
        username: trader.user_name,
        country: getCountryName(trader.user_country_code),
        countryCode: trader.user_country_code || 'US',
        pnl: `+$${parseFloat(trader.account_profit).toLocaleString()}`,
        profit: parseFloat(trader.account_profit),
        profitPercentage: trader.account_profit_percentage,
        accountSize: trader.account_size,
        badges: generateBadges(trader.account_profit_percentage),
        verified: index < 3, // Top 3 are verified
      })) || [],
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching FundingPips leaderboard data:', error);
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

// Helper function to get country name from country code
function getCountryName(countryCode: string | null): string {
  if (!countryCode) return 'Unknown';
  
  const countryMap: { [key: string]: string } = {
    'US': 'United States',
    'KE': 'Kenya',
    'PL': 'Poland',
    'IN': 'India',
    'JM': 'Jamaica',
    'ZA': 'South Africa',
    'UZ': 'Uzbekistan',
    'DE': 'Germany',
    'SE': 'Sweden',
    'AF': 'Afghanistan',
    'ES': 'Spain',
    'DZ': 'Algeria',
    'CO': 'Colombia',
    'KZ': 'Kazakhstan',
    'TR': 'Turkey',
  };
  
  return countryMap[countryCode] || countryCode;
} 