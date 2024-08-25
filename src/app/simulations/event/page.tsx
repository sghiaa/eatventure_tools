"use client"

import InputField from "@/components/InputField";
import { useEffect, useState } from "react";

interface ChestOptions {
  head: number;
  body: number;
  hand: number;
}

export default function EventChest({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [head, setHead] = useState(0);
  const [body, setBody] = useState(0);
  const [hand, setHand] = useState(0);
  const [averageGems, setAverageGems] = useState(0);

  const ITEMS_PER_CHEST = 6;
  const COST_PER_CHEST = 250;
  const ULTIMATE_PROBABILITY = 0.02;
  const SIMULATIONS = 10000;

  const simulateChests = () => {
    const ULTIMATE_TYPES = ["head", "body", "hand"];
    const DESIRED_ULTIMATES: ChestOptions = { "head": head, "body": body, "hand": hand };
    const obtained_ultimates = { "head": 0, "body": 0, "hand": 0 };

    let total_rolls = 0;

    while (
      obtained_ultimates["head"] < DESIRED_ULTIMATES["head"] ||
      obtained_ultimates["hand"] < DESIRED_ULTIMATES["hand"] ||
      obtained_ultimates["body"] < DESIRED_ULTIMATES["body"]
    ) {
      total_rolls += 1;

      if (Math.random() < ULTIMATE_PROBABILITY) {
        const obtained_type = ULTIMATE_TYPES[Math.floor(Math.random() * ULTIMATE_TYPES.length)];
        obtained_ultimates[obtained_type] += 1;
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

    return total_gems_spent
  };

  const calculateAverageGems = (list_of_spends: Array<number>): number => {
    const total = list_of_spends.reduce((pre, cur) => { return pre + cur }, 0)
    const average_gems_spent = total / SIMULATIONS;
    return average_gems_spent;
  }

  useEffect(() => {
    const list_of_spends = runSimulation();
    setAverageGems(calculateAverageGems(list_of_spends));
  }, [head, body, hand]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Event chest simulator
      </h1>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <h2>
            targets:
          </h2>
          <InputField label="head" value={head} onChange={setHead} />
          <InputField label="body" value={body} onChange={setBody} />
          <InputField label="hand" value={hand} onChange={setHand} />
        </div>
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          On average it will take you {averageGems} gems
        </div>
      </div>
    </div>
  );
}
