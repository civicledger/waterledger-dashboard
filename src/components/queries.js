import axios from 'axios';
import { getInstanceIdentifier } from '../utils/ethUtils';
const identifier = getInstanceIdentifier();

// export const getScheme = async () => {
//   const { data } = await axios.get(`/schemes/${identifier}`);
//   return data.scheme;
// };