import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap-v5';
import {useDispatch} from 'react-redux';
import {addToast} from '../../../store/action/toastAction';
import {toastType} from '../../../constants';
import { BsArrowClockwise } from "react-icons/bs";
import { getFormattedMessage } from '../../../shared/sharedMethod';
import ResetCartConfirmationModal from "./ResetCartConfirmationModal";

const PaymentButton = (props) => {
    const {updateProducts, setCashPayment, cartItemValue, grandTotal, subTotal, setCartItemValue, setUpdateProducts} = props;
    const dispatch = useDispatch();
    const qtyCart = updateProducts.filter((a) => a.quantity === 0);
    const [isReset, setIsReset] = useState(false)

    //cash model open onClick
    const openPaymentModel = () => {
        if(!updateProducts.length > 0 || qtyCart.length > 0 || cartItemValue.tax > 100 || Number(cartItemValue.discount) > grandTotal || Number(cartItemValue.shipping) > Number(subTotal)) {
            !updateProducts.length > 0 && dispatch(addToast({text: getFormattedMessage('pos.cash-payment.product-error.message'), type: toastType.ERROR}));
            qtyCart.length > 0 && dispatch(addToast({text: getFormattedMessage('pos.cash-payment.quantity-error.message'), type: toastType.ERROR}));
            updateProducts.length > 0 && (cartItemValue.tax) > 100 && dispatch(addToast({text: getFormattedMessage('pos.cash-payment.tax-error.message'), type: toastType.ERROR}));
            updateProducts.length > 0 && Number(cartItemValue.discount) > grandTotal && dispatch(addToast({text: getFormattedMessage('pos.cash-payment.total-amount-error.message'), type: toastType.ERROR}));
            updateProducts.length > 0 && Number(cartItemValue.shipping) > Number(subTotal) && dispatch(addToast({text: getFormattedMessage('pos.cash-payment.sub-total-amount-error.message'), type: toastType.ERROR}));
       } else if (updateProducts.length > 0 && !qtyCart.length) {
            setCashPayment(true);
        }
    };

    const resetPaymentModel = () => {
        if(updateProducts.length > 0 || qtyCart.length < 0 || cartItemValue.tax > 100 || Number(cartItemValue.discount) > grandTotal || Number(cartItemValue.shipping) > Number(subTotal)){
            setIsReset(true)
        }
    }

    // handle what happens on key press
  const handleKeyPress = (event) => {
    if (event.altKey && event.code === 'KeyR') {
            return resetPaymentModel()
        } else if (event.altKey && event.code === 'KeyS') {
            return openPaymentModel()
        }
  };

  useEffect(() => {
    // attach the event listener
    window.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
        window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

const onConfirm = () => {
    setUpdateProducts([])
    setCartItemValue({
        discount: 0,
        tax: 0,
        shipping: 0
    })
    setIsReset(false)
}

const onCancel = () => {
    setIsReset(false)
}

    return (
        // <div className='d-xl-flex align-items-center justify-content-between'>
        //      <h5 className='mb-0'>Payment Method</h5>
             <div className='d-flex align-items-center justify-content-between'>
                 <Button type='button' variant='anger' className='text-white btn-danger btn-rounded btn-block me-2 w-100 py-3 rounded-10 px-3'
                         onClick={resetPaymentModel}>{getFormattedMessage('date-picker.filter.reset.label')} <BsArrowClockwise className="fs-4"/></Button>
                 <Button type='button' variant='success' className='text-white ms-2 w-100 py-3 rounded-10 px-3'
                         onClick={openPaymentModel}>{getFormattedMessage('pos-pay-now.btn')}<i className='ms-2 fa fa-money-bill'/></Button>
                 {/*<Button type='button' className='text-white me-xl-3 me-2 mb-2 custom-btn-size'>*/}
                 {/*    Debit<i className='ms-2 fa fa-credit-card text-white'/></Button>*/}
                 {/*<Button type='button' variant='secondary' className='me-xl-0 me-2 mb-2 custom-btn-size'>*/}
                 {/*    E-Wallet<i className='ms-2 fa fa-wallet text-white'/></Button>*/}
                 {isReset && <ResetCartConfirmationModal onConfirm={onConfirm} onCancel={onCancel} itemName={getFormattedMessage("globally.detail.product")} />}

             </div>
        // </div>
    )
};
export default PaymentButton;
