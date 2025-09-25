import { createRoot } from "react-dom/client";
import 'leaflet/dist/leaflet.css';                  
import App from "./App.tsx";
import "./index.css";
import'leaflet/dist/leaflet.css';
createRoot(document.getElementById("root")!).render(<App />);
