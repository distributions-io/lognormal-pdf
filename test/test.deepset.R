options( digits = 16 );
library( jsonlite );

mu = 10
sigma = 20
x = seq( 0, 100, 1 )
y = dlnorm( x, mu, sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/deepset.json" )
