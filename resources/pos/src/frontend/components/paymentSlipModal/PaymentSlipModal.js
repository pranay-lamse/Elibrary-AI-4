import React from 'react';
import {Modal, Table, Image} from 'react-bootstrap';
import moment from 'moment';
import {calculateProductCost} from '../../shared/SharedMethod';
import {currencySymbolHendling, getFormattedDate, getFormattedMessage} from '../../../shared/sharedMethod';

const PaymentSlipModal = (props) => {
    const {modalShowPaymentSlip, setModalShowPaymentSlip, updateProducts, printPaymentReceiptPdf,paymentType, frontSetting, paymentDetails, allConfigData} = props;
    const currency = updateProducts.settings && updateProducts.settings.attributes && updateProducts.settings.attributes.currency_symbol
    return (
        <Modal
            show={modalShowPaymentSlip}
            onHide={() => setModalShowPaymentSlip(false)}
            size='sm'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            className="pos-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    {getFormattedMessage('pos-sale.detail.invoice.info')} POS
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <tbody>
                    <tr>
                        <td scope='row' className='p-0'>
                            <span>{getFormattedMessage('react-data-table.date.column.label')}:</span>
                            <span className='ms-2 font-label'>
                                {getFormattedDate(new Date(), allConfigData && allConfigData)}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope='row' className='p-0'>
                            <span className='address__label d-inline-block'>{getFormattedMessage('supplier.table.address.column.title')}:</span>
                            <span className='ms-2 address__value d-inline-block font-label'>
                                {frontSetting.value && frontSetting.value.address}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope='row' className='p-0'>
                            <span>{getFormattedMessage('globally.input.email.label')}:</span>
                            <span className='ms-2 font-label'>
                                {frontSetting.value && frontSetting.value.email}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope='row' className='p-0'>
                            <span>{getFormattedMessage('pos-sale.detail.Phone.info')}:</span>
                            <span className='ms-2 font-label'>
                                {frontSetting.value && frontSetting.value.phone}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope='row' className='p-0'>
                            <span> {getFormattedMessage('dashboard.recentSales.customer.label')}: </span>
                            <span
                                className='ms-2 font-label'>{updateProducts.customer_name && updateProducts.customer_name[0] ? updateProducts.customer_name[0].label : updateProducts.customer_name && updateProducts.customer_name.label}</span>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                {updateProducts.products && updateProducts.products.map((productName, index) => {
                    return (
                        <Table key={index}>
                            <tbody>
                            <tr>
                                <td className='p-0'>{productName.name}</td>
                            </tr>
                            <div className='product-border'>
                                <tr className='border-0'>
                                    <td className='w-50'>
                                        {(productName.quantity).toFixed(2)} {productName.product_unit === '3' && 'Kg' || productName.product_unit === '1' && 'Pc' || productName.product_unit === '2' && 'M'} X {(calculateProductCost(productName).toFixed(2))}
                                    </td>
                                    <td className='text-end w-125px'>
                                        {currencySymbolHendling(allConfigData, currency, productName.quantity * (calculateProductCost(productName)))}
                                    </td>
                                </tr>
                            </div>
                            </tbody>
                        </Table>
                    )
                })}

                <div className='d-flex product-border'>
                    <div>{getFormattedMessage("pos-total-amount.title")}:</div>
                    <div
                        className='text-end ms-auto'> {currencySymbolHendling(allConfigData, currency, updateProducts.subTotal ? updateProducts.subTotal : '0.00')}
                    </div>
                </div>

                <div className='d-flex product-border'>
                    <div>{getFormattedMessage('globally.detail.order.tax')}:</div>
                    <div
                        className='text-end ms-auto'> {currencySymbolHendling(allConfigData, currency, updateProducts.taxTotal ? updateProducts.taxTotal : '0.00')} ({updateProducts ? parseFloat(updateProducts.tax).toFixed(2) : '0.00'} %)
                    </div>
                </div>
                <div className='d-flex product-border'>
                    <div>{getFormattedMessage('purchase.order-item.table.discount.column.label')}:</div>
                    <div
                        className='text-end ms-auto'> {currencySymbolHendling(allConfigData, currency, updateProducts ? updateProducts.discount : '0.00')}
                    </div>
                </div>
                {
                    updateProducts.shipping ? <div className='d-flex product-border'>
                        <div>Shipping:</div>
                        <div
                            className='text-end ms-auto'> {currencySymbolHendling(allConfigData, currency, updateProducts ? updateProducts.shipping : '0.00')}
                        </div>
                    </div> : ''
                }
                <div className='d-flex product-border mb-4'>
                    <div>{getFormattedMessage("purchase.grant-total.label")}:</div>
                    <div className='text-end ms-auto'> {currencySymbolHendling(allConfigData, currency, updateProducts.grandTotal)}</div>
                </div>
                <Table striped className='mb-7'>
                    <thead>
                    <tr>
                        <th className='py-2'>{getFormattedMessage('pos-sale.detail.Paid-bt.title')}</th>
                        <th className='text-end py-2'>{getFormattedMessage('expense.input.amount.label')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className='py-2'>{paymentType}</td>
                        <td className='text-end py-2'>
                            {currencySymbolHendling(allConfigData, currency, updateProducts.grandTotal)}</td>
                    </tr>
                    </tbody>
                </Table>
                {updateProducts && updateProducts.note ?
                    <div className='d-flex product-border mb-5'>
                        <div className='fw-bolder'>Notes:</div>
                        <div className='ms-2 mb-2 product-border__product-width'>
                            {updateProducts && updateProducts.note}
                        </div>
                    </div> : ''}
                <h5 className='text-center font-label'>{getFormattedMessage('pos-thank.you-slip.invoice')}.</h5>
                <div className='text-center d-block'>
                    <Image
                        src={paymentDetails && paymentDetails.attributes.barcode_url}
                        className='' height={25} width={100}/>
                    <span className='d-block'>{paymentDetails && paymentDetails.attributes.reference_code}</span>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center pt-2'>
                <button className='btn btn-primary text-white'
                        onClick={printPaymentReceiptPdf}>{getFormattedMessage("print.title")}</button>
                <button className='btn btn-secondary'
                        onClick={() => setModalShowPaymentSlip(false)}>{getFormattedMessage("pos-close-btn.title")}
                </button>
            </Modal.Footer>
        </Modal>
    )
};
export default PaymentSlipModal

