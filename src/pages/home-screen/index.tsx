import React from 'react';
import Loading from '../../components/loading';
import MembersList from '../../components/members-list';
import RecipeInfo from '../../components/recipe-info';
import {usePatota} from '../../contexts/PatotaContext';
import './index.scss';

function HomeScreen() {
  const {patota, minimumValuePerMember, payingMemebers, loading} = usePatota();

  return (
    <div className={`home-screen ${loading && 'content-loading'}`}>
      <div className='loading'>
        <Loading loading={loading!} />
      </div>
      <div className='members-list'>
        <MembersList members={patota?.members || []} memberValue={patota?.valuePerMember || 0} />
      </div>
      <div className='recipe-info'>
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
  );
}

export default HomeScreen;
