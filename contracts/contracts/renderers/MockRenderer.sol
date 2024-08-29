// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Strings   } from "@openzeppelin/contracts/utils/Strings.sol";
import { Base64    } from "@openzeppelin/contracts/utils/Base64.sol";
import { IRenderer } from "../interfaces/IRenderer.sol";
import { Token     } from "../types/Token.sol";

contract MockRenderer is IRenderer {

    function uri (uint, Token calldata token, bytes memory) external pure returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"foo": "bar",',
                '"data": "', Strings.toString(token.data), '"',
            '}'
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

}