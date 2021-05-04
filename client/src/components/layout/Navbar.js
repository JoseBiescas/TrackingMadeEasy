import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/new-logo.png";
import { Box, Flex } from "@chakra-ui/react";
import "./Navbar.css";

class Navbar extends Component {
  //z-depth-0
  render() {
    return (
      <Flex
        w="100%"
        h="90px"
        bg="#80cbc4"
        flexDir="row"
        justify="space-between"
      >
        <Box paddingLeft="40px" paddingTop="7px">
          <img src={logo} />
        </Box>
        <Box fontSize="xxx-large" color="black" fontFamily="sans-serif">
          <Link to="/">
            <b>TRACKING MADE EASY</b>
          </Link>
        </Box>
        <Box paddingRight="40px" paddingTop="7px">
          <img src={logo} />
        </Box>
      </Flex>
    );
  }
}

export default Navbar;
