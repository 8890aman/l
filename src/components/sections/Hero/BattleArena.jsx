import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardBody,
  Button,
  Progress,
  Tabs,
  TabsHeader,
  Tab
} from "@material-tailwind/react";
import { 
  BoltIcon, 
  ShieldIcon, 
  FireIcon, 
  TrophyIcon, 
  ArrowPathIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import colors from "../../../theme/colors";

// Import creature images
import TidalWraithImg from "../../../assets/pixel-art--gyarados-nft-collectible-style--white-b.png";
import VoltVixenImg from "../../../assets/pixel-art--electrofox-nft-collectible-style--white-background.png";
import EmberWingImg from "../../../assets/pixel-art--firedragon-nft-collectible-style--white-background.png";

const BattleArena = () => {
  const [selectedCreatures, setSelectedCreatures] = useState({
    player: "TidalWraith",
    opponent: "EmberWing"
  });
  const [battleLog, setBattleLog] = useState([
    "Welcome to the Battle Arena!",
    "Select your creatures and prepare for battle.",
    "Type advantages: Water > Fire, Fire > Electric, Electric > Water"
  ]);
  const [battleStats, setBattleStats] = useState({
    player: { hp: 100, energy: 100 },
    opponent: { hp: 100, energy: 100 }
  });
  const [battleState, setBattleState] = useState("ready"); // ready, active, finished
  const [activeTab, setActiveTab] = useState("battle");
  
  // Available creatures
  const creatures = {
    "TidalWraith": {
      name: "TidalWraith",
      image: TidalWraithImg,
      type: "water",
      stats: {
        power: 85,
        speed: 70,
        defense: 65
      },
      moves: [
        { name: "Tidal Wave", power: 60, energy: 20, type: "water" },
        { name: "Hydro Blast", power: 85, energy: 40, type: "water" },
        { name: "Aqua Barrier", power: 0, defense: 30, energy: 15, type: "water" }
      ]
    },
    "VoltVixen": {
      name: "VoltVixen",
      image: VoltVixenImg,
      type: "electric",
      stats: {
        power: 65,
        speed: 95,
        defense: 50
      },
      moves: [
        { name: "Static Shock", power: 45, energy: 15, type: "electric" },
        { name: "Lightning Strike", power: 75, energy: 35, type: "electric" },
        { name: "Volt Shield", power: 0, defense: 25, energy: 15, type: "electric" }
      ]
    },
    "EmberWing": {
      name: "EmberWing",
      image: EmberWingImg,
      type: "fire",
      stats: {
        power: 90,
        speed: 60,
        defense: 75
      },
      moves: [
        { name: "Flame Burst", power: 55, energy: 20, type: "fire" },
        { name: "Inferno Blast", power: 90, energy: 45, type: "fire" },
        { name: "Heat Barrier", power: 0, defense: 35, energy: 15, type: "fire" }
      ]
    }
  };
  
  // Type effectiveness mapping
  const typeEffectiveness = {
    "water": { "fire": 1.5, "electric": 0.75, "water": 1 },
    "fire": { "electric": 1.5, "water": 0.75, "fire": 1 },
    "electric": { "water": 1.5, "fire": 0.75, "electric": 1 }
  };
  
  // Type color mapping
  const typeColors = {
    "fire": { text: "#F97316", bg: "#FFEDD5" },
    "water": { text: "#0EA5E9", bg: "#E0F2FE" },
    "electric": { text: "#CA8A04", bg: "#FEF9C3" }
  };
  
  const handleCreatureSelect = (side, creature) => {
    setSelectedCreatures(prev => ({
      ...prev,
      [side]: creature
    }));
    
    // Reset battle state when new creatures are selected
    if (battleState !== "ready") {
      setBattleState("ready");
      setBattleStats({
        player: { hp: 100, energy: 100 },
        opponent: { hp: 100, energy: 100 }
      });
      setBattleLog([
        "New creatures selected!",
        "Battle reset. Prepare for combat!"
      ]);
    }
  };
  
  const startBattle = () => {
    setBattleState("active");
    setBattleLog(prev => [
      ...prev,
      `Battle started: ${selectedCreatures.player} vs ${selectedCreatures.opponent}!`,
      `${selectedCreatures.player} is ready to attack!`
    ]);
  };
  
  const executeMove = (moveIndex) => {
    if (battleState !== "active") return;
    
    const playerCreature = creatures[selectedCreatures.player];
    const opponentCreature = creatures[selectedCreatures.opponent];
    const move = playerCreature.moves[moveIndex];
    
    // Check if enough energy
    if (battleStats.player.energy < move.energy) {
      setBattleLog(prev => [...prev, "Not enough energy for this move!"]);
      return;
    }
    
    // Calculate damage with type effectiveness
    let damage = 0;
    let effectiveness = 1;
    
    if (move.power > 0) {
      effectiveness = typeEffectiveness[move.type][opponentCreature.type];
      damage = Math.round((move.power * effectiveness * playerCreature.stats.power) / 100);
      
      // Apply opponent's defense reduction
      damage = Math.max(1, Math.round(damage * (100 / (100 + opponentCreature.stats.defense))));
    }
    
    // Update battle stats
    const newOpponentHp = Math.max(0, battleStats.opponent.hp - damage);
    const newPlayerEnergy = Math.max(0, battleStats.player.energy - move.energy);
    
    setBattleStats(prev => ({
      player: { 
        ...prev.player, 
        energy: newPlayerEnergy 
      },
      opponent: { 
        ...prev.opponent, 
        hp: newOpponentHp 
      }
    }));
    
    // Update battle log
    const effectivenessText = effectiveness > 1 
      ? "It's super effective!" 
      : effectiveness < 1 
        ? "It's not very effective..." 
        : "";
        
    setBattleLog(prev => [
      ...prev,
      `${playerCreature.name} used ${move.power > 0 ? move.name : move.name + " (Defense)"}.`,
      ...(move.power > 0 ? [`Dealt ${damage} damage. ${effectivenessText}`] : [`Defense increased temporarily.`]),
    ]);
    
    // Check if battle is over
    if (newOpponentHp <= 0) {
      setBattleState("finished");
      setBattleLog(prev => [
        ...prev,
        `${opponentCreature.name} fainted!`,
        `${playerCreature.name} wins the battle!`
      ]);
      return;
    }
    
    // Opponent's turn (simple AI)
    setTimeout(() => {
      // Select a random move for opponent that it has energy for
      const availableMoves = opponentCreature.moves.filter(m => m.energy <= battleStats.opponent.energy);
      
      if (availableMoves.length === 0) {
        setBattleLog(prev => [
          ...prev,
          `${opponentCreature.name} is out of energy!`,
        ]);
        return;
      }
      
      const opponentMoveIndex = Math.floor(Math.random() * availableMoves.length);
      const opponentMove = availableMoves[opponentMoveIndex];
      
      // Calculate opponent damage
      let opponentDamage = 0;
      let opponentEffectiveness = 1;
      
      if (opponentMove.power > 0) {
        opponentEffectiveness = typeEffectiveness[opponentMove.type][playerCreature.type];
        opponentDamage = Math.round((opponentMove.power * opponentEffectiveness * opponentCreature.stats.power) / 100);
        
        // Apply player's defense reduction
        opponentDamage = Math.max(1, Math.round(opponentDamage * (100 / (100 + playerCreature.stats.defense))));
      }
      
      // Update battle stats for opponent's move
      const newPlayerHp = Math.max(0, battleStats.player.hp - opponentDamage);
      const newOpponentEnergy = Math.max(0, battleStats.opponent.energy - opponentMove.energy);
      
      // Energy recovery for player (10% per turn)
      const recoveredEnergy = Math.round(10 + (playerCreature.stats.speed / 10));
      const playerEnergyAfterRecovery = Math.min(100, newPlayerEnergy + recoveredEnergy);
      
      setBattleStats(prev => ({
        player: { 
          hp: newPlayerHp, 
          energy: playerEnergyAfterRecovery
        },
        opponent: { 
          ...prev.opponent, 
          energy: newOpponentEnergy 
        }
      }));
      
      // Update battle log for opponent's move
      const opponentEffectivenessText = opponentEffectiveness > 1 
        ? "It's super effective!" 
        : opponentEffectiveness < 1 
          ? "It's not very effective..." 
          : "";
          
      setBattleLog(prev => [
        ...prev,
        `${opponentCreature.name} used ${opponentMove.power > 0 ? opponentMove.name : opponentMove.name + " (Defense)"}.`,
        ...(opponentMove.power > 0 ? [`Dealt ${opponentDamage} damage. ${opponentEffectivenessText}`] : [`Defense increased temporarily.`]),
        `${playerCreature.name} recovered ${recoveredEnergy} energy.`
      ]);
      
      // Check if battle is over after opponent's move
      if (newPlayerHp <= 0) {
        setBattleState("finished");
        setBattleLog(prev => [
          ...prev,
          `${playerCreature.name} fainted!`,
          `${opponentCreature.name} wins the battle!`
        ]);
      }
    }, 1000);
  };
  
  const resetBattle = () => {
    setBattleState("ready");
    setBattleStats({
      player: { hp: 100, energy: 100 },
      opponent: { hp: 100, energy: 100 }
    });
    setBattleLog([
      "Battle reset. Prepare for combat!"
    ]);
  };
  
  return (
    <div className="bg-white w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Typography variant="h2" className="font-pixel text-3xl" style={{ color: colors.turquoise }}>
              BATTLE ARENA
            </Typography>
            <Typography className="text-gray-600 max-w-2xl">
              Test your skills in tactical creature battles. Master elemental advantages and strategic moves.
            </Typography>
          </div>
        </div>
        
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <TabsHeader className="bg-gray-100">
            <Tab value="battle" className="font-pixel">
              <div className="flex items-center gap-2">
                <BoltIcon className="h-4 w-4" />
                <span>BATTLE</span>
              </div>
            </Tab>
            <Tab value="stats" className="font-pixel">
              <div className="flex items-center gap-2">
                <ChartBarIcon className="h-4 w-4" />
                <span>STATS</span>
              </div>
            </Tab>
          </TabsHeader>
        </Tabs>
        
        <div className="mt-6">
          {activeTab === "battle" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Player creature selection */}
              <Card className="overflow-hidden">
                <CardBody>
                  <Typography variant="h5" className="font-pixel mb-4" style={{ color: colors.turquoise }}>
                    YOUR CREATURE
                  </Typography>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.keys(creatures).map((creatureName) => (
                      <div 
                        key={creatureName}
                        onClick={() => handleCreatureSelect("player", creatureName)}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          selectedCreatures.player === creatureName 
                            ? `border-${colors.turquoise}` 
                            : "border-transparent hover:border-gray-300"
                        }`}
                        style={{ 
                          borderColor: selectedCreatures.player === creatureName ? colors.turquoise : undefined 
                        }}
                      >
                        <img 
                          src={creatures[creatureName].image} 
                          alt={creatureName}
                          className="w-full h-24 object-cover bg-gray-50"
                        />
                        <div 
                          className="absolute bottom-0 left-0 right-0 text-center py-1 text-xs font-semibold"
                          style={{ 
                            backgroundColor: typeColors[creatures[creatureName].type].bg,
                            color: typeColors[creatures[creatureName].type].text
                          }}
                        >
                          {creatureName}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Selected player creature stats */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex gap-4 items-center mb-4">
                      <img 
                        src={creatures[selectedCreatures.player].image} 
                        alt={selectedCreatures.player}
                        className="w-20 h-20 object-contain"
                      />
                      <div>
                        <Typography variant="h6" className="font-pixel" style={{ color: colors.turquoise }}>
                          {selectedCreatures.player}
                        </Typography>
                        <div 
                          className="inline-block px-2 py-1 rounded text-xs font-semibold mt-1"
                          style={{ 
                            backgroundColor: typeColors[creatures[selectedCreatures.player].type].bg,
                            color: typeColors[creatures[selectedCreatures.player].type].text
                          }}
                        >
                          {creatures[selectedCreatures.player].type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <Typography variant="small" className="font-medium">HP</Typography>
                          <Typography variant="small">{battleStats.player.hp}/100</Typography>
                        </div>
                        <Progress value={battleStats.player.hp} color="green" className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Typography variant="small" className="font-medium">Energy</Typography>
                          <Typography variant="small">{battleStats.player.energy}/100</Typography>
                        </div>
                        <Progress value={battleStats.player.energy} color="blue" className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <BoltIcon className="h-4 w-4 mr-1" style={{ color: "#EC4899" }} />
                          <Typography variant="small" className="font-medium">Power</Typography>
                        </div>
                        <Typography variant="small">{creatures[selectedCreatures.player].stats.power}</Typography>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <ArrowPathIcon className="h-4 w-4 mr-1" style={{ color: "#14B8A6" }} />
                          <Typography variant="small" className="font-medium">Speed</Typography>
                        </div>
                        <Typography variant="small">{creatures[selectedCreatures.player].stats.speed}</Typography>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <ShieldIcon className="h-4 w-4 mr-1" style={{ color: "#6366F1" }} />
                          <Typography variant="small" className="font-medium">Defense</Typography>
                        </div>
                        <Typography variant="small">{creatures[selectedCreatures.player].stats.defense}</Typography>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              {/* Battle Area */}
              <Card className="overflow-hidden">
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <Typography variant="h5" className="font-pixel" style={{ color: colors.turquoise }}>
                      BATTLE AREA
                    </Typography>
                    
                    {battleState === "ready" ? (
                      <Button
                        className="font-pixel"
                        style={{ 
                          backgroundColor: colors.gold,
                          color: "black" 
                        }}
                        onClick={startBattle}
                      >
                        START BATTLE
                      </Button>
                    ) : (
                      <Button
                        className="font-pixel"
                        style={{ 
                          backgroundColor: "transparent",
                          color: colors.gold,
                          border: `1px solid ${colors.gold}`
                        }}
                        onClick={resetBattle}
                      >
                        RESET
                      </Button>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg h-96 flex flex-col">
                    {/* Battle visuals */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-center">
                        <img 
                          src={creatures[selectedCreatures.player].image} 
                          alt={selectedCreatures.player}
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                      
                      <div className="text-center">
                        <div className="font-pixel text-lg" style={{ color: colors.gold }}>VS</div>
                      </div>
                      
                      <div className="text-center">
                        <img 
                          src={creatures[selectedCreatures.opponent].image} 
                          alt={selectedCreatures.opponent}
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Battle log */}
                    <div className="bg-gray-100 border border-gray-200 rounded p-3 flex-grow overflow-y-auto font-mono text-sm">
                      {battleLog.map((log, index) => (
                        <div key={index} className="mb-1">
                          {log}
                        </div>
                      ))}
                    </div>
                    
                    {/* Player move buttons */}
                    <div className="mt-4">
                      <div className="flex justify-center gap-2 flex-wrap">
                        {creatures[selectedCreatures.player].moves.map((move, index) => (
                          <Button
                            key={index}
                            disabled={battleState !== "active" || battleStats.player.energy < move.energy}
                            onClick={() => executeMove(index)}
                            className="font-pixel text-xs"
                            style={{ 
                              backgroundColor: typeColors[move.type].bg,
                              color: typeColors[move.type].text,
                              opacity: battleState !== "active" || battleStats.player.energy < move.energy ? 0.5 : 1
                            }}
                          >
                            {move.name} ({move.energy})
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              {/* Opponent creature selection */}
              <Card className="overflow-hidden">
                <CardBody>
                  <Typography variant="h5" className="font-pixel mb-4" style={{ color: colors.turquoise }}>
                    OPPONENT
                  </Typography>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.keys(creatures).map((creatureName) => (
                      <div 
                        key={creatureName}
                        onClick={() => handleCreatureSelect("opponent", creatureName)}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          selectedCreatures.opponent === creatureName 
                            ? `border-${colors.gold}` 
                            : "border-transparent hover:border-gray-300"
                        }`}
                        style={{ 
                          borderColor: selectedCreatures.opponent === creatureName ? colors.gold : undefined 
                        }}
                      >
                        <img 
                          src={creatures[creatureName].image} 
                          alt={creatureName}
                          className="w-full h-24 object-cover bg-gray-50"
                        />
                        <div 
                          className="absolute bottom-0 left-0 right-0 text-center py-1 text-xs font-semibold"
                          style={{ 
                            backgroundColor: typeColors[creatures[creatureName].type].bg,
                            color: typeColors[creatures[creatureName].type].text
                          }}
                        >
                          {creatureName}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Selected opponent creature stats */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex gap-4 items-center mb-4">
                      <img 
                        src={creatures[selectedCreatures.opponent].image} 
                        alt={selectedCreatures.opponent}
                        className="w-20 h-20 object-contain"
                      />
                      <div>
                        <Typography variant="h6" className="font-pixel" style={{ color: colors.gold }}>
                          {selectedCreatures.opponent}
                        </Typography>
                        <div 
                          className="inline-block px-2 py-1 rounded text-xs font-semibold mt-1"
                          style={{ 
                            backgroundColor: typeColors[creatures[selectedCreatures.opponent].type].bg,
                            color: typeColors[creatures[selectedCreatures.opponent].type].text
                          }}
                        >
                          {creatures[selectedCreatures.opponent].type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <Typography variant="small" className="font-medium">HP</Typography>
                          <Typography variant="small">{battleStats.opponent.hp}/100</Typography>
                        </div>
                        <Progress value={battleStats.opponent.hp} color="green" className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Typography variant="small" className="font-medium">Energy</Typography>
                          <Typography variant="small">{battleStats.opponent.energy}/100</Typography>
                        </div>
                        <Progress value={battleStats.opponent.energy} color="blue" className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <BoltIcon className="h-4 w-4 mr-1" style={{ color: "#EC4899" }} />
                          <Typography variant="small" className="font-medium">Power</Typography>
                        </div>
                        <Typography variant="small">{creatures[selectedCreatures.opponent].stats.power}</Typography>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <ArrowPathIcon className="h-4 w-4 mr-1" style={{ color: "#14B8A6" }} />
                          <Typography variant="small" className="font-medium">Speed</Typography>
                        </div>
                        <Typography variant="small">{creatures[selectedCreatures.opponent].stats.speed}</Typography>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <ShieldIcon className="h-4 w-4 mr-1" style={{ color: "#6366F1" }} />
                          <Typography variant="small" className="font-medium">Defense</Typography>
                        </div>
                        <Typography variant="small">{creatures[selectedCreatures.opponent].stats.defense}</Typography>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardBody>
                  <Typography variant="h5" className="font-pixel mb-4" style={{ color: colors.turquoise }}>
                    TYPE EFFECTIVENESS
                  </Typography>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max table-auto text-center">
                      <thead>
                        <tr>
                          <th className="border-b border-gray-200 bg-gray-50 p-4">
                            <Typography variant="small" className="font-pixel">
                              ATTACKER ↓ / DEFENDER →
                            </Typography>
                          </th>
                          {Object.keys(typeEffectiveness).map((type) => (
                            <th 
                              key={type} 
                              className="border-b border-gray-200 p-4"
                              style={{ backgroundColor: `${typeColors[type].bg}` }}
                            >
                              <Typography 
                                variant="small" 
                                className="font-medium uppercase"
                                style={{ color: typeColors[type].text }}
                              >
                                {type}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(typeEffectiveness).map((attackType) => (
                          <tr key={attackType}>
                            <td 
                              className="p-4 border-b border-gray-200"
                              style={{ backgroundColor: `${typeColors[attackType].bg}` }}
                            >
                              <Typography 
                                variant="small" 
                                className="font-medium uppercase"
                                style={{ color: typeColors[attackType].text }}
                              >
                                {attackType}
                              </Typography>
                            </td>
                            {Object.keys(typeEffectiveness).map((defenseType) => (
                              <td 
                                key={defenseType} 
                                className="p-4 border-b border-gray-200"
                                style={{ 
                                  backgroundColor: typeEffectiveness[attackType][defenseType] > 1 
                                    ? "#D1FAE5" 
                                    : typeEffectiveness[attackType][defenseType] < 1 
                                      ? "#FEE2E2" 
                                      : "#F9FAFB"
                                }}
                              >
                                <Typography 
                                  variant="small" 
                                  className="font-medium"
                                  style={{ 
                                    color: typeEffectiveness[attackType][defenseType] > 1 
                                      ? "#047857" 
                                      : typeEffectiveness[attackType][defenseType] < 1 
                                        ? "#B91C1C" 
                                        : "#374151"
                                  }}
                                >
                                  x{typeEffectiveness[attackType][defenseType]}
                                </Typography>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="overflow-hidden">
                <CardBody>
                  <Typography variant="h5" className="font-pixel mb-4" style={{ color: colors.turquoise }}>
                    BATTLE STRATEGIES
                  </Typography>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <Typography className="font-pixel text-sm" style={{ color: colors.turquoise }}>
                        WATER TYPE STRATEGY
                      </Typography>
                      <Typography className="text-gray-700 mt-2 text-sm">
                        Water creatures like TidalWraith excel against Fire types. Use Hydro Blast for maximum damage against FireDragon. Water types are vulnerable to Electric attacks - avoid battling VoltVixen if possible.
                      </Typography>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <Typography className="font-pixel text-sm" style={{ color: "#CA8A04" }}>
                        ELECTRIC TYPE STRATEGY
                      </Typography>
                      <Typography className="text-gray-700 mt-2 text-sm">
                        Electric creatures like VoltVixen are fastest in battle. Use this speed advantage to strike first and often. Lightning Strike is effective against Water types. Be cautious against Fire types which resist electric attacks.
                      </Typography>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <Typography className="font-pixel text-sm" style={{ color: "#F97316" }}>
                        FIRE TYPE STRATEGY
                      </Typography>
                      <Typography className="text-gray-700 mt-2 text-sm">
                        Fire creatures like EmberWing have high power stats. Inferno Blast can quickly defeat Electric types. Use defensive moves against Water types which have an advantage over Fire. EmberWing's high defense helps mitigate type disadvantages.
                      </Typography>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: colors.gold }}>
                      <Typography className="font-pixel text-sm" style={{ color: colors.gold }}>
                        GENERAL TIPS
                      </Typography>
                      <Typography className="text-gray-700 mt-2 text-sm">
                        • Save energy for powerful attacks
                        <br />
                        • Use defense moves when at type disadvantage
                        <br />
                        • Speed determines energy recovery rate
                        <br />
                        • Match types strategically against opponents
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattleArena; 