import { isAny, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const key = 'key test';
const value = 'value test';
const retVal = 'return value test';

let isAnyStub;
let array;

module('Unit | Macro | is any', {
  beforeEach() {
    isAnyStub = sinon.stub().returns(retVal);
    array = { isAny: isAnyStub };
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: isAny('array', 'key', 'value'),
    strictEqual: undefined
  });
});

test('it calls isAny on array', function(assert) {
  let { result } = compute({
    computed: isAny('array', 'key', 'value'),
    properties: {
      array,
      key,
      value
    }
  });

  assert.deepEqual(isAnyStub.args, [[key, value]]);
  assert.strictEqual(result, retVal);
});

test('composable: it calls isAny on array', function(assert) {
  let { result } = compute({
    computed: isAny(
      array,
      raw(key),
      raw(value)
    )
  });

  assert.deepEqual(isAnyStub.args, [[key, value]]);
  assert.strictEqual(result, retVal);
});
