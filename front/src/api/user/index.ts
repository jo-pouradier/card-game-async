import IUser from "../../types/IUser";

export interface UserConnectionData {
  username: string;
  password: string;
}

export const connectUser = async (userData: UserConnectionData) => {
  try {
    const response = await fetch("/api/auth", {
      body: JSON.stringify(userData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postNewUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await fetch("/api/user", {
      body: JSON.stringify(user),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
