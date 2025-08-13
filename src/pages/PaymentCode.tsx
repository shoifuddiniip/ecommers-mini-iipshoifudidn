import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getOrderDetail } from '../api/orderApi';
import { Box, Typography, Paper } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';


const PaymentCode: React.FC<{ code: string }> = ({ code }) => {
  const { orderId } = useParams();
  const token = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderId && token) {
      const checkStatus = async () => {
        setChecking(true);
        try {
          const detail = await getOrderDetail(orderId, token);
          setStatus(detail.status);
          if (detail.status === 'paid') {
            clearInterval(interval);
            setTimeout(() => navigate('/orders'), 1200);
          }
        } catch {}
        setChecking(false);
      };
      checkStatus();
      interval = setInterval(checkStatus, 3000);
    }
    return () => clearInterval(interval);
  }, [orderId, token, navigate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={300}>
      <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Scan Barcode Pembayaran</Typography>
        <QRCodeSVG value={code} size={200} />
        <Typography variant="subtitle1" mt={2}>Kode Pembayaran:</Typography>
        <Typography fontWeight={700} fontSize={20}>{code}</Typography>
        <Typography color="text.secondary" mt={2}>Silakan scan barcode ini untuk menyelesaikan pembayaran.</Typography>
        <Typography color={status === 'paid' ? 'success.main' : 'warning.main'} mt={3} fontWeight={700}>
          Status: {status === 'paid' ? 'Pembayaran Berhasil' : 'Menunggu Pembayaran...'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PaymentCode;
