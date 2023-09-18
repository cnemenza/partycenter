import { FormField, FormHeader } from '@/components/form/form';
import { Input } from '@/components/form/input';
import { Col, Row } from '@/components/ui/grid';
import { Client } from '@/services/client.service';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FcBusinessman } from 'react-icons/fc';

interface CLientInformationInputs {
  register: UseFormRegister<Client>;
  errors: FieldErrors<Client>;
}

const ClientInformationInputs = ({ errors, register }: CLientInformationInputs) => {
  return (
    <>
      <FormHeader icon={<FcBusinessman className='w-5 h-5' />} text='Client Information' />
      <Row className='sm:grid-cols-2'>
        <Col>
          <FormField error={errors?.name}>
            <Input {...register('name')} type='text' label='Name' placeholder='Enter name' maxLength={80} />
          </FormField>
        </Col>
        <Col>
          <FormField error={errors?.lastName}>
            <Input
              {...register('lastName')}
              type='text'
              label='Last Name'
              placeholder='Enter last name'
              maxLength={80}
            />
          </FormField>
        </Col>
      </Row>

      <Row>
        <Col>
          <FormField error={errors?.email}>
            <Input {...register('email')} type='text' label='Email' placeholder='Enter email' maxLength={200} />
          </FormField>
        </Col>
      </Row>

      <Row className='sm:grid-cols-2'>
        <Col>
          <FormField error={errors?.phone}>
            <Input {...register('phone')} type='text' label='Phone' placeholder='Enter phone' maxLength={200} />
          </FormField>
        </Col>
        <Col>
          <FormField error={errors?.secondaryPhone}>
            <Input
              {...register('secondaryPhone')}
              type='text'
              label='Secondary Phone'
              placeholder='Enter secondary phone'
              maxLength={200}
            />
          </FormField>
        </Col>
      </Row>
    </>
  );
};

export { ClientInformationInputs };
