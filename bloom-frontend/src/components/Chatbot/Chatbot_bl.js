import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

const Chatbot = () => {
  const { auth } = useAuth(); // Get auth state from context

  useEffect(() => {
    if (!auth.isLoggedIn) return; // Only load chatbot if user is logged in

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "b2pHVilN9qmmY4tv0mW-j"; // Your chatbot ID
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script when user logs out
    };
  }, [auth.isLoggedIn]); // Re-run effect when login state changes

  return null;
};

export default Chatbot;
