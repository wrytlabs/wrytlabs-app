# Access Control via Membership

## Overview

The Membership contract provides a robust role-based access control system built on Ethereum. It leverages OpenZeppelin's AccessControl for secure and flexible permission management.

## Key Features

-   **Role-Based Access**: Three distinct roles with clear hierarchies

    -   ADMIN_ROLE: Full system control
    -   EXECUTOR_ROLE: Operation execution rights
    -   MEMBER_ROLE: Basic membership privileges

-   **Smart Contract Architecture**
    -   Factory pattern for easy deployment
    -   Inherits OpenZeppelin's battle-tested AccessControl
    -   Event emission for tracking membership creation

## Implementation

The system consists of two main contracts:

### MembershipFactory

-   Creates new membership instances
-   Emits creation events for tracking
-   Manages deployment parameters

### Membership Contract

-   Implements IMembership interface
-   Defines role constants using keccak256
-   Handles permission management

## Usage Example

```solidity
// Deploy new membership
address membership = factory.createMembership(
    adminAddress,
    executorAddress,
    memberAddress
);
```
