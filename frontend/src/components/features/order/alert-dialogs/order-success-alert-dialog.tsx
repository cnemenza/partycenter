import { AlertDialog } from '@/components/ui/alert-dialog/alert-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TfiCheckBox } from 'react-icons/tfi';
import { VscFilePdf } from 'react-icons/vsc';

interface OrderConfirmAlertDialogProps {
  title: string;
  orderId: string;
  show: boolean;
  code: string;
  creationDate?: string;
  createdBy?: string;
  hrefConfirm: string;
}

const OrderSuccessAlertDialog = ({
  show,
  title,
  orderId,
  code,
  createdBy,
  creationDate,
  hrefConfirm
}: OrderConfirmAlertDialogProps) => {
  return (
    <AlertDialog
      show={show}
      title={title}
      body={
        <div>
          <ul>
            <li>
              Code : <span className='font-bold'>{code}</span>
            </li>
            <li>Creation Date : {creationDate}</li>
            <li>Created By : {createdBy}</li>
          </ul>
        </div>
      }
      buttons={
        <div className='flex flex-col space-y-3'>
          <Button variant='dark' icon={<VscFilePdf className='w-5 h-5' />}>
            Download PDF
          </Button>

          <Button asChild variant='primary'>
            <Link href={hrefConfirm}>
              <TfiCheckBox className='h-5 w-5' /> Confirm
            </Link>
          </Button>
        </div>
      }
    />
  );
};

export { OrderSuccessAlertDialog, type OrderConfirmAlertDialogProps };
