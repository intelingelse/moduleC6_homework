const showBtn = document.querySelector("#j-show-button");
const sendBtn = document.querySelector("#j-button-send");
const chatWindow = document.querySelector(".chat");
const chatBody = document.querySelector(".chat-body");
const message = document.querySelector(".message");
const closeBtn = document.querySelector(".close-button");
const geoBtn = document.querySelector("#j-geo-button");
const minBtn = document.querySelector(".minimize-button");
const maxBtn = document.querySelector(".maximize-button");


function addMessage(text, sender) {
    if(sender === "human"){
        chatBody.innerHTML += `
    <div class="out-message text-right">
       <h6 class="out-author">Me</h6>
       <p class="message-text">
          ${text}
       </p>
    </div>
    `;
    }
    else if(sender === "server") {
        chatBody.innerHTML += `
            <div class="in-message">
                <h6 class="in-author">Echo server</h6>
                <p class="message-text">
                    ${text}
                </p>
            </div>`
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}



closeBtn.addEventListener("click", () => {
    chatWindow.style.display = "none";
    showBtn.style.display = "inline-block";
    this.websocket.close();
    this.websocket = null;
});


showBtn.addEventListener('click', () => {
    chatWindow.style.display = "block";
    showBtn.style.display = "none";
    this.websocket = new WebSocket('wss://echo.websocket.org/');
    this.websocket.onmessage = (event) => {
        addMessage(event.data, "server");
    }
    this.websocket.onerror = function(evt) {
        console.log(evt.data);
    };

});

sendBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if(message.value !== ""){
        addMessage(message.value, "human");
        this.websocket.send(message.value);
        message.value = "";
    }

});


geoBtn.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            let geolocationHref = `<a href="https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}">geolocation</a>`
            addMessage(geolocationHref, "human");
        });
    }
})

minBtn.addEventListener("click", () => {
    chatBody.style.height = "0px";
})

maxBtn.addEventListener("click", () => {
    chatBody.style.height = "300px";
})

