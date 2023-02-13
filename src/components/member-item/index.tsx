import React, {PropsWithChildren} from 'react';
import {Member} from '../../models/Member';
import './index.scss';
import {FiCheckCircle, FiXCircle} from 'react-icons/fi';
import Button from '../button';
import FormatValue from '../format-value';

export interface Props extends PropsWithChildren {
  member: Member;
  memberValue: number;
  paidClick: (member: Member) => void;
}

function MembersItem({member, memberValue, paidClick}: Props) {
  const handlePaidButtonClick = () => {
    paidClick(member);
  };

  return (
    <div className='member-item'>
      <span className='name'>{member.name}</span>
      <span className='value'>
        <FormatValue value={memberValue} />
      </span>
      <span className='paid paid-icon-container'>
        {member.paid ? <FiCheckCircle className='paid-icon' /> : <FiXCircle className='not-paid-icon' />}
      </span>
      {!member.paid && (
        <span className='button'>
          <Button text='Pagar' click={handlePaidButtonClick} />
        </span>
      )}
    </div>
  );
}

export default MembersItem;
