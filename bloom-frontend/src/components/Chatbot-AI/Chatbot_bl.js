import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") {
              return target.q;
            }
            return (...args) => target(prop, ...args);
          },
        });
      }
      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "b2pHVilN9qmmY4tv0mW-j"; // Your chatbot ID
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();
  }, []);

  return null; // This component does not render anything, just loads the chatbot
};

export default Chatbot;
