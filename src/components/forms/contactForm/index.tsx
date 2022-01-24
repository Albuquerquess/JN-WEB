import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';

import URLs from '../../../helpers/URLs';
import Api from '../../../services/api';
import { addContact } from '../../../store/actions/contacts';
import { reducersType } from '../../../store/reducers';
import { IRegisterNewLeadProps } from '../../../types/forms/contacts';
import { IContact } from '../../../types/redux/contacts';
import Button from '../../button';
import Input from '../../input';
import { Container } from './styles';

const ContactForm: React.FC = () => {
  const { addToast, removeAllToasts } = useToasts();
  const navigate = useNavigate();
  const contacts: IContact = useSelector(
    (state: reducersType) => state.contacts,
  );
  const dispatch = useDispatch();
  async function registerNewLead({
    name,
    email,
    phone,
  }: IRegisterNewLeadProps) {
    addToast('Salvando informações', {
      appearance: 'info',
      autoDismiss: true,
    });
    const response = await Api.post(URLs.leadRegister, {
      name,
      email,
      phone,
    });

    if (response.status === 204) {
      dispatch(
        addContact({
          name,
          email,
          phone,
        }),
      );

      navigate('/detalhes');
      removeAllToasts();
      addToast('Informaçõoes salvas', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast('Erro ao salvar as informações', {
        appearance: 'error',
        autoDismiss: false,
      });
    }
  }
  const formik = useFormik({
    initialValues: {
      name: contacts.name || '',
      email: contacts.email || '',
      phone: contacts.phone || '',
    },
    validationSchema: yup.object({
      name: yup.string().required('O campo nome deve ser informado'),
      email: yup
        .string()
        .email('O email é inválido')
        .required('O campo email deve ser informado'),
      phone: yup
        .string()
        .matches(/^[0-9]{11}$/, 'Insira um telefone inválido (84996465565)')
        .required('O campo telefone deve ser informado'),
    }),
    onSubmit: values => {
      registerNewLead(values);
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div id="input-group">
          <Input
            label="Nome completo"
            value={formik.values.name}
            onChangeValue={formik.handleChange}
            onInputBlur={formik.handleBlur}
            name="name"
            type="text"
            placeholder="Gustavo de Albuquerque Ramalho"
            error={formik.errors.name}
          />

          <Input
            label="Email"
            value={formik.values.email}
            onChangeValue={formik.handleChange}
            onInputBlur={formik.handleBlur}
            name="email"
            type="text"
            placeholder="exemplo@email.com"
            error={formik.errors.email}
          />

          <Input
            label="Telefone"
            value={formik.values.phone}
            onChangeValue={formik.handleChange}
            onInputBlur={formik.handleBlur}
            name="phone"
            type="text"
            placeholder="DDD + Número. Ex: 84996465565"
            error={formik.errors.phone}
          />
        </div>
        <Button handleClick={formik.handleSubmit} />
      </form>
    </Container>
  );
};

export default ContactForm;
