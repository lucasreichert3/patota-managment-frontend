// MembersItem.tsx
import React, {PropsWithChildren} from 'react';
import {Member} from '../../models/Member';
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

  // Obter a primeira letra do nome para o avatar
  const firstLetter = member.name.charAt(0).toUpperCase();

  return (
    <tr className='hover:bg-gray-50 transition-colors'>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium'>
            {firstLetter}
          </div>
          <div className='ml-3 font-medium text-gray-900'>{member.name}</div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-gray-900'>
        <FormatValue value={memberValue} />
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        {member.paid ? (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            Pago
          </span>
        ) : (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            Pendente
          </span>
        )}
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        {!member.paid ? (
          <button
            onClick={handlePaidButtonClick}
            className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition-colors'
          >
            Pagar
          </button>
        ) : (
          <button className='bg-gray-200 text-gray-500 py-1 px-3 rounded-md text-sm cursor-not-allowed'>Pago</button>
        )}
      </td>
    </tr>
  );
}

export default MembersItem;
