export enum ExampleTypes {
  EXAMPLE = "EXAMPLE",
  EXAMPLE_PAYLOAD = "EXAMPLE_PAYLOAD ",
}

export type ExampleAction<Payload> = {
  type: ExampleTypes;
  payload: Payload;
};

export type ExampleRequest = {
  uid: string;
};

export type ExampleTypeValues = {
  uid?: any;
  id?: string;
};

export type ExampleState = {
  isLoading?: boolean;
  example?: ExampleTypeValues[] | undefined;
};
