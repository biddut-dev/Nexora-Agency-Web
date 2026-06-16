document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Styles dynamically
  const style = document.createElement("style");
  style.textContent = `
    /* Floating toggle button */
    .chatbot-toggle {
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: #800000;
      color: #fff;
      border: 2px solid #ffcc00;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      transition: transform 0.3s ease, background-color 0.3s ease;
    }
    .chatbot-toggle:hover {
      background: #ffcc00;
      color: #000;
      transform: scale(1.1);
    }
    .chatbot-toggle:active {
      transform: scale(0.95);
    }

    /* Floating Chatbot Box overriding previous styles */
    .chatbot {
      position: fixed !important;
      right: 20px !important;
      bottom: 85px !important;
      width: 300px !important;
      height: 400px !important;
      background: #111 !important;
      border: 2px solid #800000 !important;
      border-radius: 10px !important;
      display: none !important; /* Start hidden */
      flex-direction: column !important;
      z-index: 9999 !important;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6) !important;
      overflow: hidden !important;
      transition: opacity 0.3s ease, transform 0.3s ease;
      transform: translateY(20px);
      opacity: 0;
    }

    .chatbot.active {
      display: flex !important;
      transform: translateY(0);
      opacity: 1;
    }

    .chat-header {
      background: #800000;
      padding: 12px;
      font-weight: bold;
      font-size: 15px;
      border-bottom: 1px solid #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-body {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .chat-body p {
      margin: 0;
      padding: 8px 12px;
      border-radius: 15px;
      max-width: 80%;
      word-wrap: break-word;
    }

    .chat-body .user-msg {
      background: #800000;
      color: #fff;
      align-self: flex-end;
      border-bottom-right-radius: 2px;
    }

    .chat-body .bot-msg {
      background: #222;
      color: #ccc;
      align-self: flex-start;
      border-bottom-left-radius: 2px;
      border: 1px solid #333;
    }

    .chat-footer {
      padding: 10px;
      background: #222;
      display: flex;
      gap: 5px;
      border-top: 1px solid #333;
    }

    .chat-footer input {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 4px;
      background: #333;
      color: #fff;
      font-size: 13px;
    }

    .chat-footer input:focus {
      outline: 1px solid #ffcc00;
    }

    .chat-footer button {
      background: #800000;
      color: #fff;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s;
    }

    .chat-footer button:hover {
      background: #ffcc00;
      color: #000;
    }
  `;
  document.head.appendChild(style);

  // 2. Inject Toggle Button
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "chatbotToggle";
  toggleBtn.className = "chatbot-toggle";
  toggleBtn.innerHTML = "💬";
  document.body.appendChild(toggleBtn);

  // 3. Setup Dialog Box reference
  const chatBox = document.getElementById("chatbotBox");
  if (!chatBox) return;

  // Toggle Visibility
  const handleToggle = () => {
    if (chatBox.classList.contains("active")) {
      chatBox.classList.remove("active");
      setTimeout(() => {
        if (!chatBox.classList.contains("active")) {
          chatBox.style.setProperty("display", "none", "important");
        }
      }, 300);
    } else {
      chatBox.style.setProperty("display", "flex", "important");
      // Force reflow
      chatBox.offsetHeight;
      chatBox.classList.add("active");
    }
  };

  toggleBtn.addEventListener("click", handleToggle);

  const navChatbot = document.getElementById("navChatbot");
  if (navChatbot) {
    navChatbot.addEventListener("click", (e) => {
      e.preventDefault();
      handleToggle();
    });
  }

  // 4. Setup Chat logic inside the widget
  const input = chatBox.querySelector(".chat-footer input");
  const sendButton = chatBox.querySelector(".chat-footer button");
  const chatBody = chatBox.querySelector(".chat-body");

  if (input && sendButton && chatBody) {
    // Clear initial plain text, wrap in styled elements
    chatBody.innerHTML = `<p class="bot-msg">Hello! How can we help you today?</p>`;

    const handleSendMessage = () => {
      const text = input.value.trim();
      if (text !== "") {
        // User Message
        const userMsg = document.createElement("p");
        userMsg.className = "user-msg";
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);
        input.value = "";
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;

        // Bot Reply
        setTimeout(() => {
          const botMsg = document.createElement("p");
          botMsg.className = "bot-msg";
          botMsg.textContent = "Bot: Thanks for reaching out!";
          chatBody.appendChild(botMsg);
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
      }
    };

    sendButton.addEventListener("click", handleSendMessage);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    });
  }

  // Dynamic Footer Info Loading from Database
  async function loadFooterInfo() {
    try {
      const res = await fetch("/api/agency");
      const agency = await res.json();
      if (!agency) return;

      // Update Contact Section in Footer
      const contactSection = document.querySelector(".footer-section.contact");
      if (contactSection) {
        let waNumber = agency.phone ? agency.phone.replace(/[^0-9]/g, '') : '';
        contactSection.innerHTML = `
          <h3>Contact Us</h3>
          ${agency.email ? `<p>📧 Email: <a href="mailto:${agency.email}">${agency.email}</a></p>` : ''}
          ${agency.facebook ? `<p>📘 Facebook: <a href="${agency.facebook}" target="_blank">fb.com/nexoraagency</a></p>` : ''}
          ${agency.phone ? `<p>📱 WhatsApp: <a href="https://wa.me/${waNumber}" target="_blank">${agency.phone}</a></p>` : ''}
        `;
      }

      // Update Social Icons Section in Footer
      const socialIcons = document.querySelector(".footer-section.social .social-icons");
      if (socialIcons) {
        let waNumber = agency.phone ? agency.phone.replace(/[^0-9]/g, '') : '';
        socialIcons.innerHTML = `
          ${agency.facebook ? `<a href="${agency.facebook}" target="_blank" title="Facebook">🌐</a>` : ''}
          ${agency.phone ? `<a href="https://wa.me/${waNumber}" target="_blank" title="WhatsApp">💬</a>` : ''}
          ${agency.email ? `<a href="mailto:${agency.email}" title="Email">✉️</a>` : ''}
        `;
      }
    } catch (err) {
      console.error("Error loading agency footer info:", err);
    }
  }
  loadFooterInfo();
});
