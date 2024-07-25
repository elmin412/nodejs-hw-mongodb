import path from 'node:path';

export const PATH_DB = path.join(
    path.join(process.cwd()),
    'src',
    'db',
    'db.json',
);

export const TEMPLATES_DIR = path.resolve(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.resolve(process.cwd(), 'src', 'temp');

export const PUBLIC_DIR = path.resolve(process.cwd(), 'src', 'public');

export const PUBLIC_PHOTO_DIR = path.resolve(process.cwd(), 'src', 'public', 'photo');

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');

