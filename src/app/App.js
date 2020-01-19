import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { retryPromise } from 'utils';
import Loading from 'components/loading';
import './App.scss';

const loadMainApp = () => import('./MainApp');
const MainApp = React.lazy(() => retryPromise(loadMainApp));
toast.configure();

const App = () => {
  React.useEffect(() => {
    loadMainApp();
  }, []);

  return (
    <React.Suspense fallback={<Loading />}>
      <MainApp />
    </React.Suspense>
  );
};

export default App;
