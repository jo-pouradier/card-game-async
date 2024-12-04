import { UserSliceState } from "../../types/UserSlice";

export interface UserConnectionData {
  username: string;
  password: string;
}

export const connectUser = (userData: UserConnectionData, userState: UserSliceState) => {
  fetch("/api/auth", {
    body: JSON.stringify(userData),
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      fetch(`/api/user/${data}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          userState.user = data;
        });
    });
};
