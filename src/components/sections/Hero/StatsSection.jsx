import React from "react";
import { Typography, Card } from "@material-tailwind/react";

// Import colors from theme
import colors from "../../../theme/colors";

const StatsSection = () => {
  // Stats data
  const stats = [
    {
      id: 1,
      title: "Creatures",
      value: "11,586",
      description: "Unique digital creatures",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Collectors",
      value: "48,932",
      description: "Active digital collectors",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Volume",
      value: "1,248.5 ETH",
      description: "Total trading volume",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Rarity Tiers",
      value: "6",
      description: "Different rarity levels",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      )
    }
  ];

  // Market activity data
  const recentActivities = [
    { id: 1, creature: "AbyssalFang", action: "Sold for", value: "1.45 ETH", time: "2 hours ago" },
    { id: 2, creature: "MagmaDrake", action: "Listed for", value: "2.10 ETH", time: "5 hours ago" },
    { id: 3, creature: "TempestSerpent", action: "Bid placed", value: "0.95 ETH", time: "6 hours ago" },
    { id: 4, creature: "PyroStriker", action: "Transferred to", value: "0x1a2...7b9c", time: "12 hours ago" },
    { id: 5, creature: "EmberWing", action: "Minted by", value: "0x7d3...9f4e", time: "1 day ago" }
  ];

  return (
    <div className="w-full bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <Typography variant="h2" className="font-pixel text-3xl mb-2" style={{ color: colors.turquoise }}>
            MARKETPLACE STATS
          </Typography>
          <Typography className="text-gray-600 max-w-2xl mx-auto">
            Track the latest statistics from our thriving creature marketplace. Our digital ecosystem continues to grow every day.
          </Typography>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.id} className="p-6 shadow-md">
              <div className="flex items-start">
                <div className="p-2 rounded-full mr-4" style={{ backgroundColor: colors.turquoise + '20', color: colors.turquoise }}>
                  {stat.icon}
                </div>
                <div>
                  <Typography variant="h3" className="font-pixel text-2xl" style={{ color: colors.gold }}>
                    {stat.value}
                  </Typography>
                  <Typography className="font-bold mb-1" style={{ color: colors.turquoise }}>
                    {stat.title}
                  </Typography>
                  <Typography className="text-gray-600 text-sm">
                    {stat.description}
                  </Typography>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Market activity */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h4" className="font-pixel text-xl" style={{ color: colors.turquoise }}>
              RECENT ACTIVITY
            </Typography>
            <button className="text-sm font-medium" style={{ color: colors.turquoise }}>
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: colors.lightYellow }}>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Creature</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Value</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b hover:bg-gray-50" style={{ borderColor: colors.lightYellow }}>
                    <td className="py-3 px-4">
                      <Typography className="font-pixel text-sm">{activity.creature}</Typography>
                    </td>
                    <td className="py-3 px-4">
                      <Typography className="text-sm text-gray-600">{activity.action}</Typography>
                    </td>
                    <td className="py-3 px-4">
                      <Typography className="text-sm font-medium" style={{ color: colors.turquoise }}>{activity.value}</Typography>
                    </td>
                    <td className="py-3 px-4">
                      <Typography className="text-sm text-gray-500">{activity.time}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 