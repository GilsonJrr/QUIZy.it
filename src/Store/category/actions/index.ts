import {
  CategoryTypes,
  CategoryRequest,
  CategoryAction,
  CategoryTypeValues,
} from "../types";

export function categoryCleanUp() {
  return {
    type: CategoryTypes.CATEGORY_CLEAN_UP,
  };
}

export function categoryListCleanUp() {
  return {
    type: CategoryTypes.CATEGORY_LIST_CLEAN_UP,
  };
}

export function requestCategoryList(
  props: CategoryRequest
): CategoryAction<CategoryRequest> {
  return {
    type: CategoryTypes.REQUEST_CATEGORY_LIST,
    payload: { ...props },
  };
}

export function requestCategory(
  props: CategoryRequest
): CategoryAction<CategoryRequest> {
  return {
    type: CategoryTypes.REQUEST_CATEGORY,
    payload: { ...props },
  };
}

export function categoryList(
  props: CategoryTypeValues
): CategoryAction<CategoryTypeValues> {
  return {
    type: CategoryTypes.CATEGORY_LIST,
    payload: { ...props },
  };
}

export function category(
  props: CategoryTypeValues
): CategoryAction<CategoryTypeValues> {
  return {
    type: CategoryTypes.CATEGORY,
    payload: { ...props },
  };
}

export function setCategory(
  props: CategoryRequest
): CategoryAction<CategoryRequest> {
  return {
    type: CategoryTypes.SET_CATEGORY,
    payload: { ...props },
  };
}

export function removeCategory(
  props: CategoryRequest
): CategoryAction<CategoryRequest> {
  return {
    type: CategoryTypes.REMOVE_CATEGORY,
    payload: { ...props },
  };
}
