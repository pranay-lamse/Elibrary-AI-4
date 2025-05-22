export default (formValues) => {
    const { subject, description, letter_status, items } = formValues;
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("letter_status", letter_status ? letter_status.id : "");
    if (items && items.length > 0 && items) {
        items.forEach((item, index) => {
            formData.append(
                `items[${index}][category]`,
                item.category ? item.category.id : ""
            );
            formData.append(
                `items[${index}][name]`,
                item.name ? item.name : ""
            );
            formData.append(
                `items[${index}][price]`,
                item.price ? item.price : ""
            );
            formData.append(
                `items[${index}][quantity]`,
                item.quantity ? item.quantity : ""
            );
            formData.append(
                `items[${index}][notes]`,
                item.notes ? item.notes : ""
            );
            // formData.append(
            //     `items[${index}][price]`,
            //     item.price ? item.price.toString() : ""
            // );
            // formData.append(
            //     `items[${index}][file]`,
            //     item.file ? item.file[0] : ""
            // );
            // formData.append(
            //     `items[${index}][product_id]`,
            //     item.product_id ? item.product_id.id : ""
            // );
            // formData.append(
            //     `items[${index}][rack_number]`,
            //     item.rack_number ? item.rack_number : ""
            // );
            // formData.append(
            //     `items[${index}][pdf_preview_file]`,
            //     item.pdf_preview_file ? item.pdf_preview_file[0] : ""
            // );
        });
    }
    return formData;
};
