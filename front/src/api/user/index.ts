import ICard from "../../types/ICard";
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

export const getUsers = async () => {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      return [];
    }
    if (response.status !== 200) {
      return [];
    }
    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await fetch(`/api/user/${id}`);
    if (!response.ok) {
      return { id: 0 } as IUser;
    }
    if (response.status !== 200) {
      return { id: 0 } as IUser;
    }
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

export const getCards = async () => {
  try {
    const response = await fetch("/api/cards");
    if (!response.ok) {
      return [];
    }
    if (response.status !== 200) {
      return [];
    }
    const data: ICard[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCardById = async (id: number) => {
  try {
    const response = await fetch(`/api/card/${id}`);
    console.log(response);
    if (!response.ok) {
      return { id: 0 } as ICard;
    }
    if (response.status !== 200) {
      return { id: 0 } as ICard;
    }
    const data: ICard = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const buyCard = async (userId: number, cardId: number) => {
  try {
    const response = await fetch(`/api/store/buy`, {
      body: JSON.stringify({ user_id: userId, card_id: cardId, store_id: 0 }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return false;
    }
    if (response.status !== 200) {
      return false;
    }
    const data: boolean = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sellCard = async (userId: number, cardId: number) => {
  try {
    const response = await fetch(`/api/store/sell`, {
      body: JSON.stringify({ user_id: userId, card_id: cardId, store_id: 0 }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return false;
    }
    if (response.status !== 200) {
      return false;
    }
    const data: boolean = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
