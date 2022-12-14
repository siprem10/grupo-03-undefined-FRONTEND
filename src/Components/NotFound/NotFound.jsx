import { Link } from "react-router-dom";
import BaseButton from "../BaseButton/BaseButton";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";

export default function NotFound({ title, text, to = "/home" }) {

    const titleDef = "Parece que te perdiste!";
    const textDef = "Volver al inicio";

    return (
        <Layout>
            <Card className="flex flex-col w-70 justify-center">
                <h1 className="text-center uppercase mb-2 text-2xl font-bold text-primary text-gray-800 pr-2">{title ?? titleDef}</h1>
                <Link to={to}>
                    <BaseButton className="w-full" text={text ?? textDef}></BaseButton>
                </Link>
            </Card>
        </Layout>
    )
}
