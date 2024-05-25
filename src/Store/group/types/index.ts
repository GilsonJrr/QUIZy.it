export enum GroupTypes {
  GROUP_CLEAN_UP = "GROUP_CLEAN_UP",
  GROUP_LIST_CLEAN_UP = "GROUP_LIST_CLEAN_UP",
  SET_GROUP = "SET_GROUP",
  REQUEST_GROUP_LIST = "REQUEST_GROUP_LIST",
  REQUEST_GROUP = "REQUEST_GROUP",
  GROUP_LIST = "GROUP_LIST",
  GROUP = "GROUP",
  REMOVE_GROUP = "REMOVE_GROUP",
}

export type GroupAction<Payload> = {
  type: GroupTypes;
  payload: Payload;
  onSuccess?: () => void;
};

export type GroupRequest = {
  uid: string;
  groupId?: string;
  onSuccess?: () => void;
};

export type GroupTypeValues = {
  onSuccess?: () => void;
  groupId?: string;
  id?: string;
  uid?: string;
  title: string;
  about?: string;
  group?: string;
  image?: string;
  color?: string;
};

export type GroupState = {
  isLoading: boolean;
  error: string | undefined;
  groups: GroupTypeValues[] | undefined;
  group: GroupTypeValues | undefined;
};
