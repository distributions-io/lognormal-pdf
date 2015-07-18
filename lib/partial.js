'use strict';

// FUNCTIONS //

var exp = Math.exp,
	ln = Math.log,
	pow = Math.pow,
	sqrt = Math.sqrt;


// VARIABLES //

var PI = Math.PI;


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma )
*	Partially applies location parameter `mu` and scale parameter `sigma` and returns a function for evaluating the probability density function (PDF) for a Lognormal distribution.
*
* @param {Number} mu - location parameter
* @param {Number} sigma - scale parameter
* @returns {Function} PDF
*/
function partial( mu, sigma ) {
	var s2 = pow( sigma, 2 ),
		A = 1 / ( sqrt( 2 * s2 * PI ) ),
		B = - 1 / ( 2 * s2 );
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Lognormal distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		return x <= 0 ? 0 : (1/x) * A * exp( B * pow( ln( x ) - mu, 2 ) );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
