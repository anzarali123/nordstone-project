import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { ACTIONS } from "../../pages/calculator/Calculator";

const StyledButton = styled(Button)({
  fontSize: "1.5rem",
});

const DigitButton = ({ dispatch, digit }) => {
  const handleAddDigit = () => {
    dispatch({
      type: ACTIONS.ADD_DIGIT,
      payload: { digit },
    });
  };
  return (
    <StyledButton onClick={handleAddDigit} variant="contained">
      {digit}
    </StyledButton>
  );
};

export default DigitButton;
