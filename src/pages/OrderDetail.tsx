
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Box, Typography, Paper, Divider, Button, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { getOrderDetail } from '../api/orderApi';

const OrderDetail: React.FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const token = useSelector((state: RootState) => state.user.token);
	const navigate = useNavigate();
	const [order, setOrder] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!orderId || !token) return;
		(async () => {
			try {
				const data = await getOrderDetail(orderId, token);
				setOrder(data);
				setLoading(false);
			} catch {
				setError('Gagal mengambil detail order');
				setLoading(false);
			}
		})();
	}, [orderId, token]);

	if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}><CircularProgress /></Box>;
	if (error) return <Alert severity="error">{error}</Alert>;
	if (!order) return <Typography>Order tidak ditemukan.</Typography>;

	return (
		<Box maxWidth={600} mx="auto" mt={4}>
			<Paper sx={{ p: 3, borderRadius: 3 }}>
				<Typography variant="h5" fontWeight={700} mb={2}>Order Detail</Typography>
				<Typography variant="subtitle1">Nomor Order: <b>#{order.id}</b></Typography>
				<Typography variant="body2" color="text.secondary">Tanggal: {order.created_at}</Typography>
				<Divider sx={{ my: 2 }} />
				<Typography variant="subtitle1" fontWeight={600} mb={1}>Pesanan:</Typography>
				<List>
					{order.items.map((item: any, idx: number) => (
						<ListItem key={idx} disableGutters>
							<ListItemText
								primary={`${item.name} x${item.quantity}`}
								secondary={`Rp ${item.price.toLocaleString('id-ID')}`}
							/>
						</ListItem>
					))}
				</List>
				<Divider sx={{ my: 2 }} />
				<Box display="flex" justifyContent="space-between" mb={1}>
					<Typography>Subtotal</Typography>
					<Typography fontWeight={700}>Rp{order.subtotal.toLocaleString('id-ID')}</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between" mb={1}>
					<Typography>Discount</Typography>
					<Typography color="error.main" fontWeight={700}>-Rp{order.discount.toLocaleString('id-ID')}</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between" mb={1}>
					<Typography>Total</Typography>
					<Typography fontWeight={900} fontSize={18}>Rp{order.total.toLocaleString('id-ID')}</Typography>
				</Box>
				{order.promoCode && (
					<Box display="flex" justifyContent="space-between" mb={1}>
						<Typography>Kode Promo</Typography>
						<Typography fontWeight={700}>{order.promoCode}</Typography>
					</Box>
				)}
				<Divider sx={{ my: 2 }} />
				<Button variant="contained" onClick={() => navigate('/orders')}>Kembali ke Daftar Order</Button>
			</Paper>
		</Box>
	);
};

export default OrderDetail;
