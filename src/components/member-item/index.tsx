import React, {PropsWithChildren, useState} from 'react';
import {FiCheckCircle, FiXCircle} from 'react-icons/fi';
import {Member} from '../../models/Member';
import FormatValue from '../format-value';
import PaymentModal from '../payment-modal';
import {usePatota} from '../../contexts/PatotaContext';

export interface Props extends PropsWithChildren {
  member: Member;
  memberValue: number;
  paidClick: (member: Member) => void;
}

function MembersItem({member, memberValue, paidClick}: Props) {
  const {toggleGoalkeeper} = usePatota();
  const [showModal, setShowModal] = useState(false);

  const effectiveValue = member.isGoalkeeper ? memberValue / 2 : memberValue;
  const firstLetter = member.name.charAt(0).toUpperCase();

  const handleConfirmPayment = () => {
    setShowModal(false);
    paidClick(member);
  };

  const handleGoalkeeperToggle = () => {
    toggleGoalkeeper!(member.id, !member.isGoalkeeper);
  };

  return (
    <tr className='hover:bg-gray-50 transition-colors'>
      <td className='px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='hidden sm:flex h-8 w-8 rounded-full bg-blue-100 items-center justify-center text-blue-600 font-medium'>
            {firstLetter}
          </div>
          <span className='sm:ml-3 font-medium text-gray-900'>{member.name}</span>
          <button
            onClick={handleGoalkeeperToggle}
            title={member.isGoalkeeper ? 'Remover goleiro' : 'Marcar como goleiro'}
            className={`ml-2 px-1.5 py-0.5 rounded border text-[0.65rem] font-bold transition-colors ${
              member.isGoalkeeper
                ? 'bg-blue-50 border-blue-500 text-blue-600'
                : 'border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-600'
            }`}
          >
            G
          </button>
        </div>
      </td>
      <td className='px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-900'>
        <FormatValue value={effectiveValue} />
      </td>
      <td className='px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap'>
        {member.paid ? (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
            <FiCheckCircle className='w-4 h-4 mr-1' />
            Pago
          </span>
        ) : (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
            <FiXCircle className='w-4 h-4 mr-1' />
            Pendente
          </span>
        )}
      </td>
      <td className='px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap'>
        {!member.paid ? (
          <button
            onClick={() => setShowModal(true)}
            className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition-colors'
          >
            Pagar
          </button>
        ) : (
          <button disabled className='bg-gray-200 text-gray-500 py-1 px-3 rounded-md text-sm cursor-not-allowed'>
            Pago
          </button>
        )}

        {showModal && (
          <PaymentModal
            memberName={member.name}
            value={effectiveValue}
            onConfirm={handleConfirmPayment}
            onClose={() => setShowModal(false)}
          />
        )}
      </td>
    </tr>
  );
}

export default MembersItem;
