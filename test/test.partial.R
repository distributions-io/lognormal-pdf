options( digits = 16 );
library( jsonlite );

mu = 3
sigma = 6
x = c( 0, 2, 20, 200 )
y = dlnorm( x, mu, sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/json/partial.json" )
