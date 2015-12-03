options( digits = 16 );
library( jsonlite );

mu = 2
sigma = 1
x = seq( 0, 2.5, 0.5 )
y = dlnorm( x, mu, sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/array.json" )
