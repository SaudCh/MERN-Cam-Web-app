import fs from 'fs';

const uploadFiles = (files, directory = 'others') => {
    const paths = [];
    if (files.length && files.length > 0) {
        files.map(async (file) => {
            const dir = `/public/uploads/${directory}/`;
            const path = dir + Date.now() + file.name;

            if (!fs.existsSync(process.cwd() + dir)) {
                fs.mkdirSync(process.cwd() + dir, {
                    recursive: true,
                });
            }

            file.mv(process.cwd() + path, function (err) {
                if (err) throw err;
            });

            paths.push(path);
        });
    } else {
        const dir = `/public/uploads/${directory}/`;
        const path = dir + Date.now() + files.name;

        if (!fs.existsSync(process.cwd() + dir)) {
            fs.mkdirSync(process.cwd() + dir, {
                recursive: true,
            });
        }

        files.mv(process.cwd() + path, function (err) {
            if (err) throw err;
        });

        paths.push(path);
    }

    return paths;
};

export default uploadFiles;
