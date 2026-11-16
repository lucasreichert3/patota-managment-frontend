// HomeScreen.tsx
import React from 'react';
import Loading from '../../components/loading';
import MembersList from '../../components/members-list';
import MonthFilter from '../../components/month-filter';
import {usePatota} from '../../contexts/PatotaContext';

function HomeScreen() {
  const {patota, loading} = usePatota();

  return (
    <div className='min-h-screen w-full px-4 py-8'>
      {loading && (
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
          <Loading loading={loading} />
        </div>
      )}

      <div className='mx-auto flex w-full max-w-4xl flex-col items-center gap-4'>
        <MonthFilter />
        <div className={`w-full transition-opacity ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
          <MembersList members={patota?.members || []} memberValue={patota?.valuePerMember || 0} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
