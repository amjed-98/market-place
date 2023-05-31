import { type SyntheticEvent, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAlert, useTranslate } from '@/hooks';
import { PaymentIntent, StripeError } from '@stripe/stripe-js';
import classes from './style.module.css';

type Props = {
  onSuccess: (paymentIntent: PaymentIntent) => void;
};

export default function StripeCheckoutForm({ onSuccess }: Props) {
  const { handleSubmit, isLoading } = useStripePayment({ onSuccess });

  return (
    <div className={classes['form-container']}>
      <form className={classes['payment-form']} onSubmit={handleSubmit}>
        <PaymentElement className={classes['payment-element']} />
        <div className='grid place-items-center'>
          <button className={classes['submit-button']} type='submit' disabled={isLoading}>
            <span className={classes['button-text']}>
              {isLoading ? <div className={classes.spinner} /> : 'Pay now'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

function useStripePayment({ onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslate('common');

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!stripe || !elements) return;

      setIsLoading(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) throw error;

      switch (paymentIntent.status) {
        case 'processing':
          showAlert('info', { message: 'Your payment is processing.' });
          break;

        case 'requires_payment_method':
          showAlert('info', { message: 'Please enter your payment information.' });
          break;

        case 'requires_capture':
          onSuccess(paymentIntent);
          break;

        default:
          showAlert('error', { message: t('errors.generic') });
          break;
      }
    } catch (error) {
      if (!isStripeError(error)) {
        showAlert('error', { message: t('errors.generic') });
        return;
      }

      const isValidationError = ['card_error', 'validation_error'].includes(error.type);

      if (isValidationError) showAlert('error', { message: error.message || t('errors.generic') });
      else showAlert('error', { message: t('errors.generic') });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading: isLoading || !stripe || !elements };
}

function isStripeError(error: any): error is StripeError {
  return 'type' in error;
}
