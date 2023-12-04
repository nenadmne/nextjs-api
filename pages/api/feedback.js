import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "feedback.json");
const extractData = () => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: Math.random(),
      email: email,
      feedback: feedback,
    };

    const data = extractData();
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res
      .status(201)
      .json({ message: "succesfully added feedback", feedback: newFeedback });
  } else {
    const data = extractData();
    res
      .status(201)
      .json({ message: "successfully loaded feedbacks", feedbacks: data });
  }
}
