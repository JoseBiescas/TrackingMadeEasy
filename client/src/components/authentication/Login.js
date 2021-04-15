import React, { Component } from "react";
import { Link as ReactLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <Flex
        justify="center"
        align="center"
        height="60vh"
        flexDirection="column"
      >
        <Box padding="20px" borderRadius="12px" bg="#b2dfdb">
          <Box>
            <Heading>
              <b>Login</b>
              <Button
                bg="#80cbc4"
                as={ReactLink}
                to="/"
                float="right"
                size="sm"
                borderRadius="12px"
              >
                Home
              </Button>
            </Heading>
            <p>
              Don't have an account?{" "}
              <Button
                as={ReactLink}
                to="/register"
                bg="#80cbc4"
                borderRadius="12px"
                color="black"
                size="sm"
              >
                Register
              </Button>
            </p>
          </Box>
          <Box>
            <form onSubmit={this.onSubmit}>
              <FormControl isInvalid={errors.email || errors.emailnotFound}>
                <FormLabel>E-mail</FormLabel>
                <FormErrorMessage>
                  {errors.email || errors.emailnotFound}
                </FormErrorMessage>
                <Input
                  variant="flushed"
                  focusBorderColor="#80cbc4"
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  type="text"
                />
              </FormControl>
              <FormControl
                isInvalid={errors.password || errors.passwordincorrect} marginTop="10px"
              >
                <FormLabel>Password</FormLabel>
                <FormErrorMessage>
                  {errors.password || errors.passwordincorrect}
                </FormErrorMessage>
                <Input
                  focusBorderColor="#80cbc4"
                  variant="flushed"
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password}
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
                Log-In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    );
  }
}

//Login property types
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//Allows us to get our state from Redux and map it to props which we can use inside components
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// connect() connects our React component to our Redux store.
export default connect(mapStateToProps, { loginUser })(Login);
