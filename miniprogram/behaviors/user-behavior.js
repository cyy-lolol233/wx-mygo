import { BehaviorWithStore } from "mobx-miniprogram-bindings";
import { user , global } from "../models/index";
export const userBehavior = BehaviorWithStore({
  storeBindings: [{
    namespace: "user",
    store: user,
    fields: ["nickname","isLogin", "location"],
    actions: ["updateNickName", "updateLocation"],
  },
  { 
    namespace: "global",
    store: global,
    fields: ["currentStore"],
    actions: ["setCurrentStore"],
  }
  // {
  //   namespace: "chart",
  //   store: chart,
  //   fields: ["list", "totalPrice", "selectedGoods", "specsCategories"],
  //   actions: ["removeChart", "addChart", "selectGoods"]
  // }
]
});