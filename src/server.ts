import { app } from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Social Media Backend running on http://localhost:${PORT}`);
});