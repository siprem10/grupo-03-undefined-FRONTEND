import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../../redux/slices/userSlice";
import Card from "../../../Card/Card";

export default function FindUser({ className }) {

    const dispatch = useDispatch();
    const { findUser } = useSelector(state => state.user);

    useEffect(() => {

        return () => dispatch(resetUser());
    }, []);
    
    return (
        <div className={className ?? ""}>
            {findUser.fullname &&
                <label className="label">Se enviará a
                    <Card className="flex flex-row w-full py-2 px-0 pl-3 justify-start">
                        <h1 className="text-primary text-sm uppercase">{findUser.fullname}</h1>
                    </Card>
                </label>
            }            
            {findUser.status &&
                <label className="label text-red-600">Error
                    <Card className="flex flex-row w-full py-2 px-0 pl-3 justify-start">
                        <h1 className="text-primary text-sm uppercase">{findUser.status}</h1>
                    </Card>
                </label>
            }
        </div>
    );
}
