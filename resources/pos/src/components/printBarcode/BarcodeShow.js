import React from 'react';
import {useSelector} from 'react-redux';
import {Image} from 'react-bootstrap-v5';
import _uniqueId from 'lodash/uniqueId';

const BarcodeShow = (props) => {
    const {product, index, paperSize, updated} = props;
    const printBarcodeQuantity = useSelector((state) => state.printQuantity);

    const loopBarcode = () => {
        let indents = [];
        for (let i = 0; i < printBarcodeQuantity; i++) {
            indents.push(<div key={_uniqueId('Lb-').toString()}
                className={`${paperSize.value === 1 ? 'col-md-3' : '' || paperSize.value === 2 ? 'col-md-4 barcode-main__box-height2' : '' || paperSize.value === 3 ? 'col-md-4 barcode-main__box-height3' : '' || paperSize.value === 4 || paperSize.value === 6 ? 'col-md-6 barcode-main__box-height2 px-20' : '' || paperSize.value === 5 ? 'col-md-4 barcode-main__box-height3 px-13' : '' || paperSize.value === 7 ? 'col-md-4 barcode-main__box-height7 px-20' : '' || paperSize.value === 8 ? 'col-md-6 barcode-main__box-height7 px-20' : ''} barcode-main__barcode-item barcode-main__barcode-style`}>
                <div className='mb-2'>{product && product.name}</div>
                <Image
                    src={product && product.barcode_url}
                    alt={product && product.name}
                    className='w-100'/>
                <div
                    className='fw-bolder mt-2'>{product && product.code}</div>
            </div>);
        }
        return indents;
    };

    return (
        <div className='col-md-12 d-flex d-wrap justify-content-between overflow-auto' >
            {updated ?
                <div className='barcode-main' id='demo' key={_uniqueId('LB-').toString()}>
                    {loopBarcode()}
                </div> : ''}
        </div>
    )
}
export default BarcodeShow;

