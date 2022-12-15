import BeatLoader from "react-spinners/BeatLoader";
import Layout from "../Layout/Layout";

export default function Loader() {    

    return (
        <Layout>
            <div className="flex w-full justify-center items-center">
                <h1 className="mb-2 text-3xl font-bold text-primary text-gray-100 pr-2">Cargando</h1>
                <BeatLoader
                    color="#fafafa"
                    loading
                    size={12}
                    speedMultiplier={0.5}
                />
            </div>
        </Layout>
    )
}
