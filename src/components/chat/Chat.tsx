import { AnimatePresence, motion } from "framer-motion";
import { GlassmorphismDesign } from "../../styles/baseDesign/GlassmorphismDesign";
import { ChatContent } from "./ChatContent";
import { ChatPosition } from "./ChatPosition";

export function Chat() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <ChatPosition>
          <GlassmorphismDesign>
            <ChatContent />
          </GlassmorphismDesign>
        </ChatPosition>
      </motion.div>
    </AnimatePresence>
  );
}