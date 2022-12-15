import { Link } from "react-router-dom";
import BaseButton from "../BaseButton/BaseButton";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";
import notTransaction from "../../assets/notTransaction.png";

export default function NotFound({ title, text, to = "/home" }) {

    const titleDef = "Parece que te perdiste!";
    const textDef = "Volver al inicio";

    return (
        <Layout>
            <Card className="flex flex-col w-70 justify-center">
                <img className="h-[180px] w-[250px]" src={notTransaction} alt="not found" />
                <h1 className="text-center uppercase mb-2 text-2xl font-bold text-primary text-gray-800 pr-2">{title ?? titleDef}</h1>
                <Link to={to}>
                    <BaseButton className="w-full" text={text ?? textDef}></BaseButton>
                </Link>
            </Card>
        </Layout>
    )
}
