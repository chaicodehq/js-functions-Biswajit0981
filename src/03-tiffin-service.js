/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if (typeof name !== "string" || name === "") return null;

  let getBasePrice =
    mealType === "veg"
      ? 80
      : mealType === "nonveg"
        ? 120
        : mealType === "jain"
          ? 90
          : null;

  if (getBasePrice === null) return null;

  return {
    name,
    mealType,
    days,
    dailyRate: getBasePrice,
    totalCost: getBasePrice * days,
  };
}

export function combinePlans(...plans) {
  if (plans.length === 0) {
    return null;
  }

  let vegCount = 0,
    nonVegCount = 0,
    jainCount = 0;
  let totalSell = 0;
  plans.forEach(({ mealType, totalCost }) => {
    if (mealType === "veg") vegCount++;
    else if (mealType === "nonveg") nonVegCount++;
    else if (mealType === "jain") jainCount++;
    totalSell += totalCost;
  });

  return {
    totalCustomers: plans.length,
    totalRevenue: totalSell,
    mealBreakdown: { veg: vegCount, nonveg: nonVegCount, jain: jainCount },
  };
}

export function applyAddons(plan, ...addons) {
  if (!plan) return null;

  const newPlan = { ...plan };

  if (addons.length === 0) {
    return {
      ...newPlan,
      addonNames: [],
    };
  }

  const extraCost = addons.reduce((sum, addon) => {
    return sum + (addon?.price || 0);
  }, 0);

  const newDailyRate = newPlan.dailyRate + extraCost;

  return {
    ...newPlan,
    dailyRate: newDailyRate,
    totalCost: newDailyRate * newPlan.days,
    addonNames: addons.map((a) => a.name),
  };
}
