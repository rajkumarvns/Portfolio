"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiAward, FiChevronRight } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose, hamburgerRef }: any) {
  const getOrigin = () => {
    if (typeof window === "undefined" || !hamburgerRef?.current) return "50% 50%";
    
    const rect = hamburgerRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth * 100;
    const y = (rect.top + rect.height / 2) / window.innerHeight * 100;
    
    return `${x}% ${y}%`;
  };

  const menuItems = [
    { name: "Home", icon: FiHome, color: "from-pink-500 to-rose-500", description: "Welcome back" },
    { name: "About", icon: FiUser, color: "from-purple-500 to-indigo-500", description: "Who I am" },
    { name: "Skills", icon: FiCode, color: "from-blue-500 to-cyan-500", description: "What I do" },
    { name: "Projects", icon: FiBriefcase, color: "from-emerald-500 to-teal-500", description: "My work" },
    { name: "Experience", icon: FiAward, color: "from-orange-500 to-amber-500", description: "Journey so far" },
    { name: "Contact", icon: FiMail, color: "from-red-500 to-pink-500", description: "Let's talk" },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            onClick={onClose}
          />

          <motion.div
            initial={{ clipPath: `circle(0% at ${getOrigin()})` }}
            animate={{ clipPath: `circle(150% at ${getOrigin()})` }}
            exit={{ clipPath: `circle(0% at ${getOrigin()})` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#0f0f1a" }}
          >
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  }}
                  animate={{
                    y: [null, -100, null], 
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 right-6 z-50 group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:border-white/40 transition-all">
                  <FiX className="text-white text-xl" />
                </div>
              </div>
            </motion.button>

            <div className="w-full max-w-6xl mx-auto px-4 mt-15 mb-5 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8 sm:mb-12"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Navigation
                </h2>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full"
                />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 sm:gap-4 md:gap-6">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.2 }}
                      className="relative z-50"
                    >
                      <a
                        href={`#${item.name.toLowerCase()}`}
                        onClick={onClose}
                        className="group block relative"
                      >
                        <div className="relative p-0.5 rounded-2xl bg-gradient-to-br from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-500">
                          <div className="relative bg-[#1a1a2e] rounded-2xl p-4 sm:p-5 overflow-hidden">
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                              initial={false}
                            />
                            
                            <div className="relative flex items-center space-x-3 sm:space-x-4">
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                                transition={{ duration: 0.5 }}
                                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shrink-0`}
                              >
                                <div className="w-full h-full bg-[#1a1a2e] rounded-xl flex items-center justify-center">
                                  <Icon className="text-xl sm:text-2xl text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                              </motion.div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent truncate`}>
                                  {item.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400 truncate">
                                  {item.description}
                                </p>
                              </div>

                              <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                whileHover={{ x: 0, opacity: 1 }}
                                className="hidden sm:block"
                              >
                                <FiChevronRight className={`text-xl bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
                              </motion.div>
                            </div>

                            <motion.div
                              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${item.color}`}
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                        <div className="absolute inset-0 rounded-2xl sm:hidden">
                          <div className="w-full h-full active:bg-white/5 transition-colors" />
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 sm:mt-12 text-center"
              >
                <p className="text-xs sm:text-sm text-gray-500">
                  Select a section to navigate
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-pink-500/30 rounded-tl-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-purple-500/30 rounded-br-3xl"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
