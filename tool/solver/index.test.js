/* eslint-env mocha */
import { expect } from 'chai';

const solve = require('.');

describe('solve', () => {
  it('solve', () => {
    const q = [[2, 1, 1, 2], [1, 1, 2, 2], []];
    const a = [[0, 2], [1, 2], [1, 2], [0, 1], [0, 1], [0, 2]];
    expect(solve(q)).to.be.eql(a);
  });
});
