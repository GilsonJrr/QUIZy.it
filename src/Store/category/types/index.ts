export enum CategoryTypes {
  CATEGORY_CLEAN_UP = "CATEGORY_CLEAN_UP",
  CATEGORY_LIST_CLEAN_UP = "CATEGORY_LIST_CLEAN_UP",
  SET_CATEGORY = "SET_CATEGORY",
  REQUEST_CATEGORY_LIST = "REQUEST_CATEGORY_LIST",
  REQUEST_CATEGORY = "REQUEST_CATEGORY",
  CATEGORY_LIST = "CATEGORY_LIST",
  CATEGORY = "CATEGORY",
  REMOVE_CATEGORY = "REMOVE_CATEGORY",
}

export type CategoryAction<Payload> = {
  type: CategoryTypes;
  payload: Payload;
};

export type CategoryRequest = {
  uid: string;
  categoryId?: string;
};

export type CategoryTypeValues = {
  id?: string;
  uid?: string;
  title: string;
  about?: string;
  category?: string;
  image?: string;
};

export type CategoryState = {
  isLoading: boolean;
  error: string | undefined;
  categories: CategoryTypeValues[] | undefined;
  category: CategoryTypeValues | undefined;
};
