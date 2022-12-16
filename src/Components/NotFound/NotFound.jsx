import { Link } from "react-router-dom";
import BaseButton from "../BaseButton/BaseButton";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";
import notTransaction from "../../assets/notTransaction.png";

export default function NotFound({ title, text, to = "/home" }) {

    const titleDef = "Página no encontrada!";
    const textDef = "Volver al inicio";

    return (
        <Layout>
            <Card className="flex flex-col w-70 justify-center my-10">
                <img className="h-auto w-auto xs:h-[271px] xs:w-[368px] p-2" src={notTransaction} alt="not found" />
                <h1 className="text-center uppercase mb-2 text-2xl font-bold text-primary text-gray-800 pr-2">{title ?? titleDef}</h1>
                <Link to={to}>
                    <BaseButton className="w-full" text={text ?? textDef}></BaseButton>
                </Link>
            </Card>
        </Layout>
    )
}
