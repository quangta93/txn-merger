import React, { createContext, useContext, FC } from 'react';
import { Remote, wrap } from 'comlink';
import { IBackgroundApi } from '../workers';

export type BackgroundApi = Remote<IBackgroundApi> | null;

const Context = createContext<BackgroundApi>(null);

export const BackgroundApiProvider: FC = ({ children }) => {
  const worker = new Worker('../workers/index.ts');
  const bgApi = wrap<IBackgroundApi>(worker);

  return <Context.Provider value={bgApi}>{children}</Context.Provider>;
};

export const useBackgroundApi = (): BackgroundApi => {
  const bgApi = useContext(Context);

  if (!bgApi) {
    throw new Error('Background thread not established');
  }

  return bgApi;
};
