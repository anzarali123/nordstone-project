import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { ACTIONS } from "../../pages/calculator/Calculator";

const StyledButton = styled(Button)({
  fontSize: "1.5rem",
});

const OperationButton = ({ dispatch, operation }) => {
  const handleChooseOperation = () => {
    dispatch({
      type: ACTIONS.CHOOSE_OPERATION,
      payload: { operation },
    });
  };
  return (
    <StyledButton variant="contained" onClick={handleChooseOperation}>
      {operation}
    </StyledButton>
  );
};

export default OperationButton;
