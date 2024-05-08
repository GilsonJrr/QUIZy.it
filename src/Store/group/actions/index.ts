import {
  GroupTypes,
  GroupRequest,
  GroupAction,
  GroupTypeValues,
} from "../types";

export function groupCleanUp() {
  return {
    type: GroupTypes.GROUP_CLEAN_UP,
  };
}

export function groupListCleanUp() {
  return {
    type: GroupTypes.GROUP_LIST_CLEAN_UP,
  };
}

export function requestGroupList(
  props: GroupRequest
): GroupAction<GroupRequest> {
  return {
    type: GroupTypes.REQUEST_GROUP_LIST,
    payload: { ...props },
  };
}

export function requestGroup(props: GroupRequest): GroupAction<GroupRequest> {
  return {
    type: GroupTypes.REQUEST_GROUP,
    payload: { ...props },
  };
}

export function groupList(
  props: GroupTypeValues
): GroupAction<GroupTypeValues> {
  return {
    type: GroupTypes.GROUP_LIST,
    payload: { ...props },
  };
}

export function group(props: GroupTypeValues): GroupAction<GroupTypeValues> {
  return {
    type: GroupTypes.GROUP,
    payload: { ...props },
  };
}

export function setGroup(props: GroupRequest): GroupAction<GroupRequest> {
  return {
    type: GroupTypes.SET_GROUP,
    payload: { ...props },
  };
}

export function removeGroup(props: GroupRequest): GroupAction<GroupRequest> {
  return {
    type: GroupTypes.REMOVE_GROUP,
    payload: { ...props },
  };
}
