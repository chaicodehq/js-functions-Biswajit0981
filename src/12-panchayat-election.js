/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {

  const votes = {};
  const voters = new Set();
  const validateVote = new Set();

  candidates.forEach((candidate) => {
    votes[candidate.id] = 0;
  });

  const registerVoter = (voter) => {

    if (!voter || typeof voter !== "object") return false;

    const { id, name, age } = voter;

    if (
      !id ||
      typeof id !== "string" ||
      !name ||
      typeof name !== "string" ||
      typeof age !== "number" ||
      age < 18
    ) {
      return false;
    }

    if (voters.has(id)) return false;

    voters.add(id);
    return true;
  };

  const castVote = (voterId, candidateId, onSuccess, onError) => {

    if (!voterId || !candidateId) {
      return onError("Invalid voter or candidate");
    }

    if (!voters.has(voterId)) {
      return onError("Voter not registered");
    }

    if (!(candidateId in votes)) {
      return onError("Candidate does not exist");
    }

    if (validateVote.has(voterId)) {
      return onError("Voter already voted");
    }

    votes[candidateId]++;
    validateVote.add(voterId);

    return onSuccess({ voterId, candidateId });
  };

  const getResults = (sortFn) => {

    const updatedCandidate = candidates.map((item) => ({
      id: item.id,
      name: item.name,
      party: item.party,
      votes: votes[item.id],
    }));

    const sortOrder = sortFn ? sortFn : (a, b) => b.votes - a.votes;

    return updatedCandidate.sort(sortOrder);
  };

  const getWinner = () => {

    const results = getResults();

    if (results.length === 0) return null;
    if (results[0].votes === 0) return null;

    return results[0];
  };

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner,
  };
}
export function createVoteValidator(rules) {

  const { minAge, requiredFields } = rules;

  return function (voter) {

    if (!voter || typeof voter !== "object") {
      return { valid: false, reason: "Invalid voter object" };
    }

    // check required fields
    for (const field of requiredFields) {
      if (!(field in voter)) {
        return { valid: false, reason: `Missing field: ${field}` };
      }
    }

    // age validation
    if (typeof voter.age !== "number" || voter.age < minAge) {
      return { valid: false, reason: "Voter below minimum age" };
    }

    return { valid: true };
  };
}

export function countVotesInRegions(regionTree) {

  if (!regionTree || typeof regionTree !== "object") {
    return 0;
  }

  const { votes, subRegions } = regionTree;

  let totalVotes = typeof votes === "number" ? votes : 0;

  if (Array.isArray(subRegions)) {
    for (let region of subRegions) {
      totalVotes += countVotesInRegions(region);
    }
  }

  return totalVotes;
}

export function tallyPure(currentTally, candidateId) {

  const newTally = { ...currentTally };

  if (candidateId in newTally) {
    newTally[candidateId] += 1;
  } else {
    newTally[candidateId] = 1;
  }

  return newTally;
}
const election = createElection([
  { id: "C1", name: "Sarpanch Ram", party: "Janata" },
  { id: "C2", name: "Pradhan Sita", party: "Lok" },
]);

election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
election.castVote(
  "V1",
  "C1",
  (r) => "voted!",
  (e) => "error: " + e,
);
