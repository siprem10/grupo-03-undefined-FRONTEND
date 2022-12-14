import { HttpService } from "../../Service/HttpService";
import { setUser } from "../slices/userSlice";

 export const getUser = (email) => async (dispatch) => {
  try {
    const httpService = new HttpService();
    const user = await httpService.apiPrivate().get(`/users/${email}`);
    
    if(user){
      const data = user.data.body;
      const fullname = data.firstName + " " + data.lastName;
      dispatch(setUser({id: data.id, fullname}));
    }
    
  } catch (error) {
    dispatch(setUser({status: "No se encontró el usuario"}));
    return error.message;
  }
};
