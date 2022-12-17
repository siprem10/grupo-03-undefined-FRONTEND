
export default function RefChart({ data, colors, className }) {

    return (
        <div className={`flex flex-col items-start justify-start ${className ?? ""}`}>
            {data?.map((d, i) =>
                <div key={i} className="flex justify-center items-center">
                    <div style={{background: colors[i]}} className={`w-4 h-4 rounded-[0.2em]`}></div>
                    <p className="text-md text-primary font-medium ml-2">{d.name}: $ {d.value}</p>
                </div>
            )}
        </div>
    );
}
