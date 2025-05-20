// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFundingPacked {
    struct Campaign {
        address owner;              // 20 bytes (1 slot)
        uint128 target;             // 16 bytes
        uint128 amountCollected;    // 16 bytes -> target + amountCollected = 1 slot
        uint64 deadline;            // 8 bytes
        bytes32 titleHash;          // 32 bytes
        bytes32 descriptionHash;    // 32 bytes
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => address[]) public donators;
    mapping(uint256 => uint256[]) public donations;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint128 _target,
        uint64 _deadline
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in future");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.target = _target;
        campaign.amountCollected = 0;
        campaign.deadline = _deadline;
        campaign.titleHash = keccak256(abi.encodePacked(_title));
        campaign.descriptionHash = keccak256(abi.encodePacked(_description));

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        require(block.timestamp < campaign.deadline, "Campaign ended");

        donators[_id].push(msg.sender);
        donations[_id].push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        if (sent) {
            campaign.amountCollected += uint128(amount);
        }
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (donators[_id], donations[_id]);
    }

    function getCampaign(uint256 _id) public view returns (
        address owner,
        uint128 target,
        uint128 amountCollected,
        uint64 deadline,
        bytes32 titleHash,
        bytes32 descriptionHash
    ) {
        Campaign memory c = campaigns[_id];
        return (
            c.owner,
            c.target,
            c.amountCollected,
            c.deadline,
            c.titleHash,
            c.descriptionHash
        );
    }

    function getNumberOfCampaigns() public view returns (uint256) {
        return numberOfCampaigns;
    }
}
