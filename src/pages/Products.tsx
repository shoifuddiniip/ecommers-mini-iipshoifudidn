
import React, { useEffect, useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Pagination, 
  Skeleton, 
  Alert, 
  Dialog, 
  DialogContent,
  Paper,
  Chip,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
} from '@mui/material';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  color?: string;
  size?: string;
  [key: string]: any;
}

const PAGE_SIZE = 9;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ 
    category: '', 
    price: [0, 1000000], 
    colors: [] as string[], 
    sizes: [] as string[] 
  });
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    // Dummy data
    const dummy = [
      { id: 1, name: 'Gradient Graphic T-Shirt', price: 180, image: 'https://via.placeholder.com/300x300?text=Shirt+1', category: 'T-Shirts', color: 'Red', size: 'M' },
      { id: 2, name: 'Polo with Tipping Details', price: 150, image: 'https://via.placeholder.com/300x300?text=Shirt+2', category: 'T-Shirts', color: 'Blue', size: 'L' },
      { id: 3, name: 'Black Striped T-Shirt', price: 130, image: 'https://via.placeholder.com/300x300?text=Shirt+3', category: 'T-Shirts', color: 'Black', size: 'S' },
      { id: 4, name: 'Skinny Fit Jeans', price: 240, image: 'https://via.placeholder.com/300x300?text=Jeans+1', category: 'Jeans', color: 'Blue', size: 'M', originalPrice: 260 },
      { id: 5, name: 'Checkered Shirt', price: 180, image: 'https://via.placeholder.com/300x300?text=Shirt+4', category: 'Shirts', color: 'Red', size: 'L' },
      { id: 6, name: 'Sleeve Striped T-Shirt', price: 150, image: 'https://via.placeholder.com/300x300?text=Shirt+5', category: 'T-Shirts', color: 'Orange', size: 'M', originalPrice: 180 },
      { id: 7, name: 'Vertical Striped Shirt', price: 212, image: 'https://via.placeholder.com/300x300?text=Shirt+6', category: 'Shirts', color: 'Green', size: 'XL', originalPrice: 232 },
      { id: 8, name: 'Orange Graphic T-Shirt', price: 145, image: 'https://via.placeholder.com/300x300?text=Shirt+7', category: 'T-Shirts', color: 'Orange', size: 'S' },
      { id: 9, name: 'Loose Fit Bermuda Shorts', price: 80, image: 'https://via.placeholder.com/300x300?text=Shorts+1', category: 'Shorts', color: 'Blue', size: 'M' },
    ];
    setTimeout(() => {
      setProducts(dummy);
      setLoading(false);
    }, 800);
    // Uncomment below to use real API
    // fetch('http://localhost:8000/products')
    //   .then(res => {
    //     if (!res.ok) throw new Error('Gagal fetch produk');
    //     return res.json();
    //   })
    //   .then(data => {
    //     setProducts(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setLoading(false);
    //   });
  }, []);

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category).filter(Boolean))), [products]);
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Black', 'White', 'Gray'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filteredProducts = useMemo(() =>
    products.filter(p =>
      (!filter.category || p.category === filter.category) &&
      (p.price >= filter.price[0] && p.price <= filter.price[1]) &&
      (filter.colors.length === 0 || filter.colors.includes(p.color ?? '')) &&
      (filter.sizes.length === 0 || (typeof p.size === 'string' && filter.sizes.includes(p.size)))
    ),
    [products, filter]
  );

  const pagedProducts = useMemo(() =>
    filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredProducts, page]
  );

  useEffect(() => { setPage(1); }, [filter]);

  const handleColorFilter = (color: string) => {
    setFilter(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSizeFilter = (size: string) => {
    setFilter(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  return (
    <Container maxWidth="xl">
      <Box display="flex" gap={3} mt={2}>
        {/* Sidebar Filter */}
        <Paper sx={{ width: 250, p: 2, height: 'fit-content' }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Filter</Typography>
          
          {/* Category Filter */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>Category</Typography>
            {categories.map(category => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox 
                    checked={filter.category === category}
                    onChange={() => setFilter(prev => ({ ...prev, category: prev.category === category ? '' : (category || '') }))}
                  />
                }
                label={category}
                sx={{ display: 'block' }}
              />
            ))}
          </Box>

          {/* Price Filter */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>Price</Typography>
            <Slider
              value={filter.price}
              onChange={(_, newValue) => setFilter(prev => ({ ...prev, price: newValue as number[] }))}
              valueLabelDisplay="auto"
              min={0}
              max={1000000}
              step={10000}
            />
            <Typography variant="caption">
              ${filter.price[0].toLocaleString()} - ${filter.price[1].toLocaleString()}
            </Typography>
          </Box>

          {/* Color Filter */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>Colors</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {colors.map(color => (
                <Box
                  key={color}
                  onClick={() => handleColorFilter(color)}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: color.toLowerCase(),
                    border: filter.colors.includes(color) ? '3px solid #000' : '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Size Filter */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>Size</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {sizes.map(size => (
                <Chip
                  key={size}
                  label={size}
                  onClick={() => handleSizeFilter(size)}
                  variant={filter.sizes.includes(size) ? "filled" : "outlined"}
                  color={filter.sizes.includes(size) ? "primary" : "default"}
                />
              ))}
            </Box>
          </Box>

          <Button variant="outlined" fullWidth onClick={() => setFilter({ category: '', price: [0, 1000000], colors: [], sizes: [] })}>
            Clear All
          </Button>
        </Paper>

        {/* Main Content */}
        <Box flex={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Showing {filteredProducts.length} of {products.length} products
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sort by: Best Match ▼
            </Typography>
          </Box>

          {loading ? (
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
              {[...Array(PAGE_SIZE)].map((_, i) => (
                <Box key={i} width={{ xs: '100%', sm: '48%', md: '32%' }} minWidth={220} maxWidth={350} flexGrow={1}>
                  <Skeleton variant="rectangular" height={300} />
                </Box>
              ))}
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
                {pagedProducts.map(product => (
                  <Box key={product.id} width={{ xs: '100%', sm: '48%', md: '32%' }} minWidth={220} maxWidth={350} flexGrow={1}>
                    <ProductCard product={product} onDetail={setSelectedProduct} />
                  </Box>
                ))}
              </Box>
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(filteredProducts.length / PAGE_SIZE)}
                  page={page}
                  onChange={(_, v) => setPage(v)}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Dialog open={!!selectedProduct} onClose={()=>setSelectedProduct(null)} maxWidth="sm" fullWidth>
        <DialogContent>
          {selectedProduct && (
            <Box>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{width:'100%',maxHeight:300,objectFit:'contain',marginBottom:16}} loading="lazy" />
              <Typography variant="h5" fontWeight={700}>{selectedProduct.name}</Typography>
              <Typography color="text.secondary">{selectedProduct.category}</Typography>
              <Typography variant="h6" color="primary">Rp {selectedProduct.price.toLocaleString()}</Typography>
              <Typography mt={2}>{selectedProduct.description}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Products;
