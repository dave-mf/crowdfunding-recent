import React from "react";

const Card = ({ allcampaign, setOpenModel, setDonate, title }) => {
   // Fungsi untuk menghitung sisa hari hingga tenggat waktu
   const daysLeft = (deadline) => {
       const difference = new Date(deadline).getTime() - Date.now();
       const remainingDays = difference / (1000 * 3600 * 24);
       return remainingDays.toFixed(0);
   };

   // Fungsi untuk memeriksa apakah kampanye masih aktif
   const isCampaignActive = (deadline) => {
       return new Date(deadline).getTime() > Date.now();
   };

   // Filter kampanye yang masih aktif
   const activeCampaigns = allcampaign?.filter((campaign) =>
       isCampaignActive(campaign.deadline)
   );

   return (
       <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
           <p className="py-16 text-exl font-bold leading-5">{title}</p>
           <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
               {activeCampaigns?.map((campaign, i) => {
                   const isFundingComplete =
                       parseFloat(campaign.amountCollected) >= parseFloat(campaign.target);

                   return (
                       <div
                           onClick={() =>
                               !isFundingComplete && (setDonate(campaign), setOpenModel(true))
                           }
                           key={i + 1}
                           className={`cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded ${
                               isFundingComplete ? "pointer-events-none opacity-90" : ""
                           }`}
                       >
                           <div className="py-5 pl-2">
                               {isFundingComplete && (
                                   <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded mb-2 inline-block">
                                       Crowdfunding Berhasil 🎉
                                   </div>
                               )}
                               <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                                   Days Left: {daysLeft(campaign.deadline)}
                               </p>
                               <a
                                   href="/"
                                   aria-label="Article"
                                   className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                               >
                                   <p className="text-3xl font-bold leading-5">
                                       {campaign.title}
                                   </p>
                               </a>
                               <p className="mb-4 text-gray-700">{campaign.description}</p>
                               <div className="flex space-x-4">
                                   <p className="font-semibold">Target: {campaign.target} ETH</p>
                                   <p className="font-semibold">
                                       Raised: {campaign.amountCollected} ETH
                                   </p>
                               </div>
                           </div>
                       </div>
                   );
               })}
           </div>
       </div>
   );
};

export default Card;
