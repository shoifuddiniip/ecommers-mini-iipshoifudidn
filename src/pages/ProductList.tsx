import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, Paper, Button, Chip, Skeleton, Alert, Pagination } from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const categories = ['T-Shirts', 'Jeans', 'Shirts', 'Shorts'];
const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
const sizes = ['S', 'M', 'L', 'XL'];
const PAGE_SIZE = 10;

interface ProductListProps {
  onDetail: (product: any) => void;
}

function useQuery() {
  return new URLSearchParams(window.location.search);
}

const ProductList: React.FC<ProductListProps> = ({ onDetail }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState({ category: '', price: [0, 1000000], colors: [], sizes: [], search: '' } as any);
  const query = useQuery();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const search = query.get('search') || '';
    const url = search
      ? `http://localhost:8000/products?search=${encodeURIComponent(search)}`
      : 'http://localhost:8000/products';
    axios.get(url)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Gagal mengambil data produk');
        setLoading(false);
      });
  }, [query.get('search')]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => {
      const matchCategory = !filter.category || p.category === filter.category;
      const matchPrice = p.price >= filter.price[0] && p.price <= filter.price[1];
      const matchColor = filter.colors.length === 0 || filter.colors.includes(p.color);
      const matchSize = filter.sizes.length === 0 || filter.sizes.includes(p.size);
      const matchSearch = !filter.search ||
        p.name?.toLowerCase().includes(filter.search.toLowerCase()) ||
        p.category?.toLowerCase().includes(filter.search.toLowerCase()) ||
        p.description?.toLowerCase().includes(filter.search.toLowerCase());
      return matchCategory && matchPrice && matchColor && matchSize && matchSearch;
    });
  }, [products, filter]);

  const pagedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  const handleColorFilter = (color: string) => {
    setFilter((f: any) => ({ ...f, colors: f.colors.includes(color) ? f.colors.filter((c: string) => c !== color) : [...f.colors, color] }));
  };
  const handleSizeFilter = (size: string) => {
    setFilter((f: any) => ({ ...f, sizes: f.sizes.includes(size) ? f.sizes.filter((s: string) => s !== size) : [...f.sizes, size] }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" gap={3}>
        {/* Filter Sidebar */}
        <Paper sx={{ width: 240, p: 2, borderRadius: 3, boxShadow: 1, display: { xs: 'none', md: 'block' } }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Filter</Typography>
          {/* Category Filter */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>Category</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {categories.map(cat => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setFilter((f: any) => ({ ...f, category: f.category === cat ? '' : cat }))}
                  variant={filter.category === cat ? "filled" : "outlined"}
                  color={filter.category === cat ? "primary" : "default"}
                />
              ))}
            </Box>
          </Box>
          {/* Price Filter */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>Price</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2">Rp</Typography>
              <input
                type="number"
                value={filter.price[0]}
                min={0}
                max={filter.price[1]}
                onChange={e => setFilter((f: any) => ({ ...f, price: [Number(e.target.value), f.price[1]] }))}
                style={{ width: 60, borderRadius: 4, border: '1px solid #ccc', padding: 4 }}
              />
              <Typography variant="body2">-</Typography>
              <input
                type="number"
                value={filter.price[1]}
                min={filter.price[0]}
                max={1000000}
                onChange={e => setFilter((f: any) => ({ ...f, price: [f.price[0], Number(e.target.value)] }))}
                style={{ width: 60, borderRadius: 4, border: '1px solid #ccc', padding: 4 }}
              />
            </Box>
          </Box>
          {/* Color Filter */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>Color</Typography>
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
            </Typography>
          </Box>
          {loading ? (
            <Box display="flex" flexWrap="wrap" gap={1.25} justifyContent="flex-start">
              {[...Array(PAGE_SIZE)].map((_, i) => (
                <Box key={i} sx={{
                  flex: {
                    xs: '1 1 100%',
                    sm: '1 1 48%',
                    md: '1 1 19%',
                    lg: '1 1 18%',
                    xl: '1 1 18%'
                  },
                  minWidth: 150,
                  maxWidth: 180,
                  mb: '10px',
                }}>
                  <Skeleton variant="rectangular" height={220} />
                </Box>
              ))}
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Box display="flex" flexWrap="wrap" gap={1.25} justifyContent="flex-start">
                {pagedProducts.map(product => (
                  <Box key={product.id} sx={{
                    flex: {
                      xs: '1 1 100%',
                      sm: '1 1 48%',
                      md: '1 1 19%',
                      lg: '1 1 18%',
                      xl: '1 1 18%'
                    },
                    minWidth: 150,
                    maxWidth: 180,
                    mb: '10px',
                  }}>
                    <ProductCard product={product} onDetail={onDetail} />
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
    </div>
  );
};

export default ProductList;
