import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {Member} from '../models/Member';
import {Patota} from '../models/Patota';
import {getPatota, updateMemberPayment, updateSavedMoney} from '../services/patota-service';
import {getCurrentMonthAndYear} from '../utils/getCurrentMonthYear';

const PatotaContext = createContext<PatotaContext>({});

export const PatotaProvider = ({children}: PropsWithChildren) => {
  const [patota, setPatota] = useState<Patota>();
  const [loading, setLoading] = useState<boolean>(false);
  const [monthYear, setMonthYear] = useState<string>();
  const [minimumValuePerMember, setMinimumValuePerMember] = useState(0);
  const [payingMemebers, setpayingMemebers] = useState(0);

  const setMonthYearValue = () => {
    const {month, year} = getCurrentMonthAndYear();
    setMonthYear(`${month}#${year}`);
  };

  const getMinimiumValuerPerMember = (totalCoast: number, totalMembers: number) => {
    const total = totalCoast / totalMembers;

    return Number(total.toFixed(2));
  };

  const getPayingMembers = (members: Member[]) => {
    const payingMembers = members.filter(({paid}) => paid);

    return payingMembers.length;
  };

  const updatePayment = async (id: string, paid: boolean) => {
    const {month, year} = getCurrentMonthAndYear();
    await updateMemberPayment(month.toString(), year.toString(), paid, id);
    const members = [...patota!.members];
    const newMembersValue = members.map((member) => {
      if (member.id === id) return {...member, paid};

      return member;
    });
    return newMembersValue;
  };

  const updatePatotaSavedMoney = async () => {
    const {month, year} = getCurrentMonthAndYear();

    const {savedMoney: currentSavedMoney, valuePerMember} = patota!;

    const paymentDiference = valuePerMember - minimumValuePerMember!;

    if (paymentDiference > 0) {
      const savedMoney = currentSavedMoney + paymentDiference;
      await updateSavedMoney(month.toString(), year.toString(), savedMoney);

      return savedMoney;
    }

    return patota!.savedMoney;
  };

  const updateMemberPaymentAndSavedMoney = async (memberId: string) => {
    setLoading(true);
    const currentMembers = await updatePayment(memberId, true);
    const savedMoney = await updatePatotaSavedMoney();

    setPatota({...patota!, members: currentMembers, savedMoney});
    setpayingMemebers(getPayingMembers(currentMembers));
    setLoading(false);
  };

  useEffect(() => {
    const getPatotaFromService = async () => {
      setLoading(true);
      const {month, year} = getCurrentMonthAndYear();
      const response = await getPatota(`${year}`, `${month}`);
      const {members, totalCost} = response;

      setMinimumValuePerMember(getMinimiumValuerPerMember(totalCost, members?.length));
      setpayingMemebers(getPayingMembers(members));

      setPatota({
        ...response,
      });
      setLoading(false);
    };

    setMonthYearValue();
    getPatotaFromService();
  }, []);

  return (
    <PatotaContext.Provider
      value={{patota, loading, monthYear, minimumValuePerMember, payingMemebers, updateMemberPaymentAndSavedMoney}}
    >
      {children}
    </PatotaContext.Provider>
  );
};

export function usePatota() {
  return useContext(PatotaContext);
}

interface PatotaContext {
  patota?: Patota;
  payingMemebers?: number;
  minimumValuePerMember?: number;
  monthYear?: string;
  loading?: boolean;
  updateMemberPaymentAndSavedMoney?: (memberId: string) => Promise<void>;
}
