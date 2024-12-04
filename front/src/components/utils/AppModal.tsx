import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";

export interface ModalProps {
  /** Element to render where the Modal is used */
  triggerElement: ReactElement;
  title: string;
  content: ReactElement | ReactNode;
  contentProps: object;
  /** List of buttons or element to render as modal actions */
  actions: ReactNode[];
  open: boolean;
};

const AppModal = (props: ModalProps) => {
  return (
    <Dialog open={props.open} onClose={() => {}}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        {React.cloneElement(props.content as ReactElement, props.contentProps)}
      </DialogContent>
      <DialogActions>
        {props.actions.map((action, index) => (
          <React.Fragment key={index}>{action}</React.Fragment>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default AppModal;
