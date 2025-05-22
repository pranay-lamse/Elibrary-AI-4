import React, { useState } from "react";
import apiConfig from "../../admin/config/apiConfig";

function TestComponent() {
    const [file, setFile] = useState(null);
    const formData = new FormData();

    const onFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.append("file", file);
        console.log(file);
        apiConfig.post("/pdf-upload", formData);
        // alert("File is Uploaded.");
    };

    return (
        <div>
            <h1>TestComponent</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" onChange={onFileChange} />
                <button>Upload</button>
            </form>
        </div>
    );
}

export default TestComponent;
