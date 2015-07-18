options( digits = 16 );
library( jsonlite );

mu = 12
sigma = 10
x = 0:24
y = dlnorm( x, mu, sigma )

cat( y, sep = ",\n" )

data = list(
	mu = mu,
	sigma = sigma,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/json/matrix.json" )
