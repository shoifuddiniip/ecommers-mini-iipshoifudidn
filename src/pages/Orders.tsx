import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Box, Typography, List, ListItem, ListItemText, Card, CardContent, CircularProgress, Alert } from '@mui/material';

interface Order {
  id: number;
  created_at: string;
  items: { name: string; quantity: number; price: number }[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
  fetch('http://localhost:8000/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data');
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Gagal mengambil data pesanan');
        setLoading(false);
      });
  }, [token]);

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
            <ListItem key={order.id} alignItems="flex-start" disableGutters>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>Pesanan #{order.id}</Typography>
                  <Typography variant="body2" color="text.secondary">Tanggal: {order.created_at}</Typography>
                  <List sx={{ pl: 2 }}>
                    {order.items.map((item, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemText
                          primary={`${item.name} x${item.quantity}`}
                          secondary={`Rp ${item.price.toLocaleString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Orders;
