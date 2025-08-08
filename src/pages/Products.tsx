import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardActions, Grid, Typography, CircularProgress, CardMedia, Button } from '@mui/material';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={3} align="center">Daftar Produk</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map(product => (
            // <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ minHeight: 220 }}>
                {product.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{product.name}</Typography>
                  <Typography color="text.secondary">Rp {product.price.toLocaleString()}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained">Beli</Button>
                </CardActions>
              </Card>
            // </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Products;
