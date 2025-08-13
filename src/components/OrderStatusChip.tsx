import React from 'react';
import { Chip } from '@mui/material';

interface OrderStatusChipProps {
  status: string;
}

const statusColor: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  PAID: 'success',
  UNPAID: 'warning',
  PENDING: 'info',
  CANCELLED: 'error',
};

const statusLabel: Record<string, string> = {
  PAID: 'Lunas',
  UNPAID: 'Belum Bayar',
  PENDING: 'Menunggu',
  CANCELLED: 'Dibatalkan',
};

const OrderStatusChip: React.FC<OrderStatusChipProps> = ({ status }) => {
  return (
    <Chip
      label={statusLabel[status] || status}
      color={statusColor[status] || 'default'}
      size="small"
      sx={{ fontWeight: 700, letterSpacing: 0.5 }}
    />
  );
};

export default OrderStatusChip;
