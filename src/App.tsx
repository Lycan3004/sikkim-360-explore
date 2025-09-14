import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "@/pages/Login";

import RumtekDetails from '@/monasterydetails/rumtek-dt';
import PemyangtseDetails from '@/monasterydetails/pemyangtse-dt';
import RichenpongDetails from '@/monasterydetails/richenpong-dt';

import AbdManuscript from '@/muraldetails/abd-manuscript';
import SacredMural from '@/muraldetails/sacred-mural';
import PrayerInsc from '@/muraldetails/prayer-insc';
import SmartAudioGuide from "@/components/smartAudioBook";

import AIChatbot from './components/chatbot/chatbotwidget';
<AIChatbot />

import Accomodation from "./accomodation/accomodation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pemyangtse-dt" element={<PemyangtseDetails />} />
          <Route path="/rumtek-dt" element={<RumtekDetails />} />
          <Route path="/richenpong-dt" element={<RichenpongDetails />} />
          <Route path="/muraldetails/abd-manuscript" element={<AbdManuscript />} />
          <Route path="/muraldetails/sacred-mural" element={<SacredMural />} />
          <Route path="/muraldetails/prayer-insc" element={<PrayerInsc />} />
          <Route path="/audio-guide" element={<SmartAudioGuide />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/accomodation" element={<Accomodation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
