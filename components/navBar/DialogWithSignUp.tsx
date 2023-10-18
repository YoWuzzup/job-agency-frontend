import { Dialog, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SignUpFormTabs } from "..";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  ".MuiDialog-paper": {
    margin: 0,
    "& .MuiDialogContent-root": {
      padding: "0",
      backgroundColor: "#fff",
    },
    "& .MuiDialogActions-root": {
      padding: "0",
      justifyContent: "center",
    },
  },
}));

export const DialogWithSignUp: React.FC<{
  openSignUpForm: boolean;
  handleSignUpPopupClose: () => void;
}> = ({ openSignUpForm, handleSignUpPopupClose }) => {
  return (
    <StyledDialog open={openSignUpForm} onClose={handleSignUpPopupClose}>
      <DialogContent
        sx={{
          width: { xs: "100%", md: "540px" },
        }}
      >
        <SignUpFormTabs handleSignUpPopupClose={handleSignUpPopupClose} />
      </DialogContent>
    </StyledDialog>
  );
};
