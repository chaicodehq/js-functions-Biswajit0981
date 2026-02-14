/**
 * 🚂 Dabbawala Delivery Tracker - Closures
 *
 * Mumbai ke famous dabbawala system ka tracker bana! Yahan closure ka
 * use hoga — ek function ke andar private state rakhna hai jo bahar se
 * directly access nahi ho sakta. Sirf returned methods se access hoga.
 *
 * Function: createDabbawala(name, area)
 *
 * Returns an object with these methods (sab ek hi private state share karte hain):
 *
 *   - addDelivery(from, to)
 *     Adds a new delivery. Returns auto-incremented id (starting from 1).
 *     Each delivery: { id, from, to, status: "pending" }
 *     Agar from ya to empty/missing, return -1
 *
 *   - completeDelivery(id)
 *     Marks delivery as "completed". Returns true if found and was pending.
 *     Returns false if not found or already completed.
 *
 *   - getActiveDeliveries()
 *     Returns array of deliveries with status "pending" (copies, not references)
 *
 *   - getStats()
 *     Returns: { name, area, total, completed, pending, successRate }
 *     successRate = completed/total as percentage string "85.00%" (toFixed(2) + "%")
 *     Agar total is 0, successRate = "0.00%"
 *
 *   - reset()
 *     Clears all deliveries, resets id counter to 0. Returns true.
 *
 * IMPORTANT: Private state (deliveries array, nextId counter) should NOT
 *   be accessible as properties on the returned object.
 *   Two instances created with createDabbawala should be completely independent.
 *
 * Hint: Use closure to keep variables private. The returned object's methods
 *   form a closure over those variables.
 *
 * @param {string} name - Dabbawala's name
 * @param {string} area - Delivery area
 * @returns {object} Object with delivery management methods
 *
 * @example
 *   const ram = createDabbawala("Ram", "Dadar");
 *   ram.addDelivery("Andheri", "Churchgate"); // => 1
 *   ram.addDelivery("Bandra", "CST");         // => 2
 *   ram.completeDelivery(1);                   // => true
 *   ram.getStats();
 *   // => { name: "Ram", area: "Dadar", total: 2, completed: 1, pending: 1, successRate: "50.00%" }
 */
export function createDabbawala(name, area) {
  let deliveryDataBase = [];
  let deliveryId = 1;

  if (!name || !area) return null;

  const addDelivery = (from, to) => {
    if (!from || !to) return -1;

    let id = deliveryId;
    let status = "pending";

    const devliveryResponse = {
      id,
      status,
      from,
      to,
    };

    deliveryDataBase.push(devliveryResponse);
    deliveryId++;

    return id;
  };

  const completeDelivery = (id) => {
    let result = false;
    deliveryDataBase.forEach((devlivery) => {
      if (devlivery.id === id && devlivery.status === "pending") {
        const updatedDevlivery = { ...devlivery, status: "completed" };
        deliveryDataBase.splice(updatedDevlivery.id - 1, 1, updatedDevlivery);
        result = true;
      }
    });
    return result;
  };

  const printDevlivery = () => {
    console.log(deliveryDataBase);
  };

  const getActiveDeliveries = () => {
    return deliveryDataBase.filter((item) => item.status === "pending");
  };

  const getStats = () => {
    const total = deliveryDataBase.length;
    let completed = 0,
      pending = 0;
    let successRate;
    deliveryDataBase.forEach((item) => {
      if (item.status === "pending") {
        pending++;
      } else {
        completed++;
      }
    });

    successRate = deliveryDataBase.length === 0 ? Number(0).toFixed(2): Number((completed / total) * 100).toFixed(2) ;
console.log(successRate);
    return { name, total, area, completed, pending, successRate: `${successRate}%` };
  };

  function reset () {console.log("c");
    deliveryDataBase = [];
    deliveryId = 1;
    return true;
  }

  return {
    addDelivery,
    completeDelivery,
    printDevlivery,
    getActiveDeliveries,
    getStats,
    reset
  };
}

const {
  addDelivery,
  completeDelivery,
  printDevlivery,
  getActiveDeliveries,
  getStats,
} = createDabbawala("RONI", "Kolkata");

const ram = createDabbawala("Ram", "Dadar");
ram.addDelivery("Andheri", "Churchgate");
ram.addDelivery("Bandra", "CST"); 
ram.completeDelivery(1); 
ram.completeDelivery(2); 

