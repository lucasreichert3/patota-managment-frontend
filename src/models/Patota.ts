import {Member} from './Member';

export interface Patota {
  totalCost: number;
  savedMoney: number;
  valuePerMember: number;
  monthYear: string;
  members: Member[];
}
