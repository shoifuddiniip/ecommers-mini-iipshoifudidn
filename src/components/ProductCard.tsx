import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { IMAGE_URL } from '../utils/imageurl';

const ProductCard = React.memo(({ product, onDetail }: { product: any, onDetail: (p: any) => void }) => (
  <Card sx={{ height: 270, minWidth: 180, maxWidth: 220, display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 1 }}>
    <CardMedia 
      component="img" 
      image={ IMAGE_URL + product.image || 'https://via.placeholder.com/220x120?text=No+Image'} 
      alt={product.name} 
      loading="lazy"
      sx={{ objectFit: 'fill', width: '100%', height: 140 }}
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
          Rp{product.price.toLocaleString('id-ID')}
        </Typography>
        {product.originalPrice && (
          <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            Rp{product.originalPrice.toLocaleString('id-ID')}
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
