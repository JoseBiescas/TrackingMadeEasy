import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link as ReactLink } from "react-router-dom"
import {
  VStack,
  Box,
  Text,
  Button
} from "@chakra-ui/react";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onCreateClick = (e) => {
    e.preventDefault();
    this.props.history.push("/create");
  };

  onViewClick = (e) => {
    e.preventDefault();
    this.props.history.push("/view");
  };

  render() {
    const { user } = this.props.auth;

    return (
      <VStack justify="center" align="center" height="75vh" spacing="5vh">
        <Box
          bg="#80cbc4"
          paddingLeft="50px"
          paddingRight="50px"
          paddingTop="25px"
          paddingBottom="25px"
          borderRadius="20px"
        >
          <Text fontSize="4xl">
          <b>Hey there,</b> {user.username.split(" ")[0]}
          </Text>
        </Box>
        <br />
        <Box>
          <Button
            as={ReactLink}
            margin="15px"
            borderRadius="12px"
            padding="20px"
            bg="#80cbc4"
            to="/create"
          >
            Create Card
          </Button>
          <Button
            as={ReactLink}
            margin="15px"
            borderRadius="12px"
            padding="20px"
            bg="#80cbc4"
            to="/view"
          >
            View Cards
          </Button>
          <Button
            onClick={this.onLogoutClick}
            margin="15px"
            borderRadius="12px"
            padding="20px"
            bg="#80cbc4"
          >
            Logout
          </Button>
        </Box>
      </VStack>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
