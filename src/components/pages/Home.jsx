import React, { useState } from 'react'
import Hero from '../sections/Hero/Hero'
import Sidebar from '../sections/Hero/Sidebar'
import Marketplace from '../sections/Hero/Marketplace'
import Community from '../sections/Community/Community'
import Academy from '../sections/Academy/Academy'
import TrainerProfile from '../sections/Profile/TrainerProfile'
import BattleCenter from '../sections/Battle/BattleCenter'
import MobilePokeBox from '../utils/MobilePokeBox'

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Function to handle section changes from sidebar
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  // Map section IDs to their respective components
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'marketplace':
        return <Marketplace onSectionChange={handleSectionChange} />;
      case 'community':
        return <Community />;
      case 'academy':
        return <Academy />;
      case 'profile':
        return <TrainerProfile />;
      case 'battle':
        return <BattleCenter />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] w-full">
      <div className="w-full h-full overflow-hidden">
        {renderSection()}
      </div>
      {/* Fixed Pokédex Sidebar - now has its own responsive classes */}
      <Sidebar onSectionChange={handleSectionChange} />
      
      {/* Mobile PokeBox - only visible on mobile */}
      <MobilePokeBox onSectionChange={handleSectionChange} />
    </div>
  )
}

export default Home