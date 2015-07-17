'use strict';

// FUNCTIONS //

var exp = Math.exp,
	ln = Math.log,
	pow = Math.pow,
	sqrt = Math.sqrt;


// VARIABLES //

var PI = Math.PI;


// PDF //

/**
* FUNCTION: pdf( x, mu, sigma )
*	Evaluates the probability density function (PDF) for a Lognormal distribution with location parameter `mu` and scale parameter `sigma` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} mu - location parameter
* @param {Number} sigma - scale parameter
* @returns {Number} evaluated PDF
*/
function pdf( x, mu, sigma ) {
	var s2 = pow( sigma, 2 ),
		A = 1 / ( sqrt( 2 * s2 * PI ) ),
		B = - 1 / ( 2 * s2 );
	return (1/x) * A * exp( B * pow( ln( x ) - mu, 2 ) );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
