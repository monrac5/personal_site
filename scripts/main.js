const image = document.querySelector("img")

const wikimediaCommonsApiUrl = "https://commons.wikimedia.org/w/api.php";

const queryParams = {
    action: "query",
    titles: "Commons:Valued_images_by_topic/Objects/Geological_objects/Rocks,_minerals_and_elements",
    prop: "images",
    format: "json",
    imlimit: 1
};

async function randomRockImage() {
    // if imcontinue not empty, else
    //if (queryParams.hasOwnProperty("imcontinue") && queryParams.imcontinue === null) {
    //    delete queryParams.imcontinue;
    //}

    const queryString = new URLSearchParams(queryParams).toString();
    const fullURL = `${wikimediaCommonsApiUrl}?${queryString}&origin=*`;
    let fileJson = "";
    let file = "";
    let imageJson = "";
    let imageSrc = "";

    try {
        let response = await fetch(fullURL, {
            method: "GET",
            headers: new Headers({
                "Api-User-Agent": "personal_site/0.1 (https://github.com/monrac5/personal_site)"
            })
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        fileJson = await response.json();
        let pageID = Object.keys(fileJson["query"]["pages"]);
        file = fileJson["query"]["pages"][pageID[0]]["images"][0]["title"].split(" ").join("_")
    } catch (e) {
        console.error(e);
    }

    fullImageApiURL = `${wikimediaCommonsApiUrl}?action=query&titles=${file}&prop=imageinfo&iiprop=thumburls&format=json&origin=*`

    try {
        let response = await fetch(fullImageApiURL, {
            method: "GET",
            headers: new Headers({
                "Api-User-Agent": "personal_site/0.1 (https://github.com/monrac5/personal_site)"
            })
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        imageJson = await response.json();
        let pageID = Object.keys(imageJson["query"]["pages"]);
        imageSrc = imageJson["query"]["pages"][pageID[0]]["imageinfo"][0]["thumburls"]["330"]["src"];

    } catch (e) {
        console.error(e);
    }

        image = document.querySelector(".rock");
        image.src = imageSrc;
}

