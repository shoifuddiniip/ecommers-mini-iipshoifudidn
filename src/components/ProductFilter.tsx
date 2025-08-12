import React from 'react';
import { Box, Select, MenuItem, Slider, Typography } from '@mui/material';

export default function ProductFilter({ categories, filter, setFilter }: any) {
  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      <Select value={filter.category} onChange={e => setFilter((f: any) => ({ ...f, category: e.target.value }))}>
        <MenuItem value="">Semua Kategori</MenuItem>
        {categories.map((cat: string) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
      </Select>
      <Box width={200}>
        <Typography variant="caption">Harga</Typography>
        <Slider
          value={filter.price}
          onChange={(_, v) => setFilter((f: any) => ({ ...f, price: v }))}
          min={0}
          max={1000000}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}
