//contador, que al pulsar vaya creciendo de 1 en 1.
//debe empezar en undefined.
import { useState } from "react";

export const Hola = () => {
    const [pulsar, setPulsar] = useState(undefined);

    const handlePulsar = () => {
        setPulsar((prevPulsar) => (prevPulsar === undefined ? 0 : prevPulsar + 1));
    };

    return (
        <>
            <button onClick={handlePulsar}>
                <p>Pulsar: {pulsar === undefined ? "undefined" : pulsar}</p>
                Pulsar
            </button>
        </>
    );
}