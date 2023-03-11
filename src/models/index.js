// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Supporter, VictoryType, UserProfile, Victory } = initSchema(schema);

export {
  Supporter,
  VictoryType,
  UserProfile,
  Victory
};