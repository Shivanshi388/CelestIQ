import { motion } from 'framer-motion';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PageContainer({ children, title, description }: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col space-y-6 h-full"
    >
      {(title || description) && (
        <div className="flex flex-col space-y-1">
          {title && <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>}
          {description && <p className="text-muted">{description}</p>}
        </div>
      )}
      <div className="flex-1 w-full h-full pb-10">
        {children}
      </div>
    </motion.div>
  );
}
