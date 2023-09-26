import Axios, { AxiosInstance } from 'axios';

import { env } from '~/env.mjs';

export class AxiosManager {
  public readonly axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: env.NEXT_PUBLIC_API_URL,
    });
  }
}

// will be used in SSR API Requests
export const { axios } = new AxiosManager();
