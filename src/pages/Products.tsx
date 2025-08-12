
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import ProductList from './ProductList';
import ProductDetailModal from './ProductDetailModal';

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  return (
    <>
      <ProductList onDetail={setSelectedProduct} />
      <Dialog open={!!selectedProduct} onClose={() => setSelectedProduct(null)} maxWidth="sm" fullWidth>
        <DialogContent>
          {selectedProduct && (
            <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Products;
