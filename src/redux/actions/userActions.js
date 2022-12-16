import { HttpService } from "../../Service/HttpService";
import { setUser, setAdminUsers, setBansAdminUsers } from "../slices/userSlice";

export const getUser = (email) => async (dispatch) => {
  try {
    const httpService = new HttpService();
    const user = await httpService.apiPrivate().get(`/users/${email}?excludeYou=true`);

    if (user) {
      const data = user.data.body;
      const fullname = data.firstName + " " + data.lastName;
      dispatch(setUser({ id: data.id, fullname }));
    }

  } catch (error) {
    dispatch(setUser({ status: "No se encontró el usuario" }));
    return error.message;
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const httpService = new HttpService();
    const users = await httpService.apiPrivate().get("/users?excludeYou=true");

    if (users) {
      const usersList = users.data.body.map(user => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          deletedAt: user.deletedAt
        };
      });
      dispatch(setAdminUsers(usersList));
    }

  } catch (error) {
    return error.message;
  }
};

export const bannedUser = (id) => async (dispatch) => {
  try {
    const httpService = new HttpService();
    const response = await httpService.apiPrivate().delete(`/users/${id}`);
    const userUnban = response.data.body;
    
    dispatch(setBansAdminUsers({
      id: userUnban.id,
      firstName: userUnban.firstName,
      lastName: userUnban.lastName,
      email: userUnban.email,
      deletedAt: userUnban.deletedAt
    }));

  } catch (error) {
    return error.message;
  }
};

export const unbannedUser = (id) => async (dispatch) => {
  try {
    const httpService = new HttpService();
    const response = await httpService.apiPrivate().post(`/users/${id}`);
    const userUnban = response.data.body;

    dispatch(setBansAdminUsers({
      id: userUnban.id,
      firstName: userUnban.firstName,
      lastName: userUnban.lastName,
      email: userUnban.email,
      deletedAt: userUnban.deletedAt
    }));

  } catch (error) {
    return error.message;
  }
};
