import { Modal } from '@/components/ui/modal';
import { DeliveryForm } from '../forms/delivery-form';

interface DeliveryModalProps {
  title: string;
  show: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  editId: string | null;
}

const DeliveryModal = ({ title, show, handleClose, onSuccess, editId }: DeliveryModalProps) => {
  return (
    <Modal title={title} show={show} isStatic={true} handleClose={handleClose}>
      <DeliveryForm onSuccess={onSuccess} handleClose={handleClose} editId={editId} />
    </Modal>
  );
};

export { DeliveryModal };
