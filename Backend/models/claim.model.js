import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Item" },
  name: { type: String, required: true },
  identityCard: { type: String, required: true },
  rollNo: { type: String, required: true },
  department: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Claim = mongoose.model("Claim", claimSchema);
export default Claim;