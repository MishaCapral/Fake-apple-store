//import React from 'react';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/cartItem/CartItem';
import { selectCart } from '../../redux/slices/cartSlice';
import styles from './Ordering.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ListIcon from '@mui/icons-material/List';
import ButtonOutlineRectangle from '../../components/buttons/ButtonOutlineRectangle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik, FormikProvider, getIn } from 'formik';
import * as yup from 'yup';
import { PhoneInputMui } from '../../components/phoneInput/PhoneInput';
import Checkbox from '@mui/material/Checkbox';
import AutocompleteAsync from '../../components/autocomplete/AutocompleteAsync';

const deliveryOptions = {
  post: 'post',
  courier: 'courier',
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name should be of minimum 2 characters length')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name should be of minimum 2 characters length')
    .required('Last name is required'),
  company: yup.string(),
  email: yup
    .string()
    .email('Enter a valid email: example@example.com')
    .required('Email is required'),
  phone: yup
    .string()
    .min(15, 'Enter a valid phone number')
    .required('Phone number is required'),

  deliveryOptions: yup.bool(),

  pickUp: yup.object().shape({
    city: yup.string().required('City is required'),
    office: yup.string().required('Office is required'),
  }),
  courier: yup.object().shape({
    city: yup.string().required('City is required'),
    street: yup.string().required('Street is required'),
    houseNumber: yup.string().required('house number is required'),
  }),
});

const Ordering = () => {
  const navigate = useNavigate();

  const { products } = useSelector(selectCart);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      invoice: false,
      deliveryOptions: deliveryOptions.post,
      pickUp: {
        city: '',
        office: '',
      },
      courier: {
        city: '',
        street: '',
        houseNumber: '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className={styles.wrapper}>
        <div className={styles.order__top}>
          <h2 className={styles.order__title}>
            <BorderColorIcon />
            Ordering
          </h2>

          <ButtonOutlineRectangle callback={() => navigate('/cart')}>
            <ArrowBackIosIcon fontSize='small' />
            <span>Back</span>
          </ButtonOutlineRectangle>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.order__recipients}>
            <div className={styles.subWrapper}>
              <b className={styles.subtitle}>Recipients details</b>

              <TextField
                id='firstName'
                name='firstName'
                label='first name *'
                variant='outlined'
                margin='dense'
                size='small'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                id='lastName'
                name='lastName'
                label='last name *'
                variant='outlined'
                margin='dense'
                size='small'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                id='company'
                name='company'
                label='company'
                variant='outlined'
                margin='dense'
                size='small'
                value={formik.values.company}
                onChange={formik.handleChange}
              />
              <TextField
                id='email'
                name='email'
                label='email *'
                variant='outlined'
                margin='dense'
                size='small'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <PhoneInputMui value={formik.values.phone} formik={formik} />

              <b className={styles.subtitle}>
                Do you need an invoice for your order?{' '}
              </b>
              <FormControlLabel
                control={
                  <Checkbox id='invoice' checked={formik.values.invoice} />
                }
                label='I want to receive an invoice'
                checked={formik.values.invoice}
                onChange={formik.handleChange}
              />

              <p>
                if you do not provide the NIP (Tax Identification Number) and
                other company details in this steep you may not receive an
                invoice for this purchase
              </p>
            </div>
          </div>

          <h2 className={styles.order__title}>
            <ListIcon />
            Delivery options
          </h2>
          <div className={styles.subWrapper}>
            <b className={styles.subtitle}>Purchase</b>
            {products &&
              products.map((item) => (
                <CartItem key={item.renderId} product={item} isOrder={true} />
              ))}
          </div>

          <div className={styles.subWrapper}>
            <b className={styles.subtitle}>Delivery address</b>
            <RadioGroup
              name='deliveryOptions'
              value={formik.values.deliveryOptions}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value={deliveryOptions.post}
                control={<Radio />}
                label='InPoost pick-up point'
              />

              <AutocompleteAsync name='pickUp.city' label='City' type='city' />
              <AutocompleteAsync
                name='pickUp.office'
                label='Office'
                type='office'
              />
              <FormControlLabel
                value={deliveryOptions.courier}
                control={<Radio />}
                label='Courier'
              />
              <TextField
                id='courier.city'
                name='courier.city'
                label='City'
                variant='outlined'
                margin='dense'
                size='small'
                value={formik.values.courier.city}
                onChange={formik.handleChange}
                error={Boolean(
                  getIn(formik.touched, 'courier.city') &&
                    getIn(formik.errors, 'courier.city'),
                )}
                helperText={
                  getIn(formik.touched, 'courier.city') &&
                  getIn(formik.errors, 'courier.city')
                }
              />
              <TextField
                id='courier.street'
                name='courier.street'
                label='Street'
                variant='outlined'
                margin='dense'
                size='small'
                value={formik.values.courier.street}
                onChange={formik.handleChange}
                error={Boolean(
                  getIn(formik.touched, 'courier.street') &&
                    getIn(formik.errors, 'courier.street'),
                )}
                helperText={
                  getIn(formik.touched, 'courier.street') &&
                  getIn(formik.errors, 'courier.street')
                }
              />
              <TextField
                id='courier.houseNumber'
                name='courier.houseNumber'
                label='House number'
                variant='outlined'
                margin='dense'
                size='small'
                value={formik.values.courier.houseNumber}
                onChange={formik.handleChange}
                error={Boolean(
                  getIn(formik.touched, 'courier.houseNumber') &&
                    getIn(formik.errors, 'courier.houseNumber'),
                )}
                helperText={
                  getIn(formik.touched, 'courier.houseNumber') &&
                  getIn(formik.errors, 'courier.houseNumber')
                }
              />
            </RadioGroup>
          </div>

          <Button color='primary' variant='contained' fullWidth type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </FormikProvider>
  );
};

export default Ordering;
