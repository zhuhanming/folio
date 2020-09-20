import React, { useEffect, useState, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import ApiService from 'services/apiService';
import Loading from 'components/loading';
import ComponentRenderer from 'components/componentRenderer';
import Container from 'components/container';

import '../main/Main.scss';
import './Static.scss';

const Static = () => {
  const location = useLocation();
  const [components, setComponents] = useState(null);
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false,
  });
  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  // const components = useSelector(state => state.components.components);
  // const componentOrder = useSelector(state => state.components.componentOrder);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const responses = await ApiService.get(`pages?name=${code}`);
        if (!didCancel) {
          setComponents(JSON.parse(responses.data.page.pageJson));
          setState({ isLoading: false });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isLoading: false, isError: true });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [code]);

  if (state.isLoading) return <Loading />;
  if (state.isError)
    return (
      <div className="columns">
        <div className="column is-full">
          <article className="message is-danger">
            <div className="message-body">
              An error has occurred. Please reload the page.
            </div>
          </article>
        </div>
      </div>
    );

  return (
    <Container>
      <ComponentRenderer components={components} />
    </Container>
  );
};

export default Static;
