import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';
import randomcolor from 'randomcolor';
import {Masonry} from '../dist';

const div = document.createElement('div');
document.body.appendChild(div);
Object.assign(document.body.style, {
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  margin: '0',
  background: '#222',
  height: '100vh',
  width: '100vw',
});

const children = (() => {
  const result: React.ReactNode[] = [];
  let i = 0;
  while (i < 30) {
    const image = Math.random() > 0.5;

    result.push(
      <div
        key={i}
        style={{
          background: randomcolor(),
          height: image
            ? 'auto'
            : `${Math.floor(Math.random() * 100) + 100}px`,
          width: '100%',
        }}
      >
        {image && (
          <img
            src={'https://picsum.photos/200/300/?random'}
            style={{
              display: 'block',
              maxWidth: '30%',
            }}
          />
        )}
      </div>,
    );
    i++;
  }

  return result;
})();

const ActionMenu = styled.div`
  display: flex;
  background: #111;
  padding: 0.5em;
`;

const InputNumber = styled.input.attrs({type: 'number'})`
  border: 0;
  margin: 0 0.5em;
  padding: 0.5em;
  width: 2.5em;
  font-size: inherit;
`;

interface DemoState {
  [k: string]: number;
  col: number;
  gap: number;
}

class Demo extends React.Component<{}, DemoState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      col: 3,
      gap: 16,
    };
  }

  onChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const element = ev.currentTarget;
    this.setState({
      [element.name]: Number(element.value),
    });
  };

  render() {
    return (
      <div>
        <ActionMenu>
          <label>
            Col:
            <InputNumber
              name="col"
              value={this.state.col}
              onChange={this.onChange}
            />
          </label>
          <label>
            Gap:
            <InputNumber
              name="gap"
              value={this.state.gap}
              onChange={this.onChange}
            />
          </label>
        </ActionMenu>
        <Masonry col={this.state.col} gap={this.state.gap}>
          {children}
        </Masonry>
      </div>
    );
  }
}

render(<Demo />, div);
