import { model, models, Schema } from "mongoose";

const WaitlistSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

const Waitlist = models.Waitlist || model("Waitlist", WaitlistSchema);
export default Waitlist;
