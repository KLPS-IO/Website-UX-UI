import { motion } from 'motion/react';
import { Button } from './ui/button';
import logoImage from '/src/assets/40aa64a3f2493868d0c30655a7bc72e7fb6ec5ea.png';

interface TitlePageProps {
  onGetStarted: () => void;
}

export function TitlePage({ onGetStarted }: TitlePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-64 h-64 mx-auto flex items-center justify-center"
        >
          <img src={logoImage} alt="YouTrack Logo" className="w-full h-full object-contain" />
        </motion.div>
        
        <div className="space-y-3">
          <h1 className="text-4xl text-purple-900">YouTrack</h1>
          <p className="text-gray-600 max-w-xs mx-auto">
            Connect with your wearable device and track your health journey
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <Button
            onClick={onGetStarted}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-2xl shadow-lg"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
