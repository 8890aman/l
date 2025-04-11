import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardBody,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Select,
  Option,
  Input,
  Checkbox,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import { 
  ShoppingBagIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  CurrencyDollarIcon,
  StarIcon,
  ArrowsUpDownIcon,
  UserIcon,
  ArchiveBoxIcon
} from "@heroicons/react/24/outline";
import PageTransition from "../../utils/PageTransition";

// Import animated GIF images instead of static images
import charizardGif from "../../../assets/mega_charizard_y_animated_sprite_by_noellembrooks_ddmd4dm.gif";
import gyaradosGif from "../../../assets/mega_gyarados_animated_v2__request__by_diegotoon20_d9dslj3.gif";
import raichuGif from "../../../assets/raichu.gif";
import mysteryImg from "../../../assets/pixel-art-question-mark-creature--teal-and-mint-gr.png";
import creatureGif from "../../../assets/Creature Pokemon Sprite Sticker.gif";

// Import static PNG images for more variety
import waterDragonImg from "../../../assets/pixel-art-water-dragon--blue-and-cyan-color-palett (1).png";
import electricFoxImg from "../../../assets/pixel-art-electric-fox-creature--yellow-and-white- (1).png";
import fireCreatureImg from "../../../assets/pixel-art-fire-dragon-creature--vibrant-orange-and-removebg-preview.png";
import darkWaterImg from "../../../assets/---pixel-art-dark-water-serpent-with-deep-blue-bla.png";
import fireDinoImg from "../../../assets/---pixel-art-fire-dinosaur-creature-with-crimson-s.png";
import flyingDragonImg from "../../../assets/---pixel-art-flying-water-dragon-with-cloud-like-w.png";
import magmaDragonImg from "../../../assets/---pixel-art-dragon-creature-with-magma-cracked-sc.png";
import armoredWaterImg from "../../../assets/---pixel-art-armored-water-creature-with-steel-pla.png";
import flameCreatureImg from "../../../assets/pixel-art-humanoid-animal-with-flame-covered-fists.png";

// Type and rarity color mappings
const typeColors = {
  "fire": { text: "#F97316", bg: "#FFEDD5", border: "#FDBA74" },
  "water": { text: "#0EA5E9", bg: "#E0F2FE", border: "#7DD3FC" },
  "electric": { text: "#CA8A04", bg: "#FEF9C3", border: "#FDE047" },
  "psychic": { text: "#C026D3", bg: "#FAE8FF", border: "#E879F9" },
  "dark": { text: "#6B7280", bg: "#F3F4F6", border: "#D1D5DB" },
  "flying": { text: "#6366F1", bg: "#EEF2FF", border: "#A5B4FC" },
  "dragon": { text: "#7C3AED", bg: "#F5F3FF", border: "#C4B5FD" },
  "steel": { text: "#475569", bg: "#F1F5F9", border: "#94A3B8" },
  "ground": { text: "#B45309", bg: "#FEF3C7", border: "#FBD38D" },
  "fighting": { text: "#B91C1C", bg: "#FEE2E2", border: "#FECACA" }
};

const rarityColors = {
  "common": { text: "#6B7280", bg: "#F3F4F6" },
  "uncommon": { text: "#10B981", bg: "#ECFDF5" },
  "rare": { text: "#3B82F6", bg: "#EFF6FF" },
  "epic": { text: "#8B5CF6", bg: "#F5F3FF" },
  "legendary": { text: "#F59E0B", bg: "#FFFBEB" },
  "mythical": { text: "#E11D48", bg: "#FFF1F2" }
};

// Add this function to update the user's collection in localStorage
const addToCollection = (creature) => {
  try {
    // Get current collection from localStorage or initialize empty array
    const currentCollection = JSON.parse(localStorage.getItem('pokebox-collection') || '[]');
    
    // Create new creature entry for collection based on marketplace creature
    const collectionEntry = {
      id: creature.id,
      name: creature.name,
      image: creature.image,
      number: String(creature.id).padStart(3, '0'),
      type: `${creature.type.toUpperCase()}${creature.secondaryType ? `/${creature.secondaryType.toUpperCase()}` : ''}`,
      stats: { 
        hp: 60 + Math.floor(creature.level * 0.8), 
        atk: 50 + Math.floor(creature.level * 1.1),
        def: 45 + Math.floor(creature.level * 0.6),
        spd: 40 + Math.floor(creature.level * 1.2)
      },
      height: `${(1 + Math.random() * 2).toFixed(1)}m`,
      weight: `${(10 + Math.random() * 90).toFixed(1)}kg`,
      desc: creature.description.substring(0, 120)
    };
    
    // Check if creature already exists in collection by ID
    const existingIndex = currentCollection.findIndex(item => item.id === creature.id);
    
    // If it doesn't exist, add it to collection
    if (existingIndex === -1) {
      currentCollection.push(collectionEntry);
      localStorage.setItem('pokebox-collection', JSON.stringify(currentCollection));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error adding to collection:", error);
    return false;
  }
};

const MarketPlace = ({ onSectionChange }) => {
  const [sortBy, setSortBy] = useState("price-asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 9999]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRarity, setSelectedRarity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTransferring, setIsTransferring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const itemsPerPage = 6; // Show only 6 items per page
  const [pageTransition, setPageTransition] = useState(true);
  
  // Add animation effect when component mounts
  useEffect(() => {
    // Start with transition active
    setPageTransition(true);
    
    // Remove transition after delay will be handled by the component
  }, []);
  
  // Function to handle transition completion
  const handleTransitionComplete = () => {
    setPageTransition(false);
  };
  
  // Marketplace items data with animated GIFs
  const marketItems = [
    {
      id: 1,
      name: "TidalWraith",
      image: gyaradosGif,
      type: "water",
      secondaryType: "dragon",
      price: 1250,
      seller: "AquaTrader",
      rarity: "rare",
      level: 28,
      description: "This powerful water creature commands the seas with devastating wave attacks. Its tidal energy can wash away opponents in seconds. Inspired by Gyarados."
    },
    {
      id: 2,
      name: "VoltVixen",
      image: raichuGif,
      type: "electric",
      secondaryType: null,
      price: 980,
      seller: "ThunderCollector",
      rarity: "uncommon",
      level: 23,
      description: "A swift electric-type with lightning-fast reflexes. Its electrical charges can paralyze enemies before they can react. Inspired by Raichu."
    },
    {
      id: 3,
      name: "EmberWing",
      image: charizardGif,
      type: "fire",
      secondaryType: "flying",
      price: 1560,
      seller: "BlazeMaster",
      rarity: "rare",
      level: 32,
      description: "The EmberWing's flames burn with extraordinary intensity. Its wings scatter burning embers that can ignite entire battlefields. Inspired by Charizard."
    },
    {
      id: 4,
      name: "EnigmaShift",
      image: mysteryImg,
      type: "psychic",
      secondaryType: null,
      price: 2800,
      seller: "MysteryDealer",
      rarity: "legendary",
      level: 40,
      description: "A mysterious creature with the ability to shift between different forms. Its true power remains unknown to all but the most skilled trainers. Inspired by Mew."
    },
    {
      id: 5,
      name: "Baby TidalWraith",
      image: gyaradosGif,
      type: "water",
      secondaryType: null,
      price: 580,
      seller: "BreederElite",
      rarity: "common",
      level: 5,
      description: "A young TidalWraith still developing its powers. With proper training, it will grow into a formidable aquatic force. Inspired by Magikarp."
    },
    {
      id: 6,
      name: "Elite VoltVixen",
      image: raichuGif,
      type: "electric",
      secondaryType: null,
      price: 1850,
      seller: "ChampionTrainer",
      rarity: "epic",
      level: 45,
      description: "A specially trained VoltVixen with enhanced electrical output. Its specialized attacks can overload most defensive systems. Inspired by Raichu."
    },
    {
      id: 7,
      name: "EmberWing Hatchling",
      image: charizardGif,
      type: "fire",
      secondaryType: null,
      price: 620,
      seller: "FireBreeder",
      rarity: "common",
      level: 8,
      description: "A newly hatched EmberWing with boundless potential. Its flames are small now but will grow with its confidence and experience. Inspired by Charmander."
    },
    {
      id: 8,
      name: "Shadowy EnigmaShift",
      image: mysteryImg,
      type: "dark",
      secondaryType: "psychic",
      price: 3200,
      seller: "ShadowMerchant",
      rarity: "legendary",
      level: 50,
      description: "A variant of EnigmaShift that has embraced dark energy. Its shadowy powers can bend reality and confuse the strongest opponents. Inspired by Mewtwo."
    },
    // New creatures
    {
      id: 9,
      name: "AquaSerpent",
      image: darkWaterImg,
      type: "water",
      secondaryType: "dark",
      price: 1450,
      seller: "DeepSeaTrader",
      rarity: "epic",
      level: 36,
      description: "This serpentine creature lurks in the darkest depths of the ocean. Its scales absorb light, allowing it to move unseen through murky waters. Inspired by Milotic."
    },
    {
      id: 10,
      name: "ElectroTail",
      image: electricFoxImg,
      type: "electric",
      secondaryType: null,
      price: 1100,
      seller: "VoltageDealer",
      rarity: "rare",
      level: 25,
      description: "A nimble fox-like creature that can generate massive electrical discharges from its tail. It moves at blinding speeds when charged. Inspired by Jolteon."
    },
    {
      id: 11,
      name: "PyroClaw",
      image: flameCreatureImg,
      type: "fire",
      secondaryType: "fighting",
      price: 1950,
      seller: "FlameFistTrainer",
      rarity: "epic",
      level: 42,
      description: "A humanoid creature with perpetually burning fists. Its melee combat abilities are unmatched, as every punch delivers searing heat. Inspired by Blaziken."
    },
    {
      id: 12,
      name: "HydroBlade",
      image: armoredWaterImg,
      type: "water",
      secondaryType: "steel",
      price: 2300,
      seller: "ArmorCrafter",
      rarity: "epic",
      level: 38,
      description: "Its steel plating can withstand extreme water pressures. This armored aquatic creature uses pressurized water jets to slice through obstacles. Inspired by Empoleon."
    },
    {
      id: 13,
      name: "SkyDragon",
      image: flyingDragonImg,
      type: "flying",
      secondaryType: "water",
      price: 2650,
      seller: "CloudRider",
      rarity: "rare",
      level: 35,
      description: "This majestic dragon soars through the skies, leaving trails of mist in its wake. It can conjure rainstorms to rejuvenate parched lands. Inspired by Altaria."
    },
    {
      id: 14,
      name: "MagmaShard",
      image: magmaDragonImg,
      type: "fire",
      secondaryType: "dragon",
      price: 2950,
      seller: "VolcanoKeeper",
      rarity: "legendary",
      level: 48,
      description: "Born in the heart of an active volcano, its scales are literally cracked with flowing magma. Few trainers can handle its extreme heat. Inspired by Reshiram."
    },
    {
      id: 15,
      name: "BlazeTooth",
      image: fireDinoImg,
      type: "fire",
      secondaryType: "ground",
      price: 1750,
      seller: "FossilHunter",
      rarity: "rare",
      level: 30,
      description: "An ancient dinosaur-like creature reborn with the power of flame. Its footsteps leave scorched earth wherever it treads. Inspired by Typhlosion."
    },
    {
      id: 16,
      name: "AquaDrake",
      image: waterDragonImg,
      type: "water",
      secondaryType: "dragon",
      price: 2800,
      seller: "TidalMaster",
      rarity: "legendary",
      level: 45,
      description: "This majestic water dragon commands the tides with a mere thought. Ancient stories tell of it causing floods or calming stormy seas. Inspired by Kingdra."
    },
    {
      id: 17,
      name: "SparkBeast",
      image: creatureGif,
      type: "electric",
      secondaryType: "fighting",
      price: 3500,
      seller: "ThunderChampion",
      rarity: "mythical",
      level: 55,
      description: "This extremely rare creature's body constantly discharges electricity. Legend says it was born from a lightning strike that hit a sacred mountain. Inspired by Zeraora."
    },
    {
      id: 18,
      name: "InfernoKing",
      image: fireCreatureImg,
      type: "fire",
      secondaryType: "psychic",
      price: 3800,
      seller: "FlameOracle",
      rarity: "mythical",
      level: 60,
      description: "This creature's flames burn with psychic energy, allowing it to see the future in the dancing patterns of its fire. Extremely difficult to train. Inspired by Delphox."
    }
  ];
  
  // Filter functions
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const filteredItems = marketItems.filter(item => {
    // Apply search filter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply price range filter
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    // Apply type filter (if any types are selected)
    const matchesType = selectedTypes.length === 0 || 
                        selectedTypes.includes(item.type) ||
                        (item.secondaryType && selectedTypes.includes(item.secondaryType));
    
    // Apply rarity filter (if any rarities are selected)
    const matchesRarity = selectedRarity.length === 0 || selectedRarity.includes(item.rarity);
    
    return matchesSearch && matchesPrice && matchesType && matchesRarity;
  });
  
  // Sort filtered items based on selected sort option
  const sortedAndFilteredItems = [...filteredItems].sort((a, b) => {
    switch(sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "level-asc":
        return a.level - b.level;
      case "level-desc":
        return b.level - a.level;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAndFilteredItems.length / itemsPerPage);

  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle opening the buy modal
  const handleBuyClick = (item) => {
    setSelectedItem(item);
    setOpenBuyModal(true);
  };

  // Handle closing the buy modal
  const handleCloseModal = () => {
    setOpenBuyModal(false);
    setSelectedItem(null);
  };

  // Add state to track user's collection
  const [userCollection, setUserCollection] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pokebox-collection') || '[]').map(item => item.id);
    } catch (error) {
      console.error("Error loading collection:", error);
      return [];
    }
  });

  // Add effect to update collection when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const collection = JSON.parse(localStorage.getItem('pokebox-collection') || '[]');
        setUserCollection(collection.map(item => item.id));
      } catch (error) {
        console.error("Error updating collection from localStorage:", error);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle purchase confirmation
  const handleConfirmPurchase = () => {
    // Show transfer progress
    setIsTransferring(true);
    
    // Simulate progress increase
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        // Complete the purchase and close modal after progress reaches 100%
        setTimeout(() => {
          setIsTransferring(false);
          setProgress(0);
          setOpenBuyModal(false);
          
          // Set notification message based on purchased creature
          if (selectedItem) {
            // Add the purchased creature to the collection
            const isNewAddition = addToCollection(selectedItem);
            
            // Set message based on whether it was added or already exists
            const message = isNewAddition
              ? `${selectedItem.name} successfully added to your collection!`
              : `${selectedItem.name} is already in your collection!`;
            
            // Local notification only - no more sidebar notification
            setNotificationMessage(message);
            setShowNotification(true);
            
            // Update local collection state
            if (isNewAddition && !userCollection.includes(selectedItem.id)) {
              setUserCollection(prev => [...prev, selectedItem.id]);
            }
            
            // Trigger a storage event so other components know collection changed
            // This will help update the sidebar immediately without notification
            window.dispatchEvent(new Event('storage'));
            
            // Auto-dismiss notification after 5 seconds
            setTimeout(() => {
              setShowNotification(false);
            }, 5000);
          }
          
          setSelectedItem(null);
        }, 500);
      }
    }, 200); // Update every 200ms for a total of about 2 seconds
  };

  // Updated card render function to show collection badge for owned creatures
  const renderCard = (item) => {
    const owned = userCollection.includes(item.id);
    
    return (
      <Card 
        key={item.id}
        className="border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
      >
        <div className="relative">
          {/* Image container with creature image */}
          <div 
            className="h-48 flex items-center justify-center p-4 border-b"
            style={{ 
              background: `linear-gradient(135deg, ${typeColors[item.type].bg} 0%, white 100%)`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Collection badge - displays if creature is in collection */}
            {owned && (
              <div className="absolute top-2 left-2 z-10 bg-[#3298cb] text-white p-1 rounded-full border-2 border-white shadow-md">
                <ArchiveBoxIcon className="h-5 w-5" />
              </div>
            )}
            
            {/* Type Badge */}
            <div 
              className="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-semibold z-10"
              style={{ 
                backgroundColor: typeColors[item.type].bg,
                color: typeColors[item.type].text,
                borderColor: typeColors[item.type].border,
                borderWidth: 1
              }}
            >
              {item.type.toUpperCase()}
            </div>
            
            {/* Secondary Type Badge (if any) */}
            {item.secondaryType && (
              <div 
                className="absolute top-9 right-2 px-2 py-1 rounded-lg text-xs font-semibold z-10"
                style={{ 
                  backgroundColor: typeColors[item.secondaryType].bg,
                  color: typeColors[item.secondaryType].text,
                  borderColor: typeColors[item.secondaryType].border,
                  borderWidth: 1
                }}
              >
                {item.secondaryType.toUpperCase()}
              </div>
            )}
            
            {/* Rarity Badge */}
            <div 
              className="absolute bottom-2 left-2 px-2 py-1 rounded-lg text-xs font-semibold z-10 flex items-center"
              style={{ 
                backgroundColor: rarityColors[item.rarity].bg,
                color: rarityColors[item.rarity].text,
              }}
            >
              <StarIcon className="h-3 w-3 mr-1" />
              {item.rarity.toUpperCase()}
            </div>
            
            {/* Level Badge */}
            <div 
              className="absolute bottom-2 right-2 px-2 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300 z-10"
            >
              LVL {item.level}
            </div>
            
            <img
              src={item.image}
              alt={item.name}
              className="max-h-36 max-w-36 object-contain z-0 transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>

        <CardBody className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <Typography variant="h5" className="font-pixel text-lg text-gray-800">
              {item.name}
            </Typography>
            <Typography className="text-right font-semibold text-[#3298cb]">
              ${item.price}
            </Typography>
          </div>
          
          <Typography className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">
            {item.description}
          </Typography>
          
          <div className="flex justify-between items-center mt-auto">
            <Typography className="text-xs text-gray-500">
              Seller: {item.seller}
            </Typography>
            
            <Button
              size="sm"
              className={`rounded-lg px-3 py-1 font-pixel text-xs flex items-center gap-1 
                ${owned 
                  ? 'bg-[#85DDFF] text-[#1a4971] hover:bg-[#ADD8E6]' 
                  : 'bg-[#3298cb] text-white hover:bg-[#2a6fa8]'}`}
              onClick={() => handleBuyClick(item)}
            >
              {owned ? (
                <>
                  <ArchiveBoxIcon className="h-3 w-3" />
                  Owned
                </>
              ) : (
                <>
                  <ShoppingBagIcon className="h-3 w-3" />
                  Buy Now
                </>
              )}
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="h-screen bg-white relative overflow-auto">
      {/* Use the new PageTransition component */}
      <PageTransition 
        isActive={pageTransition}
        onTransitionComplete={handleTransitionComplete}
        pageName="MARKETPLACE"
        excludeSidebar={true}
        duration={1000}
      />
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-subtle w-[90%] max-w-[320px]">
          <div className="bg-[#3298cb] border-4 border-[#2a6fa8] rounded-lg shadow-lg overflow-hidden w-full font-pixel select-none" 
            style={{ 
              boxShadow: '0 0 0 2px #000, 0 0 0 4px #2a6fa8, 0 5px 15px rgba(0,0,0,0.5)',
              imageRendering: 'pixelated'
            }}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-1 border-b-2 border-[#111111] flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#AAFF00] mr-1.5 border border-[#85DDFF] animate-pulse shadow-sm"></div>
              <Typography className="font-pixel text-xs text-white">POKÉDEX NOTIFICATION</Typography>
            </div>
            <div className="p-3 bg-[#85DDFF] text-white flex items-center">
              <div className="mr-2 w-8 h-8 flex-shrink-0">
                {/* Pixelated Pokéball icon */}
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500 overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="absolute inset-0 rounded-full bg-white overflow-hidden" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}></div>
                  <div className="absolute inset-0 w-full h-[2px] bg-[#111111] top-1/2 transform -translate-y-1/2"></div>
                  <div className="absolute w-4 h-4 rounded-full bg-white border-2 border-[#111111] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-gray-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              <Typography className="font-pixel text-xs text-navy-800">
                {notificationMessage}
              </Typography>
            </div>
            <div className="bg-[#2a6fa8] px-3 py-1 border-t-2 border-[#85DDFF] flex items-center justify-between">
              <div className="w-2 h-2 rounded-full bg-[#85DDFF] border border-[#3298cb]"></div>
              <Typography className="font-pixel text-[8px] text-white">TAP A TO DISMISS</Typography>
              <div className="w-2 h-2 rounded-full bg-[#AAFF00] border border-[#00AA00]"></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full h-full px-4 py-2 bg-white border-4 border-[#3298cb] rounded-lg lg:pr-[380px] overflow-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-2">
          <div>
            <Typography variant="h2" className="font-pixel text-xl text-[#3298cb] drop-shadow-sm">
              MARKETPLACE
            </Typography>
            <Typography className="text-gray-600 max-w-2xl text-xs">
              Browse and purchase unique creatures to expand your collection.
            </Typography>
          </div>
          <Button
            className="flex items-center gap-1 px-3 py-2 font-pixel text-[10px] bg-gradient-to-r from-blue-500 to-blue-700 text-white mt-2 sm:mt-0"
            size="sm"
            onClick={() => onSectionChange && onSectionChange('profile')}
          >
            <UserIcon className="h-3 w-3" />
            TRAINER PROFILE
          </Button>
        </div>
        
        <div className="min-h-[calc(100vh-100px)] flex flex-col">
          <div className="flex-1">
            {/* Mobile: Filters Toggle Button */}
            <div className="md:hidden mb-3">
              <Button
                color="blue"
                className="w-full flex items-center justify-center gap-2 font-pixel py-2 bg-[#3298cb] text-white text-xs"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              >
                <FunnelIcon className="h-3 w-3" />
                {showFiltersMobile ? "HIDE FILTERS" : "SHOW FILTERS"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Filters Section - More compact */}
              <div className={`md:col-span-1 h-full mb-4 md:mb-0 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
                <Card className="bg-white border-4 border-[#3298cb] shadow-md rounded-lg h-full overflow-hidden">
                  <CardBody className="p-2 bg-[#85DDFF]">
                    <Typography variant="h5" className="font-pixel mb-1 text-[#2a6fa8] flex items-center gap-1 text-xs">
                      <FunnelIcon className="h-3 w-3 text-[#2a6fa8]" />
                          FILTERS
                        </Typography>
                        
                        {/* Search */}
                    <div className="mb-1.5">
                      <Typography variant="small" className="font-medium mb-0.5 font-pixel text-[#2a6fa8] text-[10px]">
                            Search
                          </Typography>
                          <Input
                        icon={<AdjustmentsHorizontalIcon className="h-3 w-3 text-gray-400" />}
                        placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        className="!border !border-t-blue-gray-200 focus:!border-t-blue-500 rounded-md text-[10px]"
                            labelProps={{
                              className: "font-pixel"
                            }}
                  />
                </div>
                
                        {/* Price Range */}
                    <div className="mb-1.5">
                      <Typography variant="small" className="font-medium mb-0.5 font-pixel text-[#2a6fa8] text-[10px]">
                            Price Range
                          </Typography>
                      <div className="flex items-center gap-1 p-1 rounded-md bg-[#3298cb] border border-[#2a6fa8]">
                            <div className="relative">
                          <CurrencyDollarIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-gray-400" />
                              <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([parseInt(e.target.value || 0), priceRange[1]])}
                            className="w-full pl-4 pr-1 py-0.5 border border-gray-200 rounded-md bg-white font-sans text-[10px] text-gray-700 outline outline-0 transition-all focus:outline-0 focus:border-blue-500"
                                placeholder="Min"
                              />
                            </div>
                        <span className="font-pixel text-white text-[10px]">to</span>
                            <div className="relative">
                          <CurrencyDollarIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 h-2.5 w-2.5 text-gray-400" />
                              <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value || 9999)])}
                            className="w-full pl-4 pr-1 py-0.5 border border-gray-200 rounded-md bg-white font-sans text-[10px] text-gray-700 outline outline-0 transition-all focus:outline-0 focus:border-blue-500"
                                placeholder="Max"
                              />
                            </div>
                          </div>
                        </div>
                        
                    {/* Type Filter - Simplified */}
                    <div className="mb-1.5">
                      <Typography variant="small" className="font-medium mb-0.5 font-pixel text-[#2a6fa8] text-[10px]">
                            Type
                          </Typography>
                      <div className="grid grid-cols-3 gap-1">
                            {Object.keys(typeColors).map((type) => (
                              <div 
                                key={type}
                                onClick={() => handleTypeToggle(type)}
                            className={`cursor-pointer rounded-md px-1 py-0.5 text-[8px] font-pixel font-medium uppercase transition-all duration-200 hover:scale-105 border ${
                                  selectedTypes.includes(type)
                                    ? `bg-${typeColors[type].bg} text-${typeColors[type].text} border-${typeColors[type].border}`
                                : 'bg-[#3298cb] text-white border-[#2a6fa8]'
                            } flex items-center justify-center`}
                      style={{ 
                                  backgroundColor: selectedTypes.includes(type) ? typeColors[type].bg : '',
                                  color: selectedTypes.includes(type) ? typeColors[type].text : '',
                                  borderColor: selectedTypes.includes(type) ? typeColors[type].border : ''
                                }}
                              >
                                {type}
                              </div>
                            ))}
                </div>
              </div>
              
                        {/* Sort Options */}
                    <div className="mb-1.5">
                      <Typography variant="small" className="font-medium mb-0.5 font-pixel text-[#2a6fa8] text-[10px] flex items-center gap-1">
                        <ArrowsUpDownIcon className="h-2.5 w-2.5" />
                            Sort By
                  </Typography>
                          <Select 
                            value={sortBy} 
                            onChange={(value) => setSortBy(value)}
                        size="sm"
                        className="font-pixel border rounded-md text-[10px] border-[#2a6fa8]"
                      >
                        <Option value="price-asc" className="font-pixel text-[10px]">Price: Low to High</Option>
                        <Option value="price-desc" className="font-pixel text-[10px]">Price: High to Low</Option>
                        <Option value="level-asc" className="font-pixel text-[10px]">Level: Low to High</Option>
                        <Option value="level-desc" className="font-pixel text-[10px]">Level: High to Low</Option>
                        <Option value="name-asc" className="font-pixel text-[10px]">Name: A to Z</Option>
                        <Option value="name-desc" className="font-pixel text-[10px]">Name: Z to A</Option>
                          </Select>
                        </div>
                        
                        {/* Reset Button */}
                        <Button
                          variant="outlined"
                      color="blue"
                      className="mt-1 w-full font-pixel py-0.5 hover:bg-[#3298cb]/20 transition-colors duration-200 border border-[#2a6fa8] rounded-md text-[10px] text-[#2a6fa8]"
                          onClick={() => {
                            setSearchTerm("");
                            setPriceRange([0, 9999]);
                            setSelectedTypes([]);
                            setSelectedRarity([]);
                            setSortBy("price-asc");
                        setCurrentPage(1);
                          }}
                        >
                          Reset Filters
                        </Button>
                      </CardBody>
                    </Card>
                </div>
                
                  {/* Items Grid */}
              <div className="md:col-span-3">
                <div className="bg-white border-4 border-[#3298cb] p-2 rounded-lg">
                  <div className="bg-[#85DDFF] rounded-lg p-2">
                    <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <Typography variant="small" className="font-medium text-[#2a6fa8] font-pixel text-[10px] mb-2 sm:mb-0">
                        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedAndFilteredItems.length)} of {sortedAndFilteredItems.length}
                      </Typography>
                      
                      {/* Page navigation */}
                      <div className="flex items-center gap-2">
                        <Button 
                            size="sm"
                          variant="text" 
                          disabled={currentPage === 1}
                          onClick={prevPage}
                          className="p-0.5 font-pixel text-[10px] text-white"
                        >
                          ◀
                        </Button>
                        <Typography className="font-pixel text-[10px] text-white">
                          {currentPage}/{totalPages || 1}
                        </Typography>
                        <Button 
                            size="sm"
                          variant="text" 
                          disabled={currentPage === totalPages || totalPages === 0}
                          onClick={nextPage}
                          className="p-0.5 font-pixel text-[10px] text-white"
                        >
                          ▶
                        </Button>
                      </div>
                    </div>
                    
                    {currentItems.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {currentItems.map(item => renderCard(item))}
        </div>
                    ) : (
                      <div className="bg-[#3298cb] rounded-lg p-2 text-center shadow-sm border border-[#2a6fa8]">
                        <Typography className="text-white font-pixel text-[10px]">
                          No creatures found matching your filters. Try adjusting your search criteria.
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Buy Modal */}
      <Dialog 
        open={openBuyModal} 
        handler={handleCloseModal}
        className="bg-white border-4 border-[#3298cb] shadow-xl rounded-xl font-pixel my-6 mx-auto max-w-[95%] sm:max-w-md"
        size="sm"
      >
        {selectedItem && (
          <>
            <DialogHeader className="flex flex-col items-center justify-center border-b border-[#85DDFF] p-3 bg-[#3298cb]">
              <Typography variant="h4" className="font-pixel text-base text-white">
                {isTransferring ? "TRANSFERRING" : "CONFIRM PURCHASE"}
              </Typography>
            </DialogHeader>
            
            {isTransferring ? (
              <DialogBody className="p-6 flex flex-col items-center bg-[#85DDFF]/20">
                <Typography className="font-pixel text-sm text-[#2a6fa8] mb-3 text-center">
                  Transferring your new creature...
                </Typography>
                
                {/* 8-bit style pixelated progress bar */}
                <div className="w-full h-8 bg-[#3298cb] relative mb-2 overflow-hidden" style={{ borderRadius: '2px', boxShadow: 'inset 0 0 0 2px #000, inset 0 0 0 4px #2a6fa8' }}>
                  {/* Pixelated progress fill - using step increments */}
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`absolute top-0 bottom-0 left-0 transition-all duration-100 bg-gradient-to-r from-blue-500 to-blue-700`}
                      style={{ 
                        width: `${progress >= (i+1)*10 ? (i+1)*10 : 0}%`,
                        display: progress >= i*10 ? 'block' : 'none',
                        clipPath: 'polygon(0% 0%, 95% 0%, 100% 20%, 100% 80%, 95% 100%, 0% 100%)'
                      }}
                    />
                  ))}
                  
                  {/* Pixelated grid overlay for 8-bit effect */}
                  <div className="absolute inset-0 opacity-10" 
                    style={{
                      backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                      backgroundSize: '4px 4px'
                    }}
                  />
                  
                  {/* Progress percentage */}
                    <div className="absolute inset-0 flex items-center justify-center">
                    <Typography className="font-pixel text-[10px] text-white drop-shadow-md z-10">
                      {progress}%
                    </Typography>
                      </div>
                    </div>
                
                {/* Pixelated decorative elements */}
                <div className="w-full flex justify-between items-center px-2 mb-2">
                  <div className="h-4 w-4 bg-[#3298cb]" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 25%, 100% 100%, 25% 100%, 0% 75%)' }}></div>
                  <div className="h-4 w-4 bg-[#3298cb]" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%, 0% 25%)' }}></div>
                    </div>
                
                {/* Enhanced pixel art loading animation */}
                <div className="flex space-x-2 mt-2">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i} 
                      className={`transition-all duration-150 transform ${progress % 3 === i ? 'scale-100' : 'scale-75'}`}
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: progress % 3 === i ? '#3298cb' : '#85DDFF',
                        clipPath: 'polygon(0% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
                      }}
                    ></div>
                  ))}
                    </div>
                
                {/* Pixelated text */}
                <Typography className="font-pixel text-[8px] text-[#2a6fa8] mt-2 tracking-wide">
                  PLEASE DO NOT TURN OFF YOUR POKEDEX
                </Typography>
              </DialogBody>
            ) : (
              <>
                <DialogBody className="p-4 flex flex-col items-center bg-[#85DDFF]/10">
                  <div className="w-full flex flex-col items-center mb-4">
                    <div className="aspect-square p-2 flex items-center justify-center overflow-hidden relative w-28 sm:w-32 h-28 sm:h-32 mb-2"
                        style={{
                          background: `radial-gradient(circle at center, ${typeColors[selectedItem.type].bg}30, transparent)`
                        }}
                    >
                      <img 
                        src={selectedItem.image} 
                        alt={selectedItem.name}
                        className="h-24 sm:h-28 w-24 sm:w-28 object-contain z-10 drop-shadow-lg"
                      />
                    </div>
                    
                    <Typography variant="h5" className="font-pixel text-sm sm:text-base bg-gradient-to-br from-[#2a6fa8] to-[#3298cb] bg-clip-text text-transparent mb-1">
                      {selectedItem.name}
                    </Typography>
                    
                    <div className="flex gap-2 mb-2">
                      <div className="px-2 py-0.5 rounded-md font-pixel text-[10px] shadow-sm border capitalize"
                        style={{
                          borderColor: typeColors[selectedItem.type].border,
                          color: typeColors[selectedItem.type].text,
                          background: `linear-gradient(135deg, white, ${typeColors[selectedItem.type].bg})`
                        }}
                      >
                        {selectedItem.type}
                  </div>
                  
                      <div className="px-2 py-0.5 rounded-md font-pixel text-[10px] shadow-sm border capitalize"
                        style={{
                          borderColor: rarityColors[selectedItem.rarity].text,
                          color: rarityColors[selectedItem.rarity].text,
                          background: `linear-gradient(135deg, white, ${rarityColors[selectedItem.rarity].bg})`
                        }}
                      >
                        {selectedItem.rarity}
                      </div>
                    </div>
                    
                    <Typography className="font-pixel text-xs text-[#2a6fa8] text-center mb-2">
                      {selectedItem.description}
                    </Typography>
                    
                    <div className="bg-[#85DDFF]/20 p-3 rounded-lg w-full mb-3 border border-[#3298cb]/30">
                      <div className="flex justify-between items-center">
                        <Typography className="font-pixel text-xs text-[#2a6fa8]">
                          Level:
                        </Typography>
                        <Typography className="font-pixel text-xs text-[#2a6fa8]">
                          {selectedItem.level}
                        </Typography>
                      </div>
                      <div className="flex justify-between items-center">
                        <Typography className="font-pixel text-xs text-[#2a6fa8]">
                          Seller:
                        </Typography>
                        <Typography className="font-pixel text-xs text-[#2a6fa8]">
                          {selectedItem.seller}
                        </Typography>
                    </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#3298cb]/20">
                        <Typography className="font-pixel text-sm text-[#2a6fa8]">
                          Price:
                        </Typography>
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="w-3.5 h-3.5 mr-0.5 text-amber-600" />
                          <Typography className="font-pixel text-base text-amber-600 font-bold">
                            {selectedItem.price}
                          </Typography>
                  </div>
                      </div>
                    </div>
                    
                    <Typography className="font-pixel text-xs text-[#2a6fa8] text-center">
                      Do you want to purchase this creature?
                    </Typography>
                  </div>
                </DialogBody>
                <DialogFooter className="flex justify-between p-3 border-t border-[#85DDFF] bg-[#85DDFF]/10">
                  <Button 
                    variant="outlined"
                    onClick={handleCloseModal}
                    className="font-pixel text-xs border border-[#3298cb] text-[#2a6fa8] hover:bg-[#85DDFF]/20"
                    disabled={isTransferring}
                  >
                    CANCEL
                  </Button>
                  <Button 
                    onClick={handleConfirmPurchase}
                    className="font-pixel text-xs bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 border border-white/20"
                    disabled={isTransferring}
                  >
                    CONFIRM
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        )}
      </Dialog>
    </div>
  );
};

export default MarketPlace; 