import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BASE_URL, ENDPOINTS } from '../../../constants/apiEndpoints';
import { storeTokens } from '../../../utils/authHelpers';
import { TokenResponse } from '../../../types/apiTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post<TokenResponse>(
      `${API_BASE_URL}${ENDPOINTS.LOGIN}`,
      req.body
    );
    const { access, refresh } = response.data;
    storeTokens(access, refresh);
    res.status(200).json({ message: 'Login successful' });
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data || 'Internal server error' });
  }
}
