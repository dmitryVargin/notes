import * as appActionsCreators from "../actionCreators/appCreators";
import * as leftSidebarActionsCreators from "../actionCreators/leftSidebarCreators";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionTypes = ReturnType<
  InferValueTypes<typeof appActionsCreators>
>;
export type leftSidebarActionTypes = ReturnType<
  InferValueTypes<typeof leftSidebarActionsCreators>
>;
