import { firestore } from 'firebase-admin';

import { WhereFilterOp } from '@firebase/firestore-types';

export interface ICondition {
  key: string;
  oper: WhereFilterOp;
  val: string | string[] | boolean | number | number[] | firestore.Timestamp;
}
