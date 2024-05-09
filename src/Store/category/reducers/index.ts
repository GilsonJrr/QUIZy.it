import { Reducer } from "redux";
import { CategoryTypeValues, CategoryTypes, CategoryState } from "../types";

interface CleanUpCategory {
  type: CategoryTypes.CATEGORY_CLEAN_UP;
}
interface CleanUpCategoryList {
  type: CategoryTypes.CATEGORY_LIST_CLEAN_UP;
}

interface SetCategory {
  type: CategoryTypes.SET_CATEGORY;
  payload: CategoryTypeValues[];
}

interface RemoveCategory {
  type: CategoryTypes.REMOVE_CATEGORY;
}

interface requestCategoryList {
  type: CategoryTypes.REQUEST_CATEGORY_LIST;
  payload: CategoryTypeValues[];
}

interface CategoryList {
  type: CategoryTypes.CATEGORY_LIST;
  payload: CategoryTypeValues[];
}

interface requestCategory {
  type: CategoryTypes.REQUEST_CATEGORY;
  payload: CategoryTypeValues;
}

interface Category {
  type: CategoryTypes.CATEGORY;
  payload: CategoryTypeValues;
}

type CategoryAction =
  | CleanUpCategory
  | CleanUpCategoryList
  | SetCategory
  | requestCategoryList
  | requestCategory
  | CategoryList
  | Category
  | RemoveCategory;

const categoryInitialState: CategoryState = {
  isLoading: false,
  categories: undefined,
  category: undefined,
  error: undefined,
};

const categoryReducer: Reducer<CategoryState, CategoryAction> = (
  state = categoryInitialState,
  action
) => {
  switch (action.type) {
    case CategoryTypes.CATEGORY_CLEAN_UP: {
      return {
        ...state,
        error: undefined,
        payload: undefined,
        category: undefined,
      };
    }
    case CategoryTypes.CATEGORY_LIST_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
        categories: undefined,
      };
    }
    case CategoryTypes.REQUEST_CATEGORY_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        categories: undefined,
      };
    }
    case CategoryTypes.REQUEST_CATEGORY: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        category: undefined,
      };
    }
    case CategoryTypes.CATEGORY: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        category: action.payload,
      };
    }
    case CategoryTypes.CATEGORY_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        categories: Object.values(action.payload),
      };
    }
    case CategoryTypes.SET_CATEGORY: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        categories: action.payload,
      };
    }
    case CategoryTypes.REMOVE_CATEGORY: {
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

export { categoryReducer };
