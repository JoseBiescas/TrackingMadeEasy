import React, { Component } from "react";
import { Link, Text, VStack, Box } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
// import "./Landing.css";

class Landing extends Component {
  render() {
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
            <b>Track</b> the things you need to do!
          </Text>
        </Box>
        <br />
        <Box>
          <Link
            as={ReactLink}
            margin="15px"
            borderRadius="12px"
            padding="20px"
            bg="#80cbc4"
            to="/register"
          >
            Register
          </Link>
          <Link
            as={ReactLink}
            margin="15px"
            borderRadius="12px"
            padding="20px"
            bg="#80cbc4"
            to="/login"
          >
            Log In
          </Link>
        </Box>
      </VStack>
    );
  }
}

export default Landing;
