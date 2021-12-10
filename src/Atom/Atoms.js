import { atom } from "recoil";

export const ScrollValue = atom({
    key: 'scroll value', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
  });