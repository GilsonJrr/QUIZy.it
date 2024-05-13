export enum MyListTypes {
  MYLIST_CLEAN_UP = "MYLIST_CLEAN_UP",
  MYLIST_LIST_CLEAN_UP = "MYLIST_LIST_CLEAN_UP",
  SET_MYLIST = "SET_MYLIST",
  REQUEST_MYLIST_LIST = "REQUEST_MYLIST_LIST",
  REQUEST_MYLIST = "REQUEST_MYLIST",
  MYLIST_LIST = "MYLIST_LIST",
  MYLIST = "MYLIST",
  REMOVE_MYLIST = "REMOVE_MYLIST",
}

export type MyListAction<Payload> = {
  type: MyListTypes;
  payload: Payload;
};

export type MyListRequest = {
  uid: string;
  studentUid?: string;
  quizUid?: string;
};

export type MyListTypeValues = {
  tutorUid?: string;
  uid?: string;
  quizUid?: string;
  quizTitle?: string;
  amount?: string;
  score?: string;
  studentUid?: string;
  date?: string;
  quizCategory?: string;
};

export type MyListState = {
  isLoading: boolean;
  error: string | undefined;
  myLists: MyListTypeValues[] | undefined;
  myList: MyListTypeValues | undefined;
};
