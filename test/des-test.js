'use strict';

var assert = require('assert');
var crypto = require('crypto');
var Buffer = require('buffer').Buffer;

var des = require('../');

var fixtures = require('./fixtures');
var bin = fixtures.bin;

describe('DES', function() {
  describe('Key Derivation', function() {
    it('should derive proper keys', function() {
      var d = des.DES.create([
        0x13, 0x34, 0x57, 0x79,
        0x9B, 0xBC, 0xDF, 0xF1
      ]);

      var expected = [
        '000110 110000 001011 101111',
        '111111 000111 000001 110010',
        '011110 011010 111011 011001',
        '110110 111100 100111 100101',
        '010101 011111 110010 001010',
        '010000 101100 111110 011001',
        '011100 101010 110111 010110',
        '110110 110011 010100 011101',
        '011111 001110 110000 000111',
        '111010 110101 001110 101000',
        '011000 111010 010100 111110',
        '010100 000111 101100 101111',
        '111011 001000 010010 110111',
        '111101 100001 100010 111100',
        '111101 111000 101000 111010',
        '110000 010011 101111 111011',
        '111000 001101 101111 101011',
        '111011 011110 011110 000001',
        '101100 011111 001101 000111',
        '101110 100100 011001 001111',
        '001000 010101 111111 010011',
        '110111 101101 001110 000110',
        '011101 010111 000111 110101',
        '100101 000110 011111 101001',
        '100101 111100 010111 010001',
        '111110 101011 101001 000001',
        '010111 110100 001110 110111',
        '111100 101110 011100 111010',
        '101111 111001 000110 001101',
        '001111 010011 111100 001010',
        '110010 110011 110110 001011',
        '000011 100001 011111 110101'
      ];

      expected = expected.map(fixtures.bin);
      assert.deepEqual(d._desState.keys, expected);
    });
  });

  describe('encryption', function() {
    var vectors = [
      {
        key: '133457799bbcdff1',
        input: '0123456789abcdef'
      },
      {
        key: '0000000000000000',
        input: '0000000000000000'
      },
      {
        key: 'a3a3a3a3b3b3b3b3',
        input: 'cccccccccccccccc'
      }
    ];

    vectors.forEach(function(vec, i) {
      it('should encrypt vector ' + i, function() {
        var key = new Buffer(vec.key, 'hex');
        var input = new Buffer(vec.input);

        var d = des.DES.create(key, 'hex');
        var out = new Buffer(d.update(input));

        var cipher = crypto.createCipheriv('des-ecb', key, new Buffer(0));
        var expected = cipher.update(input);

        assert.deepEqual(out, expected);
      });
    });
  });
});
