(function(){

const BLOCK_URL = "https://yonotv.pages.dev/block";

// allow localhost for development
if(location.origin === "https://yonotv.pages.dev") return;

// allow Google AMP embeds
try{
    const origins = window.location.ancestorOrigins;
    if(origins && origins.length){
        const parent = origins[origins.length-1];
        if(parent.includes("google.com")) return;
    }
}catch(e){}

// must be inside iframe
if(window.self === window.top){
    location.replace(BLOCK_URL);
    return;
}

// check parent domain
try{
    const ref = document.referrer;
    if(!ref){
        location.replace(BLOCK_URL);
        return;
    }

    const domain = new URL(ref).hostname;

    const allowed = [
        "yonotv-now.pages.dev",
        "yonotv.pages.dev"
    ];

    const ok = allowed.some(d => domain.includes(d));

    if(!ok){
        location.replace(BLOCK_URL);
        return;
    }

}catch(e){
    location.replace(BLOCK_URL);
}


})();
