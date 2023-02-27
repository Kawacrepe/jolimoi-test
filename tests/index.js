import assert from 'node:assert';
import test from 'node:test';
// I don't know how to manage the path to the module when using node native test runner yet ??
import { toRomanNumeral } from '../dist/converter.js';

test('synchronous passing test', (t) => {
  assert.strictEqual(1, 1);
});

test('converts 1 to I', (t) => {
  assert.strictEqual(toRomanNumeral(1), 'I');
});

test('converts 8 to VIII', (t) => {
  assert.strictEqual(toRomanNumeral(8), 'VIII');
});

test('converts 100 to C', (t) => {
  assert.strictEqual(toRomanNumeral(100), 'C');
});

test('throw an error with invalid input', (t) => {
  assert.throws(() => toRomanNumeral('a'), Error);
});