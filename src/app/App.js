import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from 'react-responsive';

import { retryPromise } from 'utils';
import Loading from 'components/loading';
import './App.scss';

const loadMainApp = () => import('./MainApp');
const MainApp = React.lazy(() => retryPromise(loadMainApp));
const Nondesktop = React.lazy(() =>
  retryPromise(() => import('routes/nondesktop'))
);
toast.configure();

const App = () => {
  React.useEffect(() => {
    loadMainApp();
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <React.Suspense fallback={<Loading />}>
      {isMobile ? <Nondesktop /> : <MainApp />}
    </React.Suspense>
  );
};

export default App;
