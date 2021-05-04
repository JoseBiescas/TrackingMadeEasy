import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";

import { createLabel, deleteLabel } from "../../actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "is-empty";

const EditLabel = (props) => {
  //Props
  const { editLabel, onClose, userId, labels } = props;

  //Redux
  const dispatch = useDispatch();

  var listToDelete = [];

  //State
  const [label, setLabel] = useState("");
  const [onDeleteLabel, setDeleteLabel] = useState(false);
  const [onCreateLabel, setCreateLabel] = useState(false);

  //Submit
  const onSubmit = async (data, onClose) => {
    setCreateLabel(true);
    let res;
    res = await dispatch(createLabel(data));
    setCreateLabel(false);
    onClose();
  };

  const onDelete = async (labelsToDelete) => {
    if (isEmpty(labelsToDelete.labels)) {
      return;
    } else {
      setDeleteLabel(true);
      let res;
      res = await dispatch(deleteLabel(labelsToDelete));
      setDeleteLabel(false);
      listToDelete = [];
    }
  };

  const toDelete = (label) => {
    if (listToDelete.includes(label)) {
      const index = listToDelete.indexOf(label);
      if (index > -1) {
        listToDelete.splice(index, 1);
      }
    } else {
      listToDelete.push(label);
    }
  };

  return (
    <Modal isOpen={editLabel} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#b2dfdb">
        <ModalHeader>Edit Labels</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column">
            {labels.map((label) => (
              <Checkbox
                isDisabled={labels.length === 1}
                onChange={() => toDelete(label)}
                colorScheme="red"
              >
                {label}
              </Checkbox>
            ))}
          </Flex>
          <br />
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={onDeleteLabel}
            loadingText="Deleting Labels..."
            bg="#80cbc4"
            borderRadius="12px"
            color="black"
            onClick={() => onDelete({ labels: listToDelete, user_id: userId })}
          >
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
            isLoading={onCreateLabel}
            loadingText="Saving Label"
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
