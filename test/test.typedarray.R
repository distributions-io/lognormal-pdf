options( digits = 16 );
library( jsonlite );

mu = 20
sigma = 10
x = seq( 0, 50, 0.5 )
y = dlnorm( x, mu, sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/typedarray.json" )
