import React, { useState, useEffect } from "react";

function Counter(props) {
    const { addCount, siteCounter } = props;
    useEffect(() => {
        addCount(1);
    }, []);
    return null;
}

export default Counter;
