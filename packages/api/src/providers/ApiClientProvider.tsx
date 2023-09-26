/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { PropsWithChildren, useCallback } from 'react';
import defaultAxios, { AxiosInstance, AxiosPromise } from 'axios';

export interface IApiClientContext {
  axios: AxiosInstance;
  api: <T extends unknown>(axiosPromise: AxiosPromise<T>) => Promise<T>;
}

const ApiClientContext = React.createContext<IApiClientContext>({} as any);

export const ApiClientProvider: React.FC<
  PropsWithChildren<{
    axiosInstance?: AxiosInstance;
  }>
> = ({ children, axiosInstance }) => {
  const api = useCallback(
    async <T extends unknown>(axiosPromise: AxiosPromise<T>) =>
      await axiosPromise.then(({ data }) => data),
    [],
  );

  const value = {
    axios: axiosInstance || defaultAxios,
    api,
  };

  return (
    <ApiClientContext.Provider value={value}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const context = React.useContext(ApiClientContext);
  if (!context) {
    throw new Error('useApiClient must be used within ApiClientProvider');
  }

  return context;
};
