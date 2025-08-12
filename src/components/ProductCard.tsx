import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';

const ProductCard = React.memo(({ product, onDetail }: { product: any, onDetail: (p: any) => void }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 1 }}>
    <CardMedia 
      component="img" 
      height="200" 
      image={product.image || 'https://via.placeholder.com/200x200?text=No+Image'} 
      alt={product.name} 
      loading="lazy"
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1rem', lineHeight: 1.3 }}>
        {product.name}
      </Typography>
      <Typography color="text.secondary" variant="body2" gutterBottom>
        {product.category}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
        <Typography variant="h6" color="primary" fontWeight={700}>
          ${product.price}
        </Typography>
        {product.originalPrice && (
          <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            ${product.originalPrice}
          </Typography>
        )}
      </Box>
    </CardContent>
    <CardActions sx={{ p: 2, pt: 0 }}>
      <Button size="small" variant="outlined" onClick={() => onDetail(product)} fullWidth>
        View Details
      </Button>
    </CardActions>
  </Card>
));
export default ProductCard;
