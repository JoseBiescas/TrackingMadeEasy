import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCard } from "../../actions/cardAction";
import { Link as ReactLink, withRouter } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
  Spacer,
} from "@chakra-ui/react";
import EditLabel from "../label/EditLabel";

// import "./CreateCard.css";

class CreateCard extends Component {
  constructor() {
    super();

    this.lableInput = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      label: "",
      editLabel: false,
      errors: {},
    };
  }

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to login
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  toggleModal = () => {
    this.setState({ editLabel: !this.state.editLabel });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const cardData = {
      user: this.props.auth.user.id,
      title: this.state.title,
      description: this.state.description,
      label: this.state.label,
    };

    this.props.createCard(cardData, this.props.history);
  };

  render() {
    // const { user } = this.props.auth;
    // const { errors } = this.state;
    let modalLabel;
    if (this.state.editLabel) {
      modalLabel = (
        <EditLabel
          editLabel={this.state.editLabel}
          onClose={this.toggleModal}
          userId={this.props.auth.user.id}
          labels={this.props.auth.user.labels}
        />
      )
    }
    return (
      <Flex justify="center" align="center" height="75vh">
        {modalLabel}
        <Box padding="20px" borderRadius="12px" bg="#b2dfdb" maxW="305.083px">
          <Box>
            <Heading>
              <b>Create Card</b>
              <Button
                bg="#80cbc4"
                as={ReactLink}
                to="/dashboard"
                float="right"
                size="sm"
                marginLeft="15px"
                borderRadius="12px"
              >
                Back
              </Button>
            </Heading>
          </Box>
          <Flex>
            <form noValidate onSubmit={this.onSubmit}>
              <FormControl>
                <FormLabel>
                  <b>Title</b>
                </FormLabel>
                <Input
                  variant="flushed"
                  focusBorderColor="#80cbc4"
                  onChange={this.onChange}
                  value={this.state.title}
                  type="text"
                  id="title"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <b>Description</b>
                </FormLabel>
                <Textarea
                  variant="outline"
                  focusBorderColor="#80cbc4"
                  onChange={this.onChange}
                  value={this.state.description}
                  type="text"
                  id="description"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <b>Label</b>
                </FormLabel>
                <Select
                  variant="filled"
                  size="sm"
                  bg="#80cbc4"
                  focusBorderColor="#80cbc4"
                  onChange={this.onChange}
                  value={this.state.label}
                  type="text"
                  id="label"
                >
                  {this.props.auth.user.labels.map((label) => (
                    <option key={label}>{label}</option>
                  ))}
                </Select>
              </FormControl>
              <Flex flexDir="row">
                <Button
                  marginTop="20px"
                  bg="#80cbc4"
                  type="submit"
                  borderRadius="12px"
                  color="black"
                >
                  Create Card
                </Button>
                <Spacer />
                <Button
                  marginTop="20px"
                  bg="#80cbc4"
                  borderRadius="12px"
                  color="black"
                  onClick={this.toggleModal}
                >
                  Edit Label
                </Button>
              </Flex>
            </form>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

CreateCard.propTypes = {
  createCard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createCard })(withRouter(CreateCard));
