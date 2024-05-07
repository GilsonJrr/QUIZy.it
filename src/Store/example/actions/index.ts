import { ExampleTypes, ExampleRequest, ExampleAction } from "../types";

//example function without payload
export function exampleFunction01() {
  return {
    type: ExampleTypes.EXAMPLE,
  };
}

//example function with payload
export function exampleFunction02(
  props: ExampleRequest
): ExampleAction<ExampleRequest> {
  return {
    type: ExampleTypes.EXAMPLE,
    payload: { ...props },
  };
}
