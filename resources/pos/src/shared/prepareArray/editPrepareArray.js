export const editPrepareArray = (products, warehouse_id) => {
    let purchaseProductRowArray = [];
    products.forEach((product) => {
        purchaseProductRowArray.push({
            name: product.name,
            purchase_id: product.purchase_id,
            quotation_id: product.quotation_id,
            quotation_item_id: product.quotation_item_id,
            price: product.price,
            category: product.category,
            quantity: product.quantity,
            notes: product.notes,
            sub_total: Number(product.quantity * product.price),
            id: product.id,
            newItem: "",
            isEdit: true,
        });
    });
    return purchaseProductRowArray;
};
