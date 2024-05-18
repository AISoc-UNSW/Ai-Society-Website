import React from 'react';

const Chatbot = () => {
    const chatbotURL = "https://ai-soc.openonion.ai"; // Your chatbot's URL

    const containerStyle = {
        width: '90vw',           // 80% of the viewport width
        height: '100vh',          // 80% of the viewport height
        border: '1px solid #ccc', // Light grey border
        borderRadius: '15px',    // Rounded corners
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow for depth
        margin: '10vh auto',     // Vertically center and auto horizontal margin
        padding: 0,              // No padding inside the container
        overflow: 'hidden',      // Hide scrollbars that may appear
        position: 'relative'     // Needed for proper positioning
    };

    // Styles for the iframe to fit well within the container
    const iframeStyle = {
        width: '100%',           // Take full width of the container
        height: '100%',          // Take full height of the container
        border: 'none'           // No border for the iframe
    };

    return (
        <div style={containerStyle}>
            <iframe
                src={chatbotURL}
                title="Chatbot"
                style={iframeStyle}
            />
        </div>
    );
};

export default Chatbot;
