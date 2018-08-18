import React from 'react';
import styled from 'styled-components';
import {MasonryContext} from './masonry.context';
import {MasonryChildProps, MasonryChildState, MasonryChild} from '.';
import {Column} from './column';

export interface MasonryProps {
  col: number;
  gap: number | string;
  children: React.ReactNode[] | React.ReactNode;
}

export interface MasonryState {
  stocks: React.Component<MasonryChildProps, MasonryChildState>[];
  cols: Column[];
  init: boolean;
}

export class Masonry extends React.Component<MasonryProps, MasonryState> {
  static Flex = styled.div`
    display: flex;
  `;

  static FlexChild = styled.div`
    flex: auto;
    &:not(:first-child) {
      margin-left: ${(props: {'data-gap': number}) => {
        const gap = props['data-gap'];
        if (typeof gap === 'number') {
          return `${gap}px`;
        }

        return gap;
      }};
    }

    & > * {
      margin: ${(props: {'data-gap': number}) => {
          const gap = props['data-gap'];
          if (typeof gap === 'number') {
            return `${gap}px`;
          }

          return gap;
        }}
        0;
    }
  `;

  constructor(props: MasonryProps) {
    super(props);

    this.state = {
      stocks: [],
      cols: [],
      init: false,
    };
  }

  stackComponent = (
    component: React.Component<MasonryChildProps, MasonryChildState>,
  ) => {
    // console.log(component.props.index, component, [...this.state.stocks])
    this.state.stocks[component.props.index] = component;
    const renderred =
      this.children.length === this.state.stocks.filter(c => c).length;
    this.setState({
      stocks: this.state.stocks,
      init: renderred,
    });

    if (renderred) {
      this.setup();
    }
  };

  setup() {
    // 最新の状態で組み立てる
    setTimeout(() => {
      const cols: Column[] = [];
      for (let i = 0; i < this.props.col; i++) {
        cols.push(new Column());
      }

      this.state.stocks.forEach((component, i) => {
        // tslint:disable-next-line:max-line-length
        // console.log( cols.sort((a, b) => a.height - b.height).map(c => c.height));
        const col = cols.sort((a, b) => a.height - b.height)[0];
        col.add(component);
        col.addChild(this.children[i]);
      });

      this.setState({
        cols,
      });
    }, 0);
  }

  componentWillReceiveProps(nextProps: MasonryProps) {
    if (this.props.col !== nextProps.col) {
      this.setState({init: false, stocks: []});
      this.setup();
    }
  }

  get children(): React.ReactNode[] {
    if (Array.isArray(this.props.children)) {
      return this.props.children;
    }

    return [this.props.children];
  }

  render() {
    return (
      <MasonryContext.Provider
        value={{
          stackComponent: this.stackComponent,
        }}
      >
        {!this.state.init &&
          this.children
            // .slice(0, this.state.stocks.length + 1)
            .map((child, i) => {
              return (
                <div style={{
                  width: `${100 / this.props.col}%`
                }}>
                  <MasonryChild key={i} index={i}>
                    {child}
                  </MasonryChild>
                </div>
              );
            })}

        {this.state.init && (
          <Masonry.Flex>
            {this.state.cols.map((col, i) => {
              return (
                <Masonry.FlexChild key={i} data-gap={this.props.gap as any}>
                  {col.children}
                </Masonry.FlexChild>
              );
            })}
          </Masonry.Flex>
        )}
      </MasonryContext.Provider>
    );
  }
}
