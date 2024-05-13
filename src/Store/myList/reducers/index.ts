import { Reducer } from "redux";
import { MyListTypeValues, MyListTypes, MyListState } from "../types";

interface CleanUpMyList {
  type: MyListTypes.MYLIST_CLEAN_UP;
}
interface CleanUpMyListList {
  type: MyListTypes.MYLIST_LIST_CLEAN_UP;
}

interface SetMyList {
  type: MyListTypes.SET_MYLIST;
  payload: MyListTypeValues[];
}

interface RemoveMyList {
  type: MyListTypes.REMOVE_MYLIST;
}

interface requestMyListList {
  type: MyListTypes.REQUEST_MYLIST_LIST;
  payload: MyListTypeValues[];
}

interface MyListList {
  type: MyListTypes.MYLIST_LIST;
  payload: MyListTypeValues[];
}

interface requestMyList {
  type: MyListTypes.REQUEST_MYLIST;
  payload: MyListTypeValues;
}

interface MyList {
  type: MyListTypes.MYLIST;
  payload: MyListTypeValues;
}

type MyListAction =
  | CleanUpMyList
  | CleanUpMyListList
  | SetMyList
  | requestMyListList
  | requestMyList
  | MyListList
  | MyList
  | RemoveMyList;

const myListInitialState: MyListState = {
  isLoading: false,
  myLists: undefined,
  myList: undefined,
  error: undefined,
};

const myListReducer: Reducer<MyListState, MyListAction> = (
  state = myListInitialState,
  action
) => {
  switch (action.type) {
    case MyListTypes.MYLIST_CLEAN_UP: {
      return {
        ...state,
        error: undefined,
        payload: undefined,
        myList: undefined,
      };
    }
    case MyListTypes.MYLIST_LIST_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
        myLists: undefined,
      };
    }
    case MyListTypes.REQUEST_MYLIST_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        myLists: undefined,
      };
    }
    case MyListTypes.REQUEST_MYLIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        myList: undefined,
      };
    }
    case MyListTypes.MYLIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        myList: action.payload,
      };
    }
    case MyListTypes.MYLIST_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        myLists: Object.values(action.payload),
      };
    }
    case MyListTypes.SET_MYLIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        myLists: action.payload,
      };
    }
    case MyListTypes.REMOVE_MYLIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export { myListReducer };
