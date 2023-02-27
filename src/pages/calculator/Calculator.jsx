import { Box, Button } from "@mui/material";
import { useReducer } from "react";
import DigitButton from "../../components/buttons/DigitButton";
import OperationButton from "../../components/buttons/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = +previousOperand;
  const current = +currentOperand;
  if (isNaN(prev) || isNaN(current)) return "";
  let result = "";
  if (operation === "+") result = prev + current;
  if (operation === "-") result = prev - current;
  if (operation === "*") result = prev * current;
  if (operation === "/") result = prev / current;
  return result.toString();
};

const calculateReducer = (state, action) => {
  const { type, payload } = action;

  // Add digits action
  if (type === ACTIONS.ADD_DIGIT) {
    if (state.overwrite) {
      return {
        ...state,
        currentOperand: payload.digit,
        overwrite: false,
      };
    }
    if (payload.digit === "0" && state.currentOperand === "0") return state;
    if (payload.digit === "." && state.currentOperand.includes("."))
      return state;

    return {
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,
    };
  }
  // Choose Operation action
  if (type === ACTIONS.CHOOSE_OPERATION) {
    if (state.currentOperand == null && state.previousOperand == null)
      return state;

    if (state.currentOperand == null) {
      return {
        ...state,
        operation: payload.operation,
      };
    }

    if (state.previousOperand == null) {
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: null,
      };
    }
    return {
      ...state,
      previousOperand: evaluate(state),
      operation: payload.operation,
      currentOperand: null,
    };
  }

  if (type === ACTIONS.EVALUATE) {
    if (
      state.operation == null ||
      state.currentOperand == null ||
      state.previousOperand == null
    ) {
      return state;
    }
    return {
      ...state,
      overwrite: true,
      previousOperand: null,
      operation: null,
      currentOperand: evaluate(state),
    };
  }

  if (type === ACTIONS.DELETE_DIGIT) {
    if (state.overwrite) {
      return {
        ...state,
        overwrite: false,
        currentOperand: null,
      };
    }
    if (state.currentOperand == null) return state;
    if (state.currentOperand.length === 1)
      return {
        ...state,
        currentOperand: null,
      };
    return {
      ...state,
      currentOperand: state.currentOperand.slice(0, -1),
    };
  }
  // All CLear action
  if (type === ACTIONS.CLEAR) {
    return {};
  }
};

const Calculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    calculateReducer,
    {}
  );
  return (
    <Box
      sx={{
        display: "grid",
        margin: "2rem",
        justifyContent: "center",
        gap: "5px",
        gridTemplateColumns: "repeat(4,5rem)",
        gridTemplateRows: "minmax(7rem,auto) repeat(5,5rem)",
      }}
    >
      <Box
        sx={{
          gridColumn: "1/-1",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-around",
          padding: "0.75rem",
          wordBreak: "break-all",
          wordWrap: "break-word",
        }}
      >
        <Box sx={{ color: "rgba(255,255,255,0.75)", fontSize: "1.5rem" }}>
          {previousOperand} {operation}
        </Box>
        <Box sx={{ color: "white", fontSize: "2.5rem" }}>{currentOperand}</Box>
      </Box>
      <Button
        sx={{ gridColumn: "span 2" }}
        variant="contained"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
      >
        DEL
      </Button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <Button
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        sx={{ gridColumn: "span 2" }}
        variant="contained"
      >
        =
      </Button>
    </Box>
  );
};

export default Calculator;
