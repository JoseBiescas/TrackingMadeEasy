/*
Register.js (component/authentication)

Register component for Front End.
*/

import React, { Component } from "react";
import { Link as ReactLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
// import "./Authentication.css";

class Register extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUSer = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUSer, this.props.history);
  };

  render() {
    const { errors } = this.state;
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
              <b>Register</b>
              <Button
                bg="#80cbc4"
                as={ReactLink}
                to="/"
                float="right"
                size="sm"
                marginLeft="15px"
                borderRadius="12px"
              >
                Home
              </Button>
            </Heading>
            <p>
              Already have an account?{" "}
              <Button
                as={ReactLink}
                to="/login"
                bg="#80cbc4"
                borderRadius="12px"
                color="black"
                size="sm"
              >
                Log-In
              </Button>
            </p>
          </Box>
          <Box>
            <form onSubmit={this.onSubmit}>
              <FormControl isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <FormErrorMessage>{errors.username}</FormErrorMessage>
                <Input
                  variant="flushed"
                  focusBorderColor="#80cbc4"
                  id="username"
                  onChange={this.onChange}
                  value={this.state.username}
                  type="text"
                />
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <FormLabel>E-mail</FormLabel>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
                <Input
                  variant="flushed"
                  focusBorderColor="#80cbc4"
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  type="text"
                />
              </FormControl>
              <FormControl isInvalid={errors.password} marginTop="10px">
                <FormLabel>Password</FormLabel>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
                <Input
                  focusBorderColor="#80cbc4"
                  variant="flushed"
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  type="password"
                />
              </FormControl>
              <FormControl isInvalid={errors.password2} marginTop="10px">
                <FormLabel>Password</FormLabel>
                <FormErrorMessage>{errors.password2}</FormErrorMessage>
                <Input
                  focusBorderColor="#80cbc4"
                  variant="flushed"
                  id="password2"
                  onChange={this.onChange}
                  value={this.state.password2}
                  type="password"
                />
              </FormControl>
              <Button
                marginTop="20px"
                bg="#80cbc4"
                type="submit"
                borderRadius="12px"
                color="black"
              >
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    );
  }
}

//Register property types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//Allows us to get our state from Redux and map it to props which we can use inside components
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// connect() connects our React component to our Redux store.
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
/*
 Since we can't redirect from within an action,
 Wrap Register with withRouter() and add the param this.props.history
 to allow our action (registerUser) to redirect us to another page when 
 the registration process is complete.
 */
