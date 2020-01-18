/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const components = createSlice({
  name: 'components',
  initialState: {
    components: {
      defaultTitle: {
        id: 'defaultTitle',
        type: 'title',
        text: 'Welcome to Folio!'
      },
      defaultSubtitle: {
        id: 'defaultSubtitle',
        type: 'subtitle',
        text: 'Drag and drop any components to the centre here to get started!'
      }
    },
    componentOrder: ['defaultTitle', 'defaultSubtitle'],
    componentCounter: 0
  },
  reducers: {
    setComponents: (state, { payload }) => {
      state.components = payload;
    },
    setComponentOrder: (state, { payload }) => {
      state.componentOrder = payload;
    },
    deleteComponent: (state, { payload }) => {
      delete state.components[payload];
      state.componentOrder = state.componentOrder.filter(
        val => val !== payload
      );
    },
    clearComponents: state => {
      state.components = [];
    },
    updateComponent: (state, { payload }) => {
      state.components[payload.id] = payload.component;
    },
    incrementCounter: state => {
      state.componentCounter += 1;
    }
  }
});

export const {
  setComponents,
  clearComponents,
  deleteComponent,
  setComponentOrder,
  updateComponent,
  incrementCounter
} = components.actions;

export default components.reducer;
