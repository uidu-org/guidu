import React, { Fragment } from 'react';
import { Code } from '../src';

const jsCode = `const map = new Map({ key: 'value' })`;

const javaCode = `String item = "Hello"`;

const pyCode = `import matplotlib.pyplot as plt`;

const cppCode = `std::cout << "Hello World!" << std::endl`;

const theme = { mode: 'dark' };

export default function Component() {
  return (
    <Fragment>
      <span>
        This is inline javascript code:{' '}
        <Code language="javascript" text={jsCode} />, check it out.
      </span>
      <br />
      <br />
      <span>
        This is inline java code: <Code language="java" text={javaCode} />,
        check it out.
      </span>
      <br />
      <br />
      <span>
        This is inline python code: <Code language="python" text={pyCode} />
      </span>
      <br />
      <br />
      <span>
        This is inline c++ code with dark theme:{' '}
        <Code language="c++" text={cppCode} theme={theme} />, check it out.
      </span>
    </Fragment>
  );
}
