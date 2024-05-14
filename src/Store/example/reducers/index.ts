import { Reducer } from "redux";
import { ExampleTypeValues, ExampleTypes, ExampleState } from "../types";

interface RequestExample {
  type: ExampleTypes.EXAMPLE;
}

interface RequestExamplePayload {
  type: ExampleTypes.EXAMPLE_PAYLOAD;
  payload: ExampleTypeValues[];
}

type ExampleAction = RequestExample | RequestExamplePayload;

const exampleInitialState: ExampleState = {
  isLoading: false,
  example: undefined,
};

const exampleReducer: Reducer<ExampleState, ExampleAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case ExampleTypes.EXAMPLE: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
      };
    }
    case ExampleTypes.EXAMPLE_PAYLOAD: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        payload: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { exampleReducer };
