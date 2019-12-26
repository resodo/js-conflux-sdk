const lodash = require('lodash');
const BigNumber = require('bignumber.js');
const { Hex } = require('../../src/utils/type');
const HexStream = require('../../src/abi/HexStream');
const getCoder = require('../../src/abi/coder');

const MAX_UINT = BigNumber(2).pow(HexStream.WORD_BYTES * 8);

function testEncode(coder, value, string) {
  const hex = Hex(coder.encode(value));
  expect(hex).toEqual(string);
  return hex;
}

function testDecode(coder, value, hex) {
  const stream = HexStream.from(hex);
  const decoded = coder.decode(stream);
  expect(decoded).toEqual(value);
  return decoded;
}

function testEncodeAndDecode(coder, value, string) {
  const hex = testEncode(coder, value, string);
  testDecode(coder, value, hex);
}

// ============================================================================
test('common', () => {
  expect(() => getCoder({ type: 'invalidType' })).toThrow('can not found matched coder');
});

test('null', () => {
  const coder = getCoder({ type: '' });

  expect(coder.constructor.name).toEqual('NullCoder');
  expect(coder.type).toEqual('null');

  testEncodeAndDecode(coder, null, '0x');
  expect(() => coder.encode(undefined)).toThrow('unexpected type');
});

test('bool', () => {
  const coder = getCoder({ type: 'bool' });
  expect(coder.constructor.name).toEqual('BoolCoder');
  expect(coder.type).toEqual('bool');

  testEncode(coder, '', '0x0000000000000000000000000000000000000000000000000000000000000000');
  testEncode(coder, 1, '0x0000000000000000000000000000000000000000000000000000000000000001');
  testEncode(coder, 'false', '0x0000000000000000000000000000000000000000000000000000000000000001');
  testEncodeAndDecode(coder, true, '0x0000000000000000000000000000000000000000000000000000000000000001');
  testEncodeAndDecode(coder, false, '0x0000000000000000000000000000000000000000000000000000000000000000');
});

test('address', () => {
  const coder = getCoder({ type: 'address' });
  expect(coder.constructor.name).toEqual('AddressCoder');
  expect(coder.type).toEqual('address');

  testEncodeAndDecode(coder, '0x0123456789012345678901234567890123456789',
    '0x0000000000000000000000000123456789012345678901234567890123456789',
  );

  testDecode(coder, '0x0123456789012345678901234567890123456789',
    '0xffffffffffffffffffffffff0123456789012345678901234567890123456789',
  );
});

describe('number', () => {
  test('bits error', () => {
    expect(() => getCoder({ type: 'int100' })).toThrow('invalid bits');
  });

  test('int8', () => {
    const coder = getCoder({ type: 'int8' });
    expect(coder.constructor.name).toEqual('IntegerCoder');
    expect(coder.type).toEqual('int8');
    expect(coder.signed).toEqual(true);
    expect(coder.size).toEqual(1);

    testEncode(coder, 127, '0x000000000000000000000000000000000000000000000000000000000000007f');
    testDecode(coder, BigNumber(127), '0x000000000000000000000000000000000000000000000000000000000000007f');

    expect(() => coder.encode(128)).toThrow('bound error');
    testEncodeAndDecode(coder, BigNumber(127), '0x000000000000000000000000000000000000000000000000000000000000007f');
    testEncodeAndDecode(coder, BigNumber(1), '0x0000000000000000000000000000000000000000000000000000000000000001');
    testEncodeAndDecode(coder, BigNumber(0), '0x0000000000000000000000000000000000000000000000000000000000000000');
    testEncodeAndDecode(coder, BigNumber(-1), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
    testEncodeAndDecode(coder, BigNumber(-128), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80');
    testDecode(coder, BigNumber(-128), '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd80');
    expect(() => coder.encode(-129)).toThrow('bound error');
  });

  test('uint8', () => {
    const coder = getCoder({ type: 'uint8' });
    expect(coder.constructor.name).toEqual('IntegerCoder');
    expect(coder.type).toEqual('uint8');
    expect(coder.signed).toEqual(false);
    expect(coder.size).toEqual(1);

    expect(() => coder.encode(256)).toThrow();
    testEncodeAndDecode(coder, BigNumber(255), '0x00000000000000000000000000000000000000000000000000000000000000ff');
    testEncodeAndDecode(coder, BigNumber(1), '0x0000000000000000000000000000000000000000000000000000000000000001');
    testEncodeAndDecode(coder, BigNumber(0), '0x0000000000000000000000000000000000000000000000000000000000000000');
    testDecode(coder, BigNumber(128), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80');
    testDecode(coder, BigNumber(128), '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd80');
    expect(() => coder.encode(-1)).toThrow('bound error');
  });

  test('int', () => {
    const coder = getCoder({ type: 'int' });
    expect(coder.constructor.name).toEqual('IntegerCoder');
    expect(coder.type).toEqual('int256');
    expect(coder.signed).toEqual(true);
    expect(coder.size).toEqual(32);

    testEncode(coder, 1.0, '0x0000000000000000000000000000000000000000000000000000000000000001');
    testEncode(coder, 256, '0x0000000000000000000000000000000000000000000000000000000000000100');
    testEncodeAndDecode(coder, BigNumber(-129), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f');
    expect(() => coder.encode(0.1)).toThrow('do not match hex string');
  });

  test('uint', () => {
    const coder = getCoder({ type: 'uint' });
    expect(coder.constructor.name).toEqual('IntegerCoder');
    expect(coder.type).toEqual('uint256');
    expect(coder.signed).toEqual(false);
    expect(coder.size).toEqual(32);

    expect(() => coder.encode(-1)).toThrow();
    expect(() => coder.encode(MAX_UINT)).toThrow();
    testEncodeAndDecode(coder, MAX_UINT.minus(1), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
  });
});

describe('fixed', () => {
  test('bits error', () => {
    expect(() => getCoder({ type: 'fixed127x18' })).toThrow('invalid bits');
    expect(() => getCoder({ type: 'fixed128x0' })).toThrow('invalid offset');
  });

  test('fixed8x1', () => {
    const coder = getCoder({ type: 'fixed8x1' }); // n * 10 ** 1
    expect(coder.constructor.name).toEqual('FixedCoder');
    expect(coder.type).toEqual('fixed8x1');
    expect(coder.signed).toEqual(true);
    expect(coder.size).toEqual(1);

    testEncode(coder, 12.7, '0x000000000000000000000000000000000000000000000000000000000000007f');
    testDecode(coder, BigNumber(12.7), '0x000000000000000000000000000000000000000000000000000000000000007f');

    expect(() => coder.encode(-12.9)).toThrow('bound error');
    testEncodeAndDecode(coder, BigNumber(-12.8), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80');
    testEncodeAndDecode(coder, BigNumber(-3.2), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0');
    testEncode(coder, BigNumber(-3.15), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0');
    testEncode(coder, BigNumber(-3.14), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1');
    testEncodeAndDecode(coder, BigNumber(-3.1), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1');
    testEncodeAndDecode(coder, BigNumber(0), '0x0000000000000000000000000000000000000000000000000000000000000000');
    testEncodeAndDecode(coder, BigNumber(3.1), '0x000000000000000000000000000000000000000000000000000000000000001f');
    testEncode(coder, BigNumber(3.14), '0x000000000000000000000000000000000000000000000000000000000000001f');
    testEncode(coder, BigNumber(3.15), '0x0000000000000000000000000000000000000000000000000000000000000020');
    testEncodeAndDecode(coder, BigNumber(3.2), '0x0000000000000000000000000000000000000000000000000000000000000020');
    testEncodeAndDecode(coder, BigNumber(12.7), '0x000000000000000000000000000000000000000000000000000000000000007f');
    expect(() => coder.encode(12.8)).toThrow('bound error');
  });

  test('ufixed8x1', () => {
    const coder = getCoder({ type: 'ufixed8x1' }); // n * 10 ** 1
    expect(coder.constructor.name).toEqual('FixedCoder');
    expect(coder.type).toEqual('ufixed8x1');
    expect(coder.signed).toEqual(false);
    expect(coder.size).toEqual(1);

    expect(() => coder.encode(-0.05)).toThrow('bound error');
    testEncode(coder, BigNumber(-0.04), '0x0000000000000000000000000000000000000000000000000000000000000000');
    testEncodeAndDecode(coder, BigNumber(0), '0x0000000000000000000000000000000000000000000000000000000000000000');
    testEncodeAndDecode(coder, BigNumber(3.1), '0x000000000000000000000000000000000000000000000000000000000000001f');
    testEncode(coder, BigNumber(3.14), '0x000000000000000000000000000000000000000000000000000000000000001f');
    testEncode(coder, BigNumber(3.15), '0x0000000000000000000000000000000000000000000000000000000000000020');
    testEncodeAndDecode(coder, BigNumber(3.2), '0x0000000000000000000000000000000000000000000000000000000000000020');
    testEncodeAndDecode(coder, BigNumber(25.5), '0x00000000000000000000000000000000000000000000000000000000000000ff');
    expect(() => coder.encode(25.6)).toThrow('bound error');
  });

  test('fixed', () => {
    const coder = getCoder({ type: 'fixed' }); // n * 10 ** 18
    expect(coder.constructor.name).toEqual('FixedCoder');
    expect(coder.type).toEqual('fixed128x18');
    expect(coder.signed).toEqual(true);
    expect(coder.size).toEqual(16);

    testEncodeAndDecode(coder, BigNumber(-12.9), '0xffffffffffffffffffffffffffffffffffffffffffffffff4cf9fe58dd760000');
    testEncodeAndDecode(coder, BigNumber(12.8), '0x000000000000000000000000000000000000000000000000b1a2bc2ec5000000');
  });

  test('ufixed', () => {
    const coder = getCoder({ type: 'ufixed' }); // n * 10 ** 18
    expect(coder.constructor.name).toEqual('FixedCoder');
    expect(coder.type).toEqual('ufixed128x18');
    expect(coder.signed).toEqual(false);
    expect(coder.size).toEqual(16);

    testEncodeAndDecode(coder, BigNumber(25.6), '0x0000000000000000000000000000000000000000000000016345785d8a000000');
  });
});

describe('bytes', () => {
  test('size error', () => {
    expect(() => getCoder({ type: 'bytes100' })).toThrow('invalid size');
  });

  test('bytesN', () => {
    const coder = getCoder({ type: 'bytes4' });
    expect(coder.constructor.name).toEqual('BytesCoder');
    expect(coder.type).toEqual('bytes4');
    expect(coder.size).toEqual(4);

    testEncodeAndDecode(coder, Buffer.from([0, 1, 2, 3]),
      '0x0001020300000000000000000000000000000000000000000000000000000000',
    );
    testDecode(coder, Buffer.from([0, 1, 2, 3]), '0x00010203');

    expect(() => coder.encode([0, 1, 2])).toThrow('length not match');
  });

  test('bytes', () => {
    const coder = getCoder({ type: 'bytes' });
    expect(coder.constructor.name).toEqual('BytesCoder');
    expect(coder.type).toEqual('bytes');
    expect(coder.size).toEqual(undefined);

    testEncode(coder, [], '0x0000000000000000000000000000000000000000000000000000000000000000');

    testEncodeAndDecode(coder, Buffer.from([0, 1, 2, 3]), '0x' +
      '0000000000000000000000000000000000000000000000000000000000000004' +
      '0001020300000000000000000000000000000000000000000000000000000000',
    );

    testEncodeAndDecode(coder, Buffer.from(lodash.range(32)), '0x' +
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',
    );

    testEncodeAndDecode(coder, Buffer.from(lodash.range(33)), '0x' +
      '0000000000000000000000000000000000000000000000000000000000000021' +
      '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f' +
      '2000000000000000000000000000000000000000000000000000000000000000',
    );
  });
});

test('string', () => {
  const coder = getCoder({ type: 'string' });
  expect(coder.constructor.name).toEqual('StringCoder');
  expect(coder.type).toEqual('string');

  testEncodeAndDecode(coder, '', '0x0000000000000000000000000000000000000000000000000000000000000000');

  testEncodeAndDecode(coder, 'abc中文', '0x' +
    '0000000000000000000000000000000000000000000000000000000000000009' +
    '616263e4b8ade696870000000000000000000000000000000000000000000000',
  );

  testDecode(coder, 'abc中文', '0x' +
    '0000000000000000000000000000000000000000000000000000000000000009' +
    '616263e4b8ade69687ffffffffffffffffffffffffffffffffffffffffffffff',
  );
});

describe('array', () => {
  test('common', () => {
    expect(() => getCoder({ type: 'uint8[0]' })).toThrow('invalid size');
  });

  test('static[N]', () => {
    const coder = getCoder({ type: 'uint8[2]' });
    expect(coder.constructor.name).toEqual('ArrayCoder');
    expect(coder.type).toEqual('uint8[2]');
    expect(coder.size).toEqual(2);
    expect(coder.dynamic).toEqual(false);

    testEncodeAndDecode(coder, [BigNumber(0xab), BigNumber(0xcd)], '0x' +
      '00000000000000000000000000000000000000000000000000000000000000ab' +
      '00000000000000000000000000000000000000000000000000000000000000cd',
    );

    testEncode(coder, [0xab, '0xcd'], '0x' +
      '00000000000000000000000000000000000000000000000000000000000000ab' +
      '00000000000000000000000000000000000000000000000000000000000000cd',
    );

    expect(() => coder.encode('string')).toThrow('unexpected type');
    expect(() => coder.encode([])).toThrow('length not match');
  });

  test('static[]', () => {
    const coder = getCoder({ type: 'uint8[]' });
    expect(coder.constructor.name).toEqual('ArrayCoder');
    expect(coder.type).toEqual('uint8[]');
    expect(coder.size).toEqual(undefined);
    expect(coder.dynamic).toEqual(true);

    testEncodeAndDecode(coder, [BigNumber(0xab), BigNumber(0xcd)], '0x' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '00000000000000000000000000000000000000000000000000000000000000ab' +
      '00000000000000000000000000000000000000000000000000000000000000cd',
    );
  });

  test('dynamic[N]', () => {
    const coder = getCoder({ type: 'string[2]' });
    expect(coder.constructor.name).toEqual('ArrayCoder');
    expect(coder.type).toEqual('string[2]');
    expect(coder.size).toEqual(2);
    expect(coder.dynamic).toEqual(true);

    testEncodeAndDecode(coder, ['ab', 'cd'], '0x' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '6162000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '6364000000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('dynamic[]', () => {
    const coder = getCoder({ type: 'string[]' });
    expect(coder.constructor.name).toEqual('ArrayCoder');
    expect(coder.type).toEqual('string[]');
    expect(coder.size).toEqual(undefined);
    expect(coder.dynamic).toEqual(true);

    testEncodeAndDecode(coder, ['ab', 'cd'], '0x' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '6162000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '6364000000000000000000000000000000000000000000000000000000000000',
    );
  });
});

describe('tuple', () => {
  test('common', () => {
    expect(() => getCoder({ type: 'tuple' })).toThrow();
  });

  test('tuple(static)', () => {
    const coder = getCoder({
      type: 'tuple',
      components: [
        { name: 'age', type: 'uint' },
        { name: 'adult', type: 'bool' },
      ],
    });
    expect(coder.NamedTuple.name).toEqual('NamedTuple(age,adult)');
    expect(coder.NamedTuple.names).toEqual(['age', 'adult']);
    expect(coder.type).toEqual('(uint256,bool)');
    expect(coder.size).toEqual(2);
    expect(coder.dynamic).toEqual(false);
    expect(coder.names).toEqual(['age', 'adult']);

    testEncodeAndDecode(coder, [BigNumber(15), false], '0x' +
      '000000000000000000000000000000000000000000000000000000000000000f' +
      '0000000000000000000000000000000000000000000000000000000000000000',
    );

    expect(() => coder.encode('string')).toThrow('unexpected type');
    expect(() => coder.encode([])).toThrow('length not match');

    const value = coder.decode(HexStream.from('0x' +
      '000000000000000000000000000000000000000000000000000000000000000f' +
      '0000000000000000000000000000000000000000000000000000000000000000',
    ));
    expect(value.toObject()).toEqual({ age: BigNumber(15), adult: false });
    expect(() => { value.age = 18; }).toThrow('can not change element to a NamedTuple');
    expect(() => { delete value.age; }).toThrow('can not delete element to a NamedTuple');
  });

  test('tuple(dynamic)', () => {
    const coder = getCoder({
      type: 'tuple',
      components: [
        { name: 'age', type: 'uint' },
        { name: 'name', type: 'string' },
      ],
    });
    expect(coder.type).toEqual('(uint256,string)');
    expect(coder.size).toEqual(2);
    expect(coder.dynamic).toEqual(true);
    expect(coder.names).toEqual(['age', 'name']);

    testEncodeAndDecode(coder, [BigNumber(15), 'abc'], '0x' +
      '000000000000000000000000000000000000000000000000000000000000000f' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '6162630000000000000000000000000000000000000000000000000000000000',
    );
  });

  test('tuple stream index error', () => {
    const coder = getCoder({
      type: 'tuple',
      components: [
        { name: 'age', type: 'uint' },
        { name: 'name', type: 'string' },
      ],
    });

    const hex = '0x' +
      '000000000000000000000000000000000000000000000000000000000000000f' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '6162630000000000000000000000000000000000000000000000000000000000';
    expect(() => coder.decode(HexStream.from(hex))).toThrow('stream.index error');
  });

  test('tuple(tuple)', () => {
    const coder = getCoder({
      type: 'tuple',
      components: [
        { name: 'age', type: 'uint' },
        {
          type: 'tuple',
          name: 'location',
          components: [
            { name: 'x', type: 'int' },
            { name: 'y', type: 'int' },
          ],
        },
      ],
    });
    expect(coder.type).toEqual('(uint256,(int256,int256))');
    expect(coder.size).toEqual(2);
    expect(coder.dynamic).toEqual(false);
    expect(coder.names).toEqual(['age', 'location']);

    testEncodeAndDecode(coder, [BigNumber(15), [BigNumber(-1500), BigNumber(900)]], '0x' +
      '000000000000000000000000000000000000000000000000000000000000000f' +
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa24' +
      '0000000000000000000000000000000000000000000000000000000000000384',
    );

    testEncode(coder, { location: { y: 900, x: -1500 }, age: 15 }, '0x' +
      '000000000000000000000000000000000000000000000000000000000000000f' +
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa24' +
      '0000000000000000000000000000000000000000000000000000000000000384',
    );

    const value = coder.decode(HexStream.from('0x' +
      '000000000000000000000000000000000000000000000000000000000000000f' +
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa24' +
      '0000000000000000000000000000000000000000000000000000000000000384'),
    );
    expect(value.age).toEqual(value[0]);
    expect(value.location).toEqual(value[1]);
    expect(value.location.x).toEqual(value[1][0]);
    expect(value.location.y).toEqual(value[1][1]);
  });

  test('tuple(uint,uint32[],string,bytes10)', () => {
    const coder = getCoder({
      type: 'tuple',
      components: [
        { type: 'uint' },
        { name: 'scores', type: 'uint32[]' },
        { name: 'name', type: 'string' },
        { name: 'data', type: 'bytes10' },
      ],
    });

    expect(coder.type).toEqual('(uint256,uint32[],string,bytes10)');
    expect(coder.size).toEqual(4);
    expect(coder.dynamic).toEqual(true);
    expect(coder.names).toEqual(['0', 'scores', 'name', 'data']);

    testEncodeAndDecode(
      coder,
      [BigNumber(0x123), [BigNumber(0x456), BigNumber(0x789)], 'Hello, world!', Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])],
      '0x' +
      '0000000000000000000000000000000000000000000000000000000000000123' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '00000000000000000000000000000000000000000000000000000000000000e0' +
      '0001020304050607080900000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000456' +
      '0000000000000000000000000000000000000000000000000000000000000789' +
      '000000000000000000000000000000000000000000000000000000000000000d' +
      '48656c6c6f2c20776f726c642100000000000000000000000000000000000000',
    );
  });
});