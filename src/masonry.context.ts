import React from 'react';
import {MasonryChildProps, MasonryChildState} from '.';

export interface MasonryContextValue {
  stackComponent(
    component: React.Component<MasonryChildProps, MasonryChildState>,
  ): void;
}

export const masonryContextDefaultValue: MasonryContextValue = {
  stackComponent(
    component: React.Component<MasonryChildProps, MasonryChildState>,
  ) {
    return component;
  },
};

export const MasonryContext = React.createContext(masonryContextDefaultValue);
