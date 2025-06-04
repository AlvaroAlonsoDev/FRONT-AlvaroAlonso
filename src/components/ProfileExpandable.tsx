import { motion, AnimatePresence } from "framer-motion";
import { Mail, CalendarDays, MapPin } from "lucide-react";

export function ProfileExpandable({
  description,
  email,
  location,
  createdAt,
  showMore,
  setShowMore,
}: {
  description?: string;
  email?: string;
  location?: string;
  createdAt?: string;
  showMore: boolean;
  setShowMore: (v: boolean) => void;
}) {
  return (
    <motion.div
      layout
      transition={{
        layout: { duration: 0.42, type: "spring", bounce: 0.17 },
      }}
      className="w-full mx-auto bg-white/90 rounded-b-2xl rounded-t-none -mt-3 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {showMore ? (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.42, 0, 0.58, 1] }}
            className="flex flex-col gap-2 text-sm text-gray-700 pt-5 px-2"
          >
            {description && (
              <div className="text-gray-800 text-center mb-1">{description}</div>
            )}
            {email && (
              <div className="flex items-center gap-2 justify-center">
                <Mail size={16} className="text-blue-500" />
                <span>{email}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2 justify-center">
                <MapPin size={16} className="text-green-500" />
                <span>{location}</span>
              </div>
            )}
            {createdAt && (
              <div className="flex items-center gap-2 justify-center">
                <CalendarDays size={16} className="text-violet-500" />
                <span>
                  {new Date(createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            {/* Botón al final, perfectamente pegado abajo */}
            <motion.button
              className="w-full py-2 text-blue-500 text-sm font-semibold bg-transparent rounded-b-2xl hover:bg-blue-50 transition-all border-t border-blue-50"
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowMore(false)}
              aria-expanded={showMore}
              aria-controls="profile-extra-info"
            >
              Ocultar info
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            key="show"
            transition={{ duration: 0.18 }}
            className="w-full py-2 text-blue-500 text-sm font-semibold bg-transparent rounded-b-2xl transition-all border-t border-blue-50"
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowMore(true)}
            aria-expanded={showMore}
            aria-controls="profile-extra-info"
          >
            Mostrar más
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
