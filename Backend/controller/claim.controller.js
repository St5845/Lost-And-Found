import Claim from "../models/Claim.js";

// Submit a claim with file upload
export const submitClaim = async (req, res) => {
  try {
    const { itemId, name, rollNo, department } = req.body;
    if (!itemId || !name || !rollNo || !department || !req.file) {
      return res
        .status(400)
        .json({
          message: "All fields are required, including identity card upload",
        });
    }

    const newClaim = new Claim({
      itemId,
      name,
      identityCard: req.file.path,
      rollNo,
      department,
    });

    await newClaim.save();
    res
      .status(201)
      .json({ message: "Claim submitted successfully", claim: newClaim });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all claims for a specific item
export const getClaimsByItem = async (req, res) => {
  try {
    const claims = await Claim.find({ itemId: req.params.itemId });
    if (!claims.length) {
      return res.status(404).json({ message: "No claims found for this item" });
    }
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get claim details by ID
export const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
