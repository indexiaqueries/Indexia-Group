import type { ReactNode } from "react";

type MediaFrameProps = {
  children: ReactNode;
  className?: string;
};

const MediaFrame = ({ children, className = "" }: MediaFrameProps) => (
  <div className={`image-zoom-frame overflow-hidden rounded-2xl ${className}`}>
    {children}
  </div>
);

export default MediaFrame;
