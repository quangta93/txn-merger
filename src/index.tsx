import React, { FC, useRef } from 'react';
import { render } from 'react-dom';
import {
  BackgroundApiProvider,
  useBackgroundApi,
  BackgroundApi,
} from './components/BackgroundApiProvider';
import './index.css';

const InputForm: FC = () => {
  const bgApi: BackgroundApi = useBackgroundApi();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const _submit = async (event: any) => {
    event.preventDefault();

    if (textRef.current && bgApi) {
      const csv: string = textRef.current.value;
      console.log(`processing ${csv.length / 1000}kB`);
      const length = await bgApi.process(csv);
      console.log(`process ${length} transactions`);
    }
  };

  return (
    <form onSubmit={_submit}>
      <textarea ref={textRef} rows={20} cols={120} />
      <button type="submit" onClick={_submit}>
        Process
      </button>
    </form>
  );
};

render(
  <BackgroundApiProvider>
    <InputForm />
  </BackgroundApiProvider>,
  document.getElementById('root')
);
