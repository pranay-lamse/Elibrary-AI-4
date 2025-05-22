import React from 'react';
import {Modal, Form, Table} from 'react-bootstrap';
import { currencySymbolHendling, getFormattedMessage, placeholderText } from '../../../../shared/sharedMethod';
import ReactSelect from '../../../../shared/select/reactSelect';

const CashPaymentModel = (props) => {
    const {
        handleCashPayment, cashPaymentValue, cashPayment, onChangeInput, onCashPayment, grandTotal, totalQty,
        cartItemValue, taxTotal, settings, subTotal, errors, onPaymentTypeChange,
        paymentTypeDefaultValue, paymentTypeFilterOptions, allConfigData
    } = props;

    return (
        <Modal show={cashPayment} onHide={handleCashPayment} size='lg' className="pos-modal">
            <Modal.Header closeButton>
                <Modal.Title>{getFormattedMessage('pos-make-Payment.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form.Group className='mb-3' controlId='formBasicReceived_amount'>
                            <Form.Label>{getFormattedMessage('pos-received-amount.title')}: </Form.Label>
                            <Form.Control type='text' name='received_amount' autoComplete='off' readOnly={true}
                                          className='form-control-solid' value={grandTotal}/>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicType'>
                            <Form.Label>{getFormattedMessage('globally.react-table.column.payment-type.label')}:</Form.Label>
                            <ReactSelect multiLanguageOption={paymentTypeFilterOptions} onChange={onPaymentTypeChange} name='payment_type'
                                     isRequired
                                     defaultValue={paymentTypeDefaultValue[0]}
                                     placeholder={getFormattedMessage('select.payment-type.label')}
                        />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicNotes'>
                            <Form.Label>{getFormattedMessage("globally.input.notes.label")}: </Form.Label>
                            <Form.Control as='textarea' className='form-control-solid' name='notes' rows={3}
                                          onChange={(e) => onChangeInput(e)}
                                          placeholder={placeholderText("globally.input.notes.placeholder.label")} value={cashPaymentValue.notes}/>
                            <span className='text-danger'>{errors['notes'] ? errors['notes'] : null}</span>
                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <div className='card custom-cash-card'>
                            <div className='card-body p-6'>
                                <Table striped bordered hover className='mb-0'>
                                    <tbody>
                                    <tr>
                                        <td scope='row' className='ps-3'>{getFormattedMessage('dashboard.recentSales.total-product.label')}</td>
                                        <td className="px-3">
                                            <span className='btn btn-primary cursor-default rounded-circle total-qty-text d-flex align-items-center justify-content-center p-2'>
                                                {totalQty}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope='row' className="ps-3">{getFormattedMessage('pos-total-amount.title')}</td>
                                        <td className="px-3">{currencySymbolHendling(allConfigData, settings.attributes && settings.attributes.currency_symbol, subTotal ? subTotal : '0.00')}</td>
                                    </tr>
                                    <tr>
                                        <td scope='row' className="ps-3">{getFormattedMessage("globally.detail.order.tax")}</td>
                                        <td className="px-3">{currencySymbolHendling(allConfigData, settings.attributes && settings.attributes.currency_symbol, taxTotal ? taxTotal : '0.00')} ({cartItemValue.tax ? parseFloat(cartItemValue.tax).toFixed(2) : '0.00'} %)</td>
                                    </tr>
                                    <tr>
                                        <td scope='row' className='ps-3'>{getFormattedMessage('purchase.order-item.table.discount.column.label')}</td>
                                        <td className="px-3">{currencySymbolHendling(allConfigData, settings.attributes && settings.attributes.currency_symbol, cartItemValue.discount ? cartItemValue.discount : '0.00')}</td>
                                    </tr>
                                    <tr>
                                        <td scope='row' className='ps-3'>{getFormattedMessage("purchase.input.shipping.label")}</td>
                                        <td className="px-3">{currencySymbolHendling(allConfigData, settings.attributes && settings.attributes.currency_symbol, cartItemValue.shipping ? cartItemValue.shipping : '0.00')}</td>
                                    </tr>
                                    <tr>
                                        <td scope='row' className='ps-3'>{getFormattedMessage("purchase.grant-total.label")}</td>
                                        <td className="px-3">{currencySymbolHendling(allConfigData, settings.attributes && settings.attributes.currency_symbol, grandTotal)}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="mt-0">
                <button type='button' className='btn btn-primary' onClick={(event) => onCashPayment(event)}>
                    {getFormattedMessage("globally.submit-btn")}
                </button>
                <button type='button' className='btn btn-secondary me-0' onClick={handleCashPayment}>
                    {getFormattedMessage('globally.cancel-btn')}
                </button>
            </Modal.Footer>
        </Modal>
    );
}
export default CashPaymentModel;
