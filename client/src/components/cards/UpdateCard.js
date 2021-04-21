import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateCard } from "../../actions/cardAction";
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
  Textarea,
  Spacer
} from "@chakra-ui/react";

class UpdateCard extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      labels: "",
    };
  }

  componentDidMount() {
    let curr_card = JSON.parse(this.props.card);
    this.setState({
      title: curr_card.title,
      description: curr_card.description,
      labels: curr_card.labels,
    });
  }

  onClose = (e) => {
    this.props.onClose(e);
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    let curr_card = JSON.parse(this.props.card);
    this.props.updateCard(this.state, curr_card._id);
    this.props.onClose(e);
  };

  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalOverlay />
        <ModalContent bg="#b2dfdb">
          <ModalHeader>Update Your Card!</ModalHeader>
          <ModalCloseButton onClick={this.onClose} />
          <ModalBody>
            <FormControl id="title">
              <FormLabel>
                <b>Title</b>
              </FormLabel>
              <Input
                id="title"
                type="text"
                onChange={this.onChange}
                value={this.state.title}
                variant="flushed"
                focusBorderColor="#80cbc4"
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>
                <b>Description</b>
              </FormLabel>
              <Textarea
                id="description"
                type="text"
                onChange={this.onChange}
                value={this.state.description}
                focusBorderColor="#80cbc4"
              />
            </FormControl>
            <FormControl id="labels">
              <FormLabel>
                <b>Labels</b>
              </FormLabel>
              <Input
                id="labels"
                type="text"
                onChange={this.onChange}
                value={this.state.labels}
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
              onClick={this.onSubmit}
            >
              Save
            </Button>
            <Spacer />
            <Button
              bg="#80cbc4"
              borderRadius="12px"
              color="black"
              onClick={this.onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

export default connect(null, { updateCard })(withRouter(UpdateCard));
