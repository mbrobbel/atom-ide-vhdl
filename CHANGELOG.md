## 0.5.0 - Set workdir to project root

- The workdir is now set to the project root to prevent other config file problems.

## 0.4.0 - Add debug option

- Add debug option to log language server output to dev tools console.

## 0.3.0 - Mount project root in docker container to read config file

- The project root is now mounted in the container to allow the language server to read the `vhdl_ls.toml` config file.

## 0.2.0 - Pull latest image

- The latest image for the language parser is now pulled daily and at startup when using Docker.

## 0.1.0 - First Release

- Initial setup.
