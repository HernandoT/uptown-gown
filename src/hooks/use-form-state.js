import invariant from "invariant";
import { createContext, useContext } from "react";

export const FormContext = createContext({
  editable: false,
  setIsEditable: () => {},
});

export function FormState(props) {
  const context = useContext(FormContext);
  return props.children(context);
}

export function useFormState() {
  const context = useContext(FormContext);
  invariant(
    context !== undefined,
    "useFormState must be used inside Form Container"
  );
  return context;
}
