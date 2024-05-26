import { Reducer } from "redux";
import { GroupTypeValues, GroupTypes, GroupState } from "../types";

interface CleanUpGroup {
  type: GroupTypes.GROUP_CLEAN_UP;
}
interface CleanUpGroupList {
  type: GroupTypes.GROUP_LIST_CLEAN_UP;
}

interface SetGroup {
  type: GroupTypes.SET_GROUP;
  payload: GroupTypeValues[];
}

interface RemoveGroup {
  type: GroupTypes.REMOVE_GROUP;
}

interface requestGroupList {
  type: GroupTypes.REQUEST_GROUP_LIST;
  payload: GroupTypeValues[];
}

interface GroupList {
  type: GroupTypes.GROUP_LIST;
  payload: GroupTypeValues[];
}

interface requestGroup {
  type: GroupTypes.REQUEST_GROUP;
  payload: GroupTypeValues;
}

interface Group {
  type: GroupTypes.GROUP;
  payload: GroupTypeValues;
}

type GroupAction =
  | CleanUpGroup
  | CleanUpGroupList
  | SetGroup
  | requestGroupList
  | requestGroup
  | GroupList
  | Group
  | RemoveGroup;

const groupInitialState: GroupState = {
  isLoading: false,
  groups: undefined,
  group: undefined,
  error: undefined,
};

const groupReducer: Reducer<GroupState, GroupAction> = (
  state = groupInitialState,
  action
) => {
  switch (action.type) {
    case GroupTypes.GROUP_CLEAN_UP: {
      return {
        ...state,
        error: undefined,
        payload: undefined,
        group: undefined,
        groups: undefined,
      };
    }
    case GroupTypes.GROUP_LIST_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
        groups: undefined,
      };
    }
    case GroupTypes.REQUEST_GROUP_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        groups: undefined,
      };
    }
    case GroupTypes.REQUEST_GROUP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        group: undefined,
        groups: undefined,
      };
    }
    case GroupTypes.GROUP: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        group: action.payload,
      };
    }
    case GroupTypes.GROUP_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        groups: Object.values(action.payload),
      };
    }
    case GroupTypes.SET_GROUP: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        groups: action.payload,
      };
    }
    case GroupTypes.REMOVE_GROUP: {
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

export { groupReducer };
