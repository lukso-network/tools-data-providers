// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/LSP2FetcherWithMulticall3.sol";

contract TestContract is Test {
    LSP2FetcherWithMulticall3 c;

    function setUp() public {
        c = new LSP2FetcherWithMulticall3();
    }

    function testBar() public {
        assertEq(uint256(1), uint256(1), "ok");
    }

    function testFoo(uint256 x) public {
        vm.assume(x < type(uint128).max);
        assertEq(x + x, x * 2);
    }
}
