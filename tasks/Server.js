const server = () => {
    $.browserSync.init({
        server: {
            baseDir: $.path.root
        },
        host: '192.168.100.3'
    });
}

export default server;