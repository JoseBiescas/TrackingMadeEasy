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
} from "@chakra-ui/react";

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
    return (
      <Flex
        justify="center"
        align="center"
        height="75vh"
        flexDirection="column"
      >
        <Box padding="20px" borderRadius="12px" bg="#b2dfdb">
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
          <Box>
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
                  <b>Labels</b>
                </FormLabel>
                <Select
                  variant="flushed"
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
              <Button
                marginTop="20px"
                bg="#80cbc4"
                type="submit"
                borderRadius="12px"
                color="black"
              >
                Create
              </Button>
            </form>
          </Box>
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
