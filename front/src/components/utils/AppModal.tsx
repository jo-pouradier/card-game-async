import React, { ReactElement, ReactNode } from "react";
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";

export type ModalProps = {
  /** Element to render where the Modal is used */
  triggerElement: ReactElement;
  title: string;
  content: ReactElement | ReactNode;
  contentProps: object;
  /** List of buttons or element to render as modal actions */
  actions: ReactNode[];
  open: boolean;
};

export const AppModal = (props: ModalProps) => {
  return (
    <Modal open={props.open} trigger={props.triggerElement}>
      <ModalHeader>{props.title}</ModalHeader>
      <ModalContent>
        {React.cloneElement(props.content as ReactElement, props.contentProps)}
      </ModalContent>
      <ModalActions>
        {props.actions.map((action, index) => (
          <React.Fragment key={index}>{action}</React.Fragment>
        ))}
      </ModalActions>
    </Modal>
  );
};

export default AppModal;
