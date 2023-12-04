class Loader {
    constructor(url) {
        this.url = url;
        this.json;

        import mod from filename assert { type: 'json' };
        this.json = mod;
    }
}
