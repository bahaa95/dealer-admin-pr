"use client";
import React, { useEffect, useState } from "react";

export const ClientOnly = (props: any) => {
    const [client, setClient] = useState(false);

    useEffect(() => {
        if (window) {
            setClient(true);
        }
    }, []);

    if (!client) return null;
    return <>{props.children}</>;
};
