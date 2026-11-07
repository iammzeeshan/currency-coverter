import { useEffect, useState } from "react";

function useCurrencyInfo() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2026.11.5/v1/currencies/usd.json')
            .then((res) => res.json())
            .then((res) => setData(res?.usd ?? {}))
            .catch(() => setData({}));
    }, []);

    return data;
}

export default useCurrencyInfo;