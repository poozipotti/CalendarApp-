import React from "react";

type INITIAL_STATE_T = {};
const INITIAL_STATE: INITIAL_STATE_T = {};

const SimpleContext = React.createContext<
  [
    undefined | INITIAL_STATE_T,
    (action: { type: "default"; payload: unknown }) => void
  ]
>([undefined, () => {}]);

function simpleReducer(
  state: {},
  action: { type: "default"; payload: unknown }
) {
  switch (action.type) {
    case "default":
      return state;
    default:
      throw new Error(`unknown action received ${action.type}`);
  }
}

export const SimpleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(simpleReducer, INITIAL_STATE);
  return (
    <SimpleContext.Provider value={[state, dispatch]}>
      {children}
    </SimpleContext.Provider>
  );
};

export const useSimpleState = () => {
  const context = React.useContext(SimpleContext);

  if (context === undefined) {
    throw new Error("useSimpleState must be used within a SimpleProvider");
  }

  return context[0];
};

export const useSimpleDispatch = () => {
  const context = React.useContext(SimpleContext);

  if (context === undefined) {
    throw new Error("useSimpleDispatch must be used within a SimpleProvider");
  }

  return context[1];
};
