import * as React from "react";
import { FormProvider } from "react-hook-form";

import { FormContext } from "../../hooks/use-form-state";

const Form = ({
  methods,
  style,
  children,
  action,
  method = "POST",
  onSubmit,
  defaultEditable = true,
}) => {
  const [isEditable, setIsEditable] = React.useState(
    defaultEditable !== undefined ? defaultEditable : true
  );

  const value = React.useMemo(
    () => ({
      editable: isEditable && !methods.formState.isSubmitting,
      setIsEditable,
    }),
    [isEditable, methods.formState.isSubmitting]
  );

  return (
    <FormContext.Provider value={value}>
      <FormProvider {...methods}>
        <form
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            ...style,
          }}
          method={method}
          action={action}
          onSubmit={(e) => {
            if (!action) {
              e.preventDefault();
              methods.handleSubmit(onSubmit)();
            }
          }}
        >
          {children}
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
};

export default Form;
