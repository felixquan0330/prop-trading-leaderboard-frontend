import { Table, TableHeader, TableBody, TableRow, Th, Td } from '@/components';
import { Discount, SortUp, SortDown } from '@/components';
import { TraderCard } from '../../components/component/card/TraderCard';
import { ProfitCard } from '../../components/component/card/ProfitCard';

interface TopTraderTableProps {
  firmName: string;
  data: any[];
  loading: boolean;
  error: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: () => void;
  targetProfit: number;
  loadingLabel: string;
}

export const TopTraderTable = ({
  firmName,
  data,
  loading,
  error,
  sortDirection,
  onSort,
  targetProfit,
  loadingLabel,
}: TopTraderTableProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <img src="/images/top-trader/1.png" alt="top-trader" className='w-6 h-6 rounded-full' />
          <span className='text-white font-semibold'>{firmName}</span>
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
          <TableHeader>
            <Th
              className="flex items-center justify-center gap-2 hover:cursor-pointer mx-auto"
              onClick={onSort}
            >
              RANK {sortDirection === 'desc' ? <SortUp className="w-4 h-4" /> : <SortDown className="w-4 h-4" />}
            </Th>
            <Th>USERNAME</Th>
            <Th>PROFIT</Th>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <Td className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2">{loadingLabel}</span>
                  </div>
                </Td>
              </TableRow>
            ) : error ? (
              <TableRow>
                <Td className="text-center py-8 text-red-500">
                  Error: {error}
                </Td>
              </TableRow>
            ) : data?.map((trader: any, index: number) => (
              <TableRow key={index}>
                <Td>{trader.rank}</Td>
                <Td>
                  <TraderCard
                    avatarUrl={`/avatar/user${trader.rank}.png`}
                    userid={trader.username}
                    country={trader.country}
                    isVerified={trader.isVerified}
                  />
                </Td>
                <Td>
                  <ProfitCard currentProfit={trader.profit} targetProfit={targetProfit} />
                </Td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}; 