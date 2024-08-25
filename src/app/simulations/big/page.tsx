"use client"

import InputField from "@/components/InputField";
import { useEffect, useState } from "react";

interface ChestOptions {
  elderBeard: number;
  irishHat: number;
  purpleCap: number;
  sushiMaster: number;
  tallBlackHat: number;
  barrel: number;
  blackApron: number;
  italianChef: number;
  kimonoBlackBelt: number;
  tankTop: number;
  chefsCleaver: number;
  chopsticks: number;
  cookBook: number;
  mixer: number;
  pepperMill: number;
}

export default function BigChest({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [elderBeard, setElderBeard] = useState(0);
  const [irishHat, setIrishHat] = useState(0);
  const [purpleCap, setPurpleCap] = useState(0);
  const [sushiMaster, setSushiMaster] = useState(0);
  const [tallBlackHat, setTallBlackHat] = useState(0);
  const [barrel, setBarrel] = useState(0);
  const [blackApron, setBlackApron] = useState(0);
  const [italianChef, setItalianChef] = useState(0);
  const [kimonoBlackBelt, setKimonoBlackBelt] = useState(0);
  const [tankTop, setTankTop] = useState(0);
  const [chefsCleaver, setChefsCleaver] = useState(0);
  const [chopsticks, setChopSticks] = useState(0);
  const [cookBook, setCookBook] = useState(0);
  const [mixer, setMixer] = useState(0);
  const [pepperMill, setPepperMill] = useState(0);
  const [averageGems, setAverageGems] = useState(0);

  const ITEMS_PER_CHEST = 6;
  const COST_PER_CHEST = 200;
  const LEGENDARY_POSSIBILITY = 0.05;
  const SIMULATIONS = 10000;

  const simulateChests = (): number => {
    const LEGENDARY_TYPES = ["elderBeard", "irishHat", "purpleCap", "sushiMaster", "tallBlackHat", "barrel", "blackApron", "italianChef", "kimonoBlackBelt", "tankTop", "chefsCleaver", "chopsticks", "cookBook", "mixer", "pepperMill"];
    const DESIRED_LEGENDARIES = {
      elderBeard,
      irishHat,
      purpleCap,
      sushiMaster,
      tallBlackHat,
      barrel,
      blackApron,
      italianChef,
      kimonoBlackBelt,
      tankTop,
      chefsCleaver,
      chopsticks,
      cookBook,
      mixer,
      pepperMill,
    };
    const obtained_legendaries = { ...DESIRED_LEGENDARIES };
    Object.keys(obtained_legendaries).forEach((key) => {
      obtained_legendaries[key] = 0;
    });

    let total_rolls = 0;

    while (
      Object.keys(DESIRED_LEGENDARIES).some(
        (key) => obtained_legendaries[key] < DESIRED_LEGENDARIES[key]
      )
    ) {
      total_rolls += 1;

      if (Math.random() < LEGENDARY_POSSIBILITY) {
        const obtained_type =
          LEGENDARY_TYPES[Math.floor(Math.random() * LEGENDARY_TYPES.length)];
        obtained_legendaries[obtained_type] += 1;
      }
    }

    return total_rolls;
  };

  const runSimulation = (): Array<number> => {
    let total_gems_spent: Array<number> = [];
    for (let i = 0; i < SIMULATIONS; i++) {
      const rolls_needed = simulateChests();
      const chests_needed = Math.ceil(rolls_needed / ITEMS_PER_CHEST);
      const gems_spent = chests_needed * COST_PER_CHEST;
      total_gems_spent.push(gems_spent);
    }

    return total_gems_spent;
  };

  const calculateAverageGems = (list_of_spends: Array<number>): number => {
    const total = list_of_spends.reduce((pre, cur) => pre + cur, 0);
    const average_gems_spent = total / SIMULATIONS;
    return average_gems_spent;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6">
      <h1 className="text-2xl font-bold mb-6">Big Chest Simulator</h1>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
        <div className="w-full lg:w-1/2 flex flex-wrap gap-4">
          <h2 className="text-lg font-semibold">Targets:</h2>
          <InputField label="Elder Beard" value={elderBeard} onChange={setElderBeard} />
          <InputField label="Irish Hat" value={irishHat} onChange={setIrishHat} />
          <InputField label="Purple Cap" value={purpleCap} onChange={setPurpleCap} />
          <InputField label="Sushi Master" value={sushiMaster} onChange={setSushiMaster} />
          <InputField label="Tall Black Hat" value={tallBlackHat} onChange={setTallBlackHat} />
          <InputField label="Barrel" value={barrel} onChange={setBarrel} />
          <InputField label="Black Apron" value={blackApron} onChange={setBlackApron} />
          <InputField label="Italian Chef" value={italianChef} onChange={setItalianChef} />
          <InputField label="Kimono Black Belt" value={kimonoBlackBelt} onChange={setKimonoBlackBelt} />
          <InputField label="Tank Top" value={tankTop} onChange={setTankTop} />
          <InputField label="Chef's Cleaver" value={chefsCleaver} onChange={setChefsCleaver} />
          <InputField label="Chopsticks" value={chopsticks} onChange={setChopSticks} />
          <InputField label="Cook Book" value={cookBook} onChange={setCookBook} />
          <InputField label="Mixer" value={mixer} onChange={setMixer} />
          <InputField label="Pepper Mill" value={pepperMill} onChange={setPepperMill} />
          <button onClick={() => {
            const rolls = runSimulation();
            setAverageGems(calculateAverageGems(rolls));
          }}>Calculate</button>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-center lg:text-left text-lg font-medium">
            On average it will take you <span className="font-bold">{averageGems}</span> gems.
          </p>
        </div>
      </div>
    </div>
  );
}
