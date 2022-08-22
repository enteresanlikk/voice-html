class Voice {
    constructor({ dataURL, time, elements }) {
        this.dataURL = dataURL;
        this.time = time;
        this.elements = elements;

        this.data = [];
        this.currentData = {};
    }

    async init() {
        const data = await this.getDataFromURL();
        this.data = data;

        this.currentData = this.getRandomData();

        this.loop();
    }

    getDataFromURL() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.dataURL, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr);
                }
            };
            xhr.send();
        });
    }

    getRandomData() {
        return this.data[Math.floor(Math.random() * this.data.length)];
    }

    loop() {
        const max = this.data.length - 1;
        const min = 0;

        this.render(this.currentData);
        
        setInterval(() => {
            let index = this.data.indexOf(this.currentData);
            if(index >= max) {
                this.currentData = this.data[min];
            } else {
                this.currentData = this.data[++index];
            }

            this.render(this.currentData);
        }, this.time);
    }

    render({ title, image, tag }) {
        this.elements.title.innerHTML = title;
        this.elements.image.src = image;
        this.elements.tag.innerHTML = tag;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('#Title');
    const image = document.querySelector('#Image');
    const tag = document.querySelector('#Tag');

    const voice = new Voice({
        dataURL: '/assets/data/texts.json',
        time: 1000 * 4,
        elements: {
            title,
            image,
            tag
        }
    });

    voice.init();
});