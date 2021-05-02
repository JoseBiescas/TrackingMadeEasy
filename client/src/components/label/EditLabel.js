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
  Flex,
  Checkbox,
  Spacer,
  list,
} from "@chakra-ui/react";

import { createLabel } from "../../actions/authActions";
import { useSelector, useDispatch } from "react-redux";

const EditLabel = (props) => {
  //Props
  const { editLabel, onClose, userId, labels } = props;

  //State
  const [label, setLabel] = useState("");

  //Redux
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const listToDelete = [];

  //Submit
  const onSubmit = (data, onClose) => {
    let res;
    res = dispatch(createLabel(data));
    onClose();
  };

  const onDelete = (listToDelete) => {

  }

  const toDelete = (label) => {
    if (listToDelete.includes(label)) {
      const index = listToDelete.indexOf(label)
      if (index > -1) {
        listToDelete.splice(index, 1)
      }
    } else {
      listToDelete.push(label);
    }
  }

  return (
    <Modal isOpen={editLabel} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#b2dfdb">
        <ModalHeader>Edit Labels</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column">
            {labels.map((label) => (
              <Checkbox onChange={() => toDelete(label)} colorScheme="red">
                {label}
              </Checkbox>
            ))}
          </Flex>
          <br />
        </ModalBody>
        <ModalFooter>
          <Button bg="#80cbc4" borderRadius="12px" color="black" onClick={() => onDelete(listToDelete)}>
            Delete
          </Button>
        </ModalFooter>
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
            onClick={() => onSubmit({ label: label, user_id: userId }, onClose)}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditLabel;
