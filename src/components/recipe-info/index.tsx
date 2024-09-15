import React from 'react';
import './index.scss';
import Card from '../card';
import FormatValue from '../format-value';
import {Recipe} from '../../models/Recipe';
import {month} from '../../utils/months';
import SavedMoneyEditor from '../button/SavedMoneyEditor';

interface Props {
  recipe: Recipe;
}

function RecipeInfo({
  recipe: {payingMemebers, totalCost, totalMembers, valuePerMember, savedMoney, minimumValuePerMember},
}: Props) {
  const getHeader = () => {
    const currentMonth = new Date().getMonth();

    return (
      <div className='header-container'>
        <h1 className='main-title'>Recibo Mensal</h1>
        <h2>{month[currentMonth]} de 2022</h2>
      </div>
    );
  };

  return (
    <Card header={getHeader()}>
      <div className='recipe-card-container'>
        <div className='card-row'>
          <span className='card-label'>Número de membros</span>
          <span className='card-value'>{totalMembers}</span>
        </div>
        <div className='card-row'>
          <span className='card-label'>Valor mínimo por membro</span>
          <FormatValue value={minimumValuePerMember} />
        </div>
        <div className='card-row'>
          <span className='card-label'>Pagantes</span>
          <span className='card-value'>{payingMemebers}</span>
        </div>
        <div className='card-row'>
          <span className='card-label'>Total arrecadado</span>
          <span className='card-value'>
            <FormatValue value={valuePerMember * payingMemebers} />
          </span>
        </div>
        <div className='card-row'>
          <span className='card-label'>Total</span>
          <span className='card-value'>
            <FormatValue value={totalCost} />
          </span>
        </div>
        <div className='card-row'>
          <span className='card-label'>Saldo</span>
          <span className='card-value'>
            <FormatValue value={valuePerMember * payingMemebers - totalCost} />
          </span>
        </div>

        <div className='recipe-divisor'>&nbsp;</div>

        <div className='saved-money'>
          <h1 className='main-title'>Caixa</h1>
          {/* <div className='card-row'>
            <span className='card-label'>Caixa do mês</span>
            <span className='card-value'>
              <FormatValue value={110} />
            </span>
          </div> */}
          <div className='card-row'>
            <span className='card-label'>Caixa total</span>
            <span className='card-value'>
              <SavedMoneyEditor/>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RecipeInfo;
