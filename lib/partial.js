'use strict';

// FUNCTIONS //


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

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Lognormal distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
