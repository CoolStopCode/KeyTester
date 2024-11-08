const switchData = {
    items: {
        "cherry_mx_red": {
            "color": "#FF6B6B",
            "title": "Cherry MX Red",
            "type": "Linear",
            "start-pressure": "45g",
            "end-pressure": "60g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "cherry_mx_brown": {
            "color": "#BC8A5F",
            "title": "Cherry MX Brown",
            "type": "Tactile",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "cherry_mx_blue": {
            "color": "#4DABF7",
            "title": "Cherry MX Blue",
            "type": "Clicky",
            "start-pressure": "50g",
            "end-pressure": "60g",
            "actuation-distance": "2.2mm",
            "bottom-out": "4.0mm"
        },
        "gateron_red": {
            "color": "#FF4040",
            "title": "Gateron Red",
            "type": "Linear",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "gateron_brown": {
            "color": "#D6A15C",
            "title": "Gateron Brown",
            "type": "Tactile",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "gateron_blue": {
            "color": "#4D79F7",
            "title": "Gateron Blue",
            "type": "Clicky",
            "start-pressure": "50g",
            "end-pressure": "60g",
            "actuation-distance": "2.2mm",
            "bottom-out": "4.0mm"
        },
        "kalih_red": {
            "color": "#FF6D6D",
            "title": "Kailh Red",
            "type": "Linear",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "kalih_brown": {
            "color": "#C9A174",
            "title": "Kailh Brown",
            "type": "Tactile",
            "start-pressure": "50g",
            "end-pressure": "60g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "kalih_box_white": {
            "color": "#F9F9F9",
            "title": "Kailh Box White",
            "type": "Clicky",
            "start-pressure": "50g",
            "end-pressure": "60g",
            "actuation-distance": "1.8mm",
            "bottom-out": "4.0mm"
        },
        "zorro_red": {
            "color": "#E52B50",
            "title": "Zorro Red",
            "type": "Linear",
            "start-pressure": "50g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "zorro_brown": {
            "color": "#C8A77A",
            "title": "Zorro Brown",
            "type": "Tactile",
            "start-pressure": "50g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "zorro_blue": {
            "color": "#6D94D9",
            "title": "Zorro Blue",
            "type": "Clicky",
            "start-pressure": "50g",
            "end-pressure": "60g",
            "actuation-distance": "2.2mm",
            "bottom-out": "4.0mm"
        },
        "holy_panda": {
            "color": "#8C5D3B",
            "title": "Holy Panda",
            "type": "Tactile",
            "start-pressure": "55g",
            "end-pressure": "65g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "tactile_panda": {
            "color": "#B09C73",
            "title": "Tactile Panda",
            "type": "Tactile",
            "start-pressure": "55g",
            "end-pressure": "65g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "box_white": {
            "color": "#F9F9F9",
            "title": "Box White",
            "type": "Clicky",
            "start-pressure": "50g",
            "end-pressure": "60g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "box_red": {
            "color": "#FF4040",
            "title": "Box Red",
            "type": "Linear",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "gateron_silent_red": {
            "color": "#FF6F6F",
            "title": "Gateron Silent Red",
            "type": "Linear",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "gateron_silent_brown": {
            "color": "#D6A15C",
            "title": "Gateron Silent Brown",
            "type": "Tactile",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "gateron_silent_blue": {
            "color": "#4D79F7",
            "title": "Gateron Silent Blue",
            "type": "Clicky",
            "start-pressure": "50g",
            "end-pressure": "60g",
            "actuation-distance": "2.2mm",
            "bottom-out": "4.0mm"
        },
        "cherry_mx_silent_red": {
            "color": "#FF6B6B",
            "title": "Cherry MX Silent Red",
            "type": "Linear",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "cherry_mx_silent_brown": {
            "color": "#BC8A5F",
            "title": "Cherry MX Silent Brown",
            "type": "Tactile",
            "start-pressure": "45g",
            "end-pressure": "55g",
            "actuation-distance": "2.0mm",
            "bottom-out": "4.0mm"
        },
        "cherry_mx_silent_blue": {
            "color": "#4DABF7",
            "title": "Cherry MX Silent Blue",
            "type": "Clicky",
            "start-pressure": "50g",
            "end-pressure": "60g",
            "actuation-distance": "2.2mm",
            "bottom-out": "4.0mm"
        }
    }
};
