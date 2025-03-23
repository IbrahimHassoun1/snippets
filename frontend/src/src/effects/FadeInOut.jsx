import { useEffect, useState, useRef } from "react";
import "./styles.css"
//effect made with gpt4
const FadeInOut = ({ direction = "in", children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
    ref={ref}
    className="fade-card"
    style={{opacity: isVisible ? (direction === "in" ? 1 : 0) : direction === "in" ? 0 : 1,
    transition: "opacity 2s ease-in-out",
    
    }}
    >
      {children}
    </div>
  );
};

export default FadeInOut;
