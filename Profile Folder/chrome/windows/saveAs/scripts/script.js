setTimeout(() => {
    const type = document.getElementById("type");
    type.value = type.value.replace(" (", ", ").replace(")", "");

    var icon = document.getElementById("contentTypeImage");
    icon.src = icon.src.replace("size=16", "size=32");
}, 50);