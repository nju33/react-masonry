import React from 'react';
import styled from 'styled-components';
import {MasonryContext, MasonryContextValue} from './masonry.context';

// tslint:disable-next-line:no-empty-interface
export interface MasonryChildProps {
  index: number;
}

export interface MasonryChildState {
  width: number;
  height: number;
}

const Component = class MasonryChildInner extends React.Component<
  MasonryChildProps & MasonryContextValue,
  MasonryChildState
> {
  static Measure = styled.div`
    opacity: 0;
  `;

  rootDom: HTMLDivElement | null = null;
  constructor(props: any) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  get height() {
    if (this.rootDom === null) {
      return 0;
    }

    return this.rootDom.clientHeight || this.state.height;
  }

  // mutationObserve = (() => {
  //   const observer = new MutationObserver((mutations) => {
  //     console.log(mutations)
  //   });

  //   return (rootDom: HTMLDivElement) => {
  //     observer.observe(rootDom, {
  //       attributes: true,
  //       characterData: true,
  //       childList: true
  //     })
  //   }
  // })();

  waitResource = async () => {
    if (this.rootDom === null) {
      return;
    }

    await Promise.all(
      Array.from(this.rootDom.querySelectorAll('img')).map(img => {
        return new Promise(resolve => {
          img.onload = resolve;
        });
      }),
    );
  };

  async componentDidMount() {
    if (this.rootDom === null) {
      return;
    }

    await this.waitResource();

    setTimeout(() => {
      if (this.rootDom === null) {
        return;
      }

      this.setState({
        width: this.rootDom.clientWidth,
        height: this.rootDom.clientHeight,
      });
      // this.mutationObserve(this.rootDom);

      this.props.stackComponent(this);
    }, 0);
  }

  refRootDom = (rootDom: HTMLDivElement | null) => {
    this.rootDom = rootDom;
  };

  render() {
    return (
      <MasonryChildInner.Measure innerRef={this.refRootDom}>
        {this.props.children}
      </MasonryChildInner.Measure>
    );
  }
};

export const MasonryChild: React.SFC<MasonryChildProps> = props => {
  return (
    <MasonryContext.Consumer>
      {ctx => {
        return <Component {...props} {...ctx} />;
      }}
    </MasonryContext.Consumer>
  );
};
