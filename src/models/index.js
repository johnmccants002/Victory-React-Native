// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Victory } = initSchema(schema);

export {
  Victory
};