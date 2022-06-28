const detect = () => {
    console.log ("Avif support is ignored");
    const testWebp = (callback) => {
        let webP = new Image();
        webP.onload = webP.onerror = () => {
            callback(webP.height == 1);
        };
        webP.src = "data:image/webp;base64,UklGRhwAAABXRUJQVlA4TBAAAAAvAAAAEAfQpv5HmQMR0f8A"
    }

    testWebp(function(support) {
        let className = support === true ? 'webp' : '';
        document.documentElement.classList.add(className);
    });
}

detect();

export default detect;
