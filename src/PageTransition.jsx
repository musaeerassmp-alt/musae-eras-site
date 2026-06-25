import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
)

export default PageTransition
