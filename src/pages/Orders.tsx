import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Box, Typography, List, ListItem, ListItemText, Card, CardContent, CircularProgress, Alert, Button, Chip, Stack } from '@mui/material';
import OrderStatusChip from '../components/OrderStatusChip';
import OrderBarcodeDialog from '../components/OrderBarcodeDialog';
import { getOrders } from '../api/orderApi';

interface Order {
  orderId: string;
  created_at: string;
  payment_status?: string;
  paymentCode?: string;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  promoCode?: string | null;
  total?: number;
  items: { name: string; qty: number; price: number }[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [barcodeOpen, setBarcodeOpen] = useState<{ open: boolean; code: string }>({ open: false, code: '' });
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    (async () => {
      try {
        const data = await getOrders(userId, token);
        if (!Array.isArray(data)) {
          setError('Format data pesanan tidak valid');
          setOrders([]);
        } else {
          setOrders(data);
        }
        setLoading(false);
      } catch (err) {
        setError('Gagal mengambil data pesanan');
        setLoading(false);
      }
    })();
  }, [userId, token]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={3} align="center">Daftar Pesanan</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : orders.length === 0 ? (
        <Typography align="center">Belum ada pesanan.</Typography>
      ) : (
        <List>
          {orders.map(order => (
            <ListItem key={order.orderId} alignItems="flex-start" disableGutters sx={{ mb: 2 }}>
              <Card sx={{ width: '100%', borderRadius: 4, boxShadow: 2, p: 2, bgcolor: '#fafbfc' }}>
                <CardContent sx={{ pb: '16px !important' }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={1}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} fontSize={18} mb={0.5}>Pesanan #{order.orderId}</Typography>
                      <Typography variant="body2" color="text.secondary">Tanggal: {order.created_at}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} fontSize={18} mb={0.5}>Pesanan #{order.orderId}</Typography>
                      <Typography variant="body2" color="text.secondary">Kode Pembayaran : {order.paymentCode && <>{order.paymentCode}</>}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {order.payment_status && <OrderStatusChip status={order.payment_status.toUpperCase()} />}
                      {order.payment_status && order.payment_status.toUpperCase() === 'PENDING' && order.paymentCode && (
                        <Button variant="outlined" size="small" sx={{ ml: 1 }} onClick={() => setBarcodeOpen({ open: true, code: order.paymentCode! })}>
                          Lihat Barcode
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    <List sx={{ pl: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 0, mt: 1 }}>
                      {order.items.map((item, idx) => (
                        <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={<span style={{ fontWeight: 500 }}>{item.name}</span>}
                            secondary={<span style={{ color: '#888' }}>x{item.qty} &nbsp;|&nbsp; Rp {(item.price && item.price.toLocaleString) ? item.price.toLocaleString() : item.price || 0}</span>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography color="text.secondary" fontSize={14} sx={{ pl: 2 }}>
                      Tidak ada rincian item pesanan.
                    </Typography>
                  )}
                  {/* Order summary */}
                  <Box mt={2} sx={{ bgcolor: '#f7f7fa', borderRadius: 2, p: 2 }}>
                    <Stack spacing={0.5}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Subtotal</Typography>
                        <Typography fontWeight={700}>Rp{order.subtotal?.toLocaleString('id-ID') ?? '-'}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Discount</Typography>
                        <Typography color="error.main" fontWeight={700}>-Rp{order.discount?.toLocaleString('id-ID') ?? '-'}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Delivery Fee</Typography>
                        <Typography fontWeight={700}>Rp{order.deliveryFee?.toLocaleString('id-ID') ?? '-'}</Typography>
                      </Box>
                      {order.promoCode && (
                        <Box display="flex" justifyContent="space-between">
                          <Typography color="text.secondary">Promo Code</Typography>
                          <Typography fontWeight={700}>{order.promoCode}</Typography>
                        </Box>
                      )}
                      <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography fontWeight={700}>Total</Typography>
                        <Typography fontWeight={900} fontSize={18}>Rp{order.total?.toLocaleString('id-ID') ?? '-'}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
      {/* Popup Barcode */}
      <OrderBarcodeDialog open={barcodeOpen.open} onClose={() => setBarcodeOpen({ open: false, code: '' })} paymentCode={barcodeOpen.code} />
    </Box>
  );
};

export default Orders;
