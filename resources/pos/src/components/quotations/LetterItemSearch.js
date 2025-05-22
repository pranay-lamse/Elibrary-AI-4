import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { addToast } from "../../store/action/toastAction";
import { toastType } from "../../constants";
// import { searchPurchaseProduct } from "../../../../store/action/purchaseProductAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const LetterItemSearch = (props) => {
    const {
        values,
        products,
        updateProducts,
        setUpdateProducts,
        customProducts,
        handleValidation,
        isAllProducts,
    } = props;
    const [searchString, setSearchString] = useState("");
    const dispatch = useDispatch();

    const filterProducts =
        values.sanction_letter_id && products.length
            ? products.map((item) => {
                  return {
                      id: item.id,
                      name: item.name,
                  };
              })
            : [];

    const onProductSearch = (name) => {
        if (!values.sanction_letter_id) {
            handleValidation();
        } else {
            setSearchString(name);
            const newId = products
                .filter((item) => item.name === name || item.name === name.name)
                .map((item) => item.id);
            const finalIdArrays = customProducts.map((item) => item.id);
            const finalId = finalIdArrays.filter(
                (finalIdArray) => finalIdArray === newId[0]
            );
            // console.log({
            //     name,
            //     newId,
            //     products,
            //     finalId,
            //     finalIdArrays,
            //     customProducts,
            // });
            if (finalId[0] !== undefined) {
                if (
                    updateProducts.find(
                        (exitId) =>
                            exitId?.sanction_letter_item_id === finalId[0] ||
                            exitId.id === finalId[0]
                    )
                ) {
                    dispatch(
                        addToast({
                            text: "Selected Product Already Added.",
                            type: toastType.ERROR,
                        })
                    );
                } else {
                    const pushArray = [...customProducts];
                    if (
                        updateProducts.filter(
                            (product) => product.name === name
                        ).length > 0
                    ) {
                        setUpdateProducts((updateProducts) =>
                            updateProducts.map((item) => {
                                return item;
                            })
                        );
                    } else {
                        const newProduct = pushArray.find(
                            (element) => element.id === finalId[0]
                        );
                        setUpdateProducts((prev) => [...prev, newProduct]);
                        console.log({ updateProducts });
                    }
                }
                removeSearchClass();
                setSearchString("");
            }
        }
    };

    const handleOnSearch = (string) => {
        onProductSearch(string);
    };

    const handleOnSelect = (result) => {
        console.log({ result });
        onProductSearch(result);
    };

    const formatResult = (item) => {
        return <span onClick={(e) => e.stopPropagation()}>({item.name})</span>;
    };

    const removeSearchClass = () => {
        const html =
            document.getElementsByClassName(`custom-search`)[0].firstChild
                .firstChild.lastChild;
        html.style.display = "none";
    };

    return (
        <div className="position-relative custom-search">
            <ReactSearchAutocomplete
                items={filterProducts}
                onSearch={handleOnSearch}
                inputSearchString={searchString}
                fuseOptions={{ keys: ["name"] }}
                resultStringKeyName="name"
                placeholder={"Search..."}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                showIcon={false}
                showClear={false}
            />
            <FontAwesomeIcon
                icon={faSearch}
                className="d-flex align-items-center top-0 bottom-0 react-search-icon my-auto text-gray-600 position-absolute"
            />
        </div>
    );
};

export default connect(null, null)(LetterItemSearch);
