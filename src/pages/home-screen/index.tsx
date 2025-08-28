// HomeScreen.tsx
import React from 'react';
import Loading from '../../components/loading';
import MembersList from '../../components/members-list';
import RecipeInfo from '../../components/recipe-info';
import {usePatota} from '../../contexts/PatotaContext';

function HomeScreen() {
  const {patota, minimumValuePerMember, payingMemebers, loading} = usePatota();

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Loading */}
      {loading && (
        <div className='flex justify-center my-8'>
          <Loading loading={loading} />
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Lista de Membros */}
          <div className='lg:col-span-2'>
            <MembersList members={patota?.members || []} memberValue={patota?.valuePerMember || 0} />
          </div>

          {/* Sidebar */}
          <div>
            {/* Recibo Mensal */}
            <RecipeInfo
              recipe={{
                totalCost: patota?.totalCost || 0,
                valuePerMember: patota?.valuePerMember || 0,
                payingMemebers: payingMemebers || 0,
                totalMembers: patota?.members?.length || 0,
                savedMoney: patota?.savedMoney || 0,
                minimumValuePerMember: minimumValuePerMember || 0,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
