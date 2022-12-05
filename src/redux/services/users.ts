import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchProfile = createAsyncThunk(
    'user/profile',
    async (request, thunkAPI) => {
      const response = await axios.get(
          "https://sanwopay.com.ng/api/v1/user/profile/",
          {
              headers: {
                  "Authorization": "Token"
              }
          }
      )
      return response.data;
    }
) 