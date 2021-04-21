import React, { Component } from "react";
import { connect } from "react-redux";
import { getCards, deleteCard } from "../../actions/cardAction";
import { Link as ReactLink } from "react-router-dom";
import UpdateCard from "./UpdateCard";

import "./ViewCard.css";
import Loader from "../loader/Loader";

import { Flex, Box, Heading, Button, Text, HStack } from "@chakra-ui/react";

class ViewCard extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      card: null,
    };
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getCards(this.props.auth.user.id);
  }

  onDelete = (e) => {
    e.preventDefault();
    this.props.deleteCard(e.target.value);
  };

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal, card: e.target.value });
  };

  render() {
    let content;
    let modal;
    if (this.props.cardsLoading) {
      content = <Loader />;
    } else if (this.state.modal) {
      modal = (
        <UpdateCard
          modal={this.state.modal}
          onClose={this.toggleModal}
          card={this.state.card}
        />
      );
    } else {
      content = this.props.cards.map((card) => (
        <Box
          key={card._id}
          bg="#b2dfdb"
          borderRadius="20px"
          padding="20px"
          marginBottom="7vh"
          width="400px"
        >
          <Box d="flex" justifyContent="space-between">
            <Button
              value={JSON.stringify(card)}
              onClick={this.toggleModal}
              bg="#80cbc4"
              borderRadius="12px"
              color="black"
              size="sm"
            >
              Open
            </Button>
            <Button
              value={card._id}
              onClick={this.onDelete}
              bg="#80cbc4"
              borderRadius="12px"
              color="black"
              size="sm"
            >
              X
            </Button>
          </Box>
          <Box>
            <Heading size="md">{card.title}</Heading>
          </Box>
        </Box>
      ));
    }

    return (
      <Box>
        <Box>
          <Button
            as={ReactLink}
            to="/dashboard"
            marginLeft="5vw"
            marginTop="5vh"
            bg="#80cbc4"
            borderRadius="12px"
            color="black"
          >
            Back to Dashboard
          </Button>
        </Box>
        <Heading paddingLeft="5vw">Cards</Heading>
        <HStack
          d="flex"
          paddingLeft="15vw"
          paddingRight="15vw"
          flexWrap="wrap"
        >
          {content}
          {modal}
        </HStack>
      </Box>
    );
  }
}

// Get state from redux and map it to properties of component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cards: state.cards.cards, // name: state.cardReducerName in root.cardReducer
  cardsLoading: state.cards.cardsLoading,
});

// export default connect(mapStateToProps, { getCards })(withRouter(ViewCard));
export default connect(mapStateToProps, { getCards, deleteCard })(ViewCard);
