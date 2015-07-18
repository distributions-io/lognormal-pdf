/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	pdf = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-lognormal-pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( pdf( values[ i ] ) ) );
		}
	});

	it( 'should compute the Lognormal pdf when provided a number', function test() {
		assert.strictEqual( pdf( -1 ), 0 );
	});

	it( 'should evaluate the Lognormal pdf when provided a plain array', function test() {

		var validationData = require( './json/array.json' ),
			data,
			actual,
			expected,
			i;

		data = validationData.data;
		expected = validationData.expected;

		actual = pdf( data, {
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}

		// Mutate...
		actual = pdf( data, {
			'copy': false,
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-14 );
		}
	});

	it( 'should evaluate the Lognormal pdf when provided a typed array', function test() {
		var validationData = require( './json/typedarray.json' ),
			data,
			actual,
			expected,
			i;

		data = new Float64Array( validationData.data );

		expected = new Float64Array( validationData.expected );

		actual = pdf( data, {
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}

		// Mutate:
		actual = pdf( data, {
			'copy': false,
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});
		expected = new Float64Array( validationData.expected );
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-14 );
		}
	});

	it( 'should evaluate the Lognormal pdf element-wise and return an array of a specific type', function test() {

		var validationData = require( './json/array.json' ),
			data = validationData.data,
			actual,
			expected = new Int8Array( validationData.expected );

		actual = pdf( data, {
			'dtype': 'int8'
		});

		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the Lognormal pdf element-wise using an accessor', function test() {
		var validationData = require( './json/accessor.json' ),
			data,
			actual,
			expected,
			i;

		data = validationData.data.map( function( e, i ) {
			return [ i, e ];
		});

		expected = validationData.expected;

		actual = pdf( data, {
			'accessor': getValue,
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}

		// Mutate:
		actual = pdf( data, {
			'accessor': getValue,
			'copy': false,
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-14 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the Lognormal pdf element-wise and deep set', function test() {
		var validationData = require( './json/deepset.json' ),
			data,
			actual,
			expected,
			i;

		data = validationData.data.map( function( e ) {
			return {'x': [ i, e ]};
		});

		expected = validationData.expected.map( function( e ) {
			return {'x': [ i, e ]};
		});

		actual = pdf( data, {
			'path': 'x.1',
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-14 );
		}

		// Specify a path with a custom separator...
		data = validationData.data.map( function( e ) {
			return {'x': [ i, e ]};
		});
		actual = pdf( data, {
			'path': 'x/1',
			'sep': '/',
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-14 );
		}
	});

	it( 'should evaluate the Lognormal pdf element-wise when provided a matrix', function test() {
		var validationData = require( './json/matrix.json' ),
			mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( validationData.data );
		d2 = new Float64Array( validationData.expected );

		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat, {
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});

		for ( i = 0; i < out.length; i++ ) {
			assert.closeTo( out.data[ i ], d2[ i], 1e-14 );
		}

		// Mutate...
		out = pdf( mat, {
			'copy': false,
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});
		assert.strictEqual( mat, out );
		for ( i = 0; i < out.length; i++ ) {
			assert.closeTo( mat.data[ i ], d2[ i], 1e-14 );
		}
	});

	it( 'should evaluate the Lognormal pdf element-wise and return a matrix of a specific type', function test() {
		var validationData = require( './json/matrix.json' ),
			mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( validationData.data );
		d2 = new Float32Array( validationData.expected );

		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat, {
			'dtype': 'float32',
			'mu': validationData.mu,
			'sigma': validationData.sigma
		});

		assert.strictEqual( out.dtype, 'float32' );
		for ( i = 0; i < out.length; i++ ) {
			assert.closeTo( out.data[ i ], d2[ i], 1e-14 );
		}
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( pdf( [] ), [] );
		assert.deepEqual( pdf( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( pdf( new Int8Array() ), new Float64Array() );
	});

});
