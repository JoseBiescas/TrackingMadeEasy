import React, { Component, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { createLabel } from "../../actions/authActions";
import { useSelector, useDispatch } from "react-redux";

const CreateLabel = (props) => {
  const { addLabel, onClose, userId } = props;
  const [label, setLabel] = useState("");

  const state = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (data, onClose) => {
    let res;
    res = dispatch(createLabel(data));
    onClose();
  };

  return (
    <Modal isOpen={addLabel} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#b2dfdb">
        <ModalHeader>Add a new Label</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="title">
            <FormLabel>
              <b>New Label</b>
            </FormLabel>
            <Input
              id="title"
              type="text"
              onChange={(e) => setLabel(e.target.value)}
              value={label}
              variant="flushed"
              focusBorderColor="#80cbc4"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="#80cbc4"
            borderRadius="12px"
            color="black"
            onClick={() =>
              onSubmit({ label: label, user_id: userId }, onClose)
            }
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateLabel;