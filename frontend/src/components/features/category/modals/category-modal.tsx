import { Modal } from '@/components/ui/modal';
import { CategoryForm } from '../forms/category-form';

interface CategoryModalProps {
  title: string;
  show: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  editId: string | null;
}

const CategoryModal = ({ title, show, handleClose, onSuccess, editId }: CategoryModalProps) => {
  return (
    <Modal title={title} show={show} isStatic={true} handleClose={handleClose}>
      <CategoryForm onSuccess={onSuccess} handleClose={handleClose} editId={editId} />
    </Modal>
  );
};

export { CategoryModal };
