export default (formValues) => {
    const { title, note, file_content, category, url } = formValues;
    const formData = new FormData();

    if (file_content && file_content.length > 0) {

        formData.append("file_content", file_content[0]);
    } else {

        formData.append("file_content", null);
    }

    formData.append("title", title);
    formData.append("note", note ? note : "");
    formData.append("url", url ? url : "");
    formData.append("category", JSON.stringify(category));
    return formData;
};
