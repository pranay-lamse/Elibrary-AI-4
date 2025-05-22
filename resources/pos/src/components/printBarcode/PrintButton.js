import React from "react";
import { Image } from "react-bootstrap-v5";
import _uniqueId from "lodash/uniqueId";

class PrintButton extends React.PureComponent {
    render() {
        const print = this.props.updateProducts;
        const paperSize = print.paperSize;

        function printFunction(product) {
            let indents = [];
            for (let i = 0; i < product.quantity; i++) {
                indents.push(
                    <div
                        key={i}
                        className={`${
                            paperSize.value === 1
                                ? "print-main__print1"
                                : "" || paperSize.value === 2
                                ? "print-main__print2"
                                : "" || paperSize.value === 3
                                ? "print-main__print3"
                                : "" ||
                                  paperSize.value === 4 ||
                                  paperSize.value === 6
                                ? "print-main__print4"
                                : "" || paperSize.value === 5
                                ? "print-main__print5"
                                : "" || paperSize.value === 7
                                ? "print-main__print7"
                                : "" || paperSize.value === 8
                                ? "print-main__print8"
                                : ""
                        } barcode-main__barcode-item barcode-main__barcode-style`}
                    >
                        <div className="mb-2">{product && product.name}</div>
                        <Image
                            src={product && product.barcode_url}
                            alt={product && product.name}
                            className="w-100"
                        />
                        <div className="fw-bolder mt-2">
                            {product && product.code}
                        </div>
                    </div>
                );
            }
            return indents;
        }

        return (
            <div className="p-4">
                {print.products &&
                    print.products.map((product) => {
                        return printFunction(product);
                    })}
            </div>
        );
    }
}

export default PrintButton;
