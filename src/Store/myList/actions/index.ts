import {
  MyListTypes,
  MyListRequest,
  MyListAction,
  MyListTypeValues,
} from "../types";

export function myListCleanUp() {
  return {
    type: MyListTypes.MYLIST_CLEAN_UP,
  };
}

export function myListListCleanUp() {
  return {
    type: MyListTypes.MYLIST_LIST_CLEAN_UP,
  };
}

export function requestMyListList(
  props: MyListRequest
): MyListAction<MyListRequest> {
  return {
    type: MyListTypes.REQUEST_MYLIST_LIST,
    payload: { ...props },
  };
}

export function requestMyList(
  props: MyListRequest
): MyListAction<MyListRequest> {
  return {
    type: MyListTypes.REQUEST_MYLIST,
    payload: { ...props },
  };
}

export function myListList(
  props: MyListTypeValues
): MyListAction<MyListTypeValues> {
  return {
    type: MyListTypes.MYLIST_LIST,
    payload: { ...props },
  };
}

export function myList(
  props: MyListTypeValues
): MyListAction<MyListTypeValues> {
  return {
    type: MyListTypes.MYLIST,
    payload: { ...props },
  };
}

export function setMyList(props: MyListRequest): MyListAction<MyListRequest> {
  return {
    type: MyListTypes.SET_MYLIST,
    payload: { ...props },
  };
}

export function removeMyList(
  props: MyListRequest
): MyListAction<MyListRequest> {
  return {
    type: MyListTypes.REMOVE_MYLIST,
    payload: { ...props },
  };
}
