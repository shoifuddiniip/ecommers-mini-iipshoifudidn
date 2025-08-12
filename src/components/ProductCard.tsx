import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';

const ProductCard = React.memo(({ product, onDetail }: { product: any, onDetail: (p: any) => void }) => (
  <Card sx={{ height: 260, minWidth: 180, maxWidth: 220, display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 1 }}>
    <CardMedia 
      component="img" 
      height="110" 
      image={product.image || 'https://via.placeholder.com/220x120?text=No+Image'} 
      alt={product.name} 
      loading="lazy"
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1, p: 1, pb: 0.5 }}>
      <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ fontSize: '0.85rem', lineHeight: 1.2 }} noWrap>
        {product.name}
      </Typography>
      <Typography color="text.secondary" variant="caption" gutterBottom noWrap>
        {product.category}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
        <Typography variant="subtitle1" color="primary" fontWeight={700} sx={{ fontSize: '0.95rem' }}>
          ${product.price}
        </Typography>
        {product.originalPrice && (
          <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            ${product.originalPrice}
          </Typography>
        )}
      </Box>
    </CardContent>
    <CardActions sx={{ p: 1, pt: 0, pb: 1 }}>
      <Button size="small" variant="outlined" onClick={() => onDetail(product)} fullWidth sx={{ fontSize: '0.8rem', py: 0.5 }}>
        View
      </Button>
    </CardActions>
  </Card>
));
export default ProductCard;
