import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { QRCodeSVG } from 'qrcode.react';

interface OrderBarcodeDialogProps {
  open: boolean;
  onClose: () => void;
  paymentCode: string;
}

const OrderBarcodeDialog: React.FC<OrderBarcodeDialogProps> = ({ open, onClose, paymentCode }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Kode Pembayaran
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={2}>
          <QRCodeSVG value={paymentCode} size={180} />
          <Box mt={2} fontWeight={700} fontSize={18}>{paymentCode}</Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderBarcodeDialog;
