import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';

import Button from '../../../components/button';
import Input from '../../../components/input';
import Requests from '../../../services/api';
import { adminLogin, adminTryLogin } from '../../../store/actions/users/admin';
import { IAppState } from '../../../store/types';
import { ILogin } from '../../../types/forms/login';
import { ITryAdminLogin } from '../../../types/redux/users/admin';
import logger from '../../../utils/logger';
import { Container } from './styles';

const Login: React.FC = () => {
  const admin: ITryAdminLogin = useSelector(
    (state: IAppState) => state.admin.authData,
  );
  const token: string = useSelector((state: IAppState) => state.admin.token);
  const { addToast, removeAllToasts } = useToasts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }: ILogin) => {
    dispatch(
      adminTryLogin({
        username,
        password,
      }),
    );

    const auth = await Requests.authAdmin(username, password);
    logger.log('Admin page - Auth', auth);

    removeAllToasts();
    if (auth.error) {
      addToast(auth.message || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    dispatch(
      adminLogin({
        name: auth.data.user.name,
        siteOwner: auth.data.user.siteOwner,
        token: auth.data.token,
      }),
    );

    addToast(
      `Bem vindo${auth.data.user.name ? `, ${auth.data.user.name}!` : '!'}`,
      {
        appearance: 'success',
        autoDismiss: true,
      },
    );

    navigate('ambientes');
  };

  const formik = useFormik({
    initialValues: {
      username: admin.username || '',
      password: admin.password || '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .trim()
        .matches(
          /[A-Z]{4}[0-9]{3}/,
          'O login deve ser composto por 4 letras maiusculas e 3 números!',
        )
        .required('Você deve informar o login!'),
      password: yup
        .string()
        .min(5, 'A senha deve conter no mínimo 5 caracteres!')
        .max(10, 'A senha deve conter no máximo 10 caracteres!')
        .trim()
        .required('Você deve informar a senha!'),
    }),
    onSubmit: values => {
      handleLogin(values);
    },
  });

  React.useEffect(() => {
    if (token) {
      navigate('ambientes');
    }
  }, []);

  return (
    <Container>
      <h1>Fazer login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div id="input-group">
          <Input
            label="Login"
            value={formik.values.username}
            onChangeValue={formik.handleChange}
            onInputBlur={formik.handleBlur}
            name="username"
            type="text"
            placeholder="AAAA123"
            error={formik.errors.username}
          />

          <Input
            label="Senha"
            value={formik.values.password}
            onChangeValue={formik.handleChange}
            onInputBlur={formik.handleBlur}
            name="password"
            type="text"
            placeholder="**********"
            error={formik.errors.password}
          />
        </div>
        <Button handleClick={formik.handleSubmit} />
      </form>
    </Container>
  );
};

export default Login;
