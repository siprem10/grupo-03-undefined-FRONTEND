import BeatLoader from "react-spinners/BeatLoader";

export default function Loading({className, color, text = "Cargando"}) {    

    return (
        <div className="flex w-[100%] justify-center items-center">
            <h1 style={{color: `${color ?? "#fafafa"}`}} className={`mb-2 text-3xl font-bold text-primary pr-2 ${className ?? ""}`}>{text}</h1>
            <BeatLoader
                color={`${color ?? "#fafafa"}`}
                loading
                size={12}
                speedMultiplier={0.5}
            />
        </div>
    )
}
