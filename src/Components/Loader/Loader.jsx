import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

export default function Loader() {

    // este estado debe estar en cada pagina donde vamos a usar el loader
    const [loading, setLoading] = useState(false);

    return (
        <BounceLoader
            color="#36d7b7"
            loading
            size={120}
            speedMultiplier={0.5}
        />
    )
}
