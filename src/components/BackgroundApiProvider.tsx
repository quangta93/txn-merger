import React, {
  createContext,
  useContext,
  FC,
  useEffect,
  useState,
} from 'react';
import { Remote, wrap } from 'comlink';
import { IBackgroundApi } from '../workers';

export type BackgroundApi = Remote<IBackgroundApi> | null;

const Context = createContext<BackgroundApi>(null);

export const initProcessor = async () =>
  wrap<IBackgroundApi>(new Worker('../workers/index.ts'));

export const BackgroundApiProvider: FC = ({ children }) => {
  const [bgApi, setApi] = useState<BackgroundApi>(null);

  useEffect(() => {
    const getApi = async (setApi: any) => {
      const api = await initProcessor();
      setApi(api);
    };

    // tslint:disable-next-line: no-floating-promises
    getApi(setApi);
  }, [setApi]);

  return <Context.Provider value={bgApi}>{children}</Context.Provider>;
};

export const useBackgroundApi = (): BackgroundApi => useContext(Context);
