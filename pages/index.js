import React, { useEffect, useContext, useState } from "react";

//INTERNAL IMPORT
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PupUp } from "../Components";
const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
    getPackedCampaigns
  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState();
  const [usercampaign, setUsercampaign] = useState();

  //Unoptimized
  useEffect(() => {
    const getCampaignsData = getCampaigns();
    const userCampaignsData = getUserCampaigns();
    return async () => {
      const allData = await getCampaignsData;
      const userData = await userCampaignsData;
      setAllcampaign(allData);
      setUsercampaign(userData);
    };
  }, []);

  //PackingOnly
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const allData = await getPackedCampaigns();
  //     const userData = await getUserCampaigns(); // jika ingin tetap pakai
  //     setAllcampaign(allData);
  //     setUsercampaign(userData);
  //   };
  //   fetchData();
  // }, []);


  //DONATE  POPUP MODEL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log(donateCampaign);
  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      <Card title="All Listed Campaign" allcampaign={allcampaign} setOpenModel={setOpenModel} setDonate={setDonateCampaign} />
      <Card title="Your Created Campaign" allcampaign={usercampaign} setOpenModel={setOpenModel} setDonate={setDonateCampaign} />
      
      {openModel && (
        <PupUp setOpenModel={setOpenModel} getDonations={getDonations} donate={donateCampaign} donateFunction={donate} />
      )}
    </>
  );
};

export default index;
